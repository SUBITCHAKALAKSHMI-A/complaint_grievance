const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

// Database file path
const dbPath = path.join(__dirname, '..', 'database.sqlite');

// Create database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    initializeDatabase();
  }
});

// Initialize database tables
const initializeDatabase = async () => {
  // Enable foreign keys
  await run('PRAGMA foreign_keys = ON');

  // Wait a bit for tables to be created
  await new Promise(resolve => setTimeout(resolve, 100));

  // Users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT,
      full_name TEXT,
      phone TEXT,
      role TEXT DEFAULT 'user',
      is_active BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Categories table
  db.run(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      is_active BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Complaints table
  db.run(`
    CREATE TABLE IF NOT EXISTS complaints (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      complaint_id TEXT UNIQUE NOT NULL,
      user_id INTEGER,
      is_anonymous BOOLEAN DEFAULT 0,
      category_id INTEGER NOT NULL,
      subject TEXT NOT NULL,
      description TEXT NOT NULL,
      priority TEXT DEFAULT 'medium',
      status TEXT DEFAULT 'new',
      assigned_to INTEGER,
      escalated_to INTEGER,
      escalation_reason TEXT,
      resolution_details TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      resolved_at DATETIME,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (category_id) REFERENCES categories(id),
      FOREIGN KEY (assigned_to) REFERENCES users(id),
      FOREIGN KEY (escalated_to) REFERENCES users(id)
    )
  `);

  // Complaint attachments table
  db.run(`
    CREATE TABLE IF NOT EXISTS complaint_attachments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      complaint_id INTEGER NOT NULL,
      file_name TEXT NOT NULL,
      file_path TEXT NOT NULL,
      file_size INTEGER NOT NULL,
      mime_type TEXT NOT NULL,
      uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (complaint_id) REFERENCES complaints(id) ON DELETE CASCADE
    )
  `);

  // Complaint timeline table
  db.run(`
    CREATE TABLE IF NOT EXISTS complaint_timeline (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      complaint_id INTEGER NOT NULL,
      status TEXT NOT NULL,
      comment TEXT,
      created_by INTEGER,
      is_public BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (complaint_id) REFERENCES complaints(id) ON DELETE CASCADE,
      FOREIGN KEY (created_by) REFERENCES users(id)
    )
  `);

  // Admin notes table
  db.run(`
    CREATE TABLE IF NOT EXISTS admin_notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      complaint_id INTEGER NOT NULL,
      note TEXT NOT NULL,
      created_by INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (complaint_id) REFERENCES complaints(id) ON DELETE CASCADE,
      FOREIGN KEY (created_by) REFERENCES users(id)
    )
  `);

  // Notifications table
  db.run(`
    CREATE TABLE IF NOT EXISTS notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      complaint_id INTEGER NOT NULL,
      type TEXT NOT NULL,
      message TEXT NOT NULL,
      is_read BOOLEAN DEFAULT 0,
      email_sent BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (complaint_id) REFERENCES complaints(id) ON DELETE CASCADE
    )
  `);

  // Escalation rules table
  db.run(`
    CREATE TABLE IF NOT EXISTS escalation_rules (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_id INTEGER,
      priority TEXT,
      hours_before_escalation INTEGER NOT NULL,
      escalate_to_role TEXT NOT NULL,
      is_active BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories(id)
    )
  `);

  // Insert default data
  insertDefaultData();
};

// Insert default data
const insertDefaultData = () => {
  // Insert default categories
  const categories = [
    ['Service Quality', 'Issues related to service delivery and quality'],
    ['Billing and Payments', 'Problems with invoices, payments, and billing'],
    ['Technical Issues', 'Technical problems and system failures'],
    ['Staff Behavior', 'Complaints about staff conduct and behavior'],
    ['Policy Violations', 'Violations of organizational policies'],
    ['Infrastructure', 'Issues with physical infrastructure and facilities'],
    ['Other', 'Miscellaneous complaints not fitting other categories']
  ];

  const categoryStmt = db.prepare('INSERT OR IGNORE INTO categories (name, description) VALUES (?, ?)');
  categories.forEach(category => {
    categoryStmt.run(category);
  });
  categoryStmt.finalize();

  // Insert default admin user (password: admin123)
  const bcrypt = require('bcryptjs');
  const hashedPassword = bcrypt.hashSync('admin123', 10);
  
  db.run('INSERT OR IGNORE INTO users (email, password, full_name, role) VALUES (?, ?, ?, ?)', 
    ['admin@complaintportal.com', hashedPassword, 'System Administrator', 'super_admin']);

  // Insert default escalation rules
  const escalationRules = [
    [null, 'urgent', 24, 'super_admin'],
    [null, 'high', 48, 'admin'],
    [null, 'medium', 72, 'admin'],
    [null, 'low', 120, 'admin']
  ];

  const escalationStmt = db.prepare('INSERT OR IGNORE INTO escalation_rules (category_id, priority, hours_before_escalation, escalate_to_role) VALUES (?, ?, ?, ?)');
  escalationRules.forEach(rule => {
    escalationStmt.run(rule);
  });
  escalationStmt.finalize();

  console.log('Default data inserted successfully.');
};

// Query helper function
const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Run query helper function
const run = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID, changes: this.changes });
      }
    });
  });
};

// Transaction helper
const transaction = (callback) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run('BEGIN TRANSACTION');
      
      try {
        callback(db)
          .then(result => {
            db.run('COMMIT', (err) => {
              if (err) reject(err);
              else resolve(result);
            });
          })
          .catch(err => {
            db.run('ROLLBACK', () => reject(err));
          });
      } catch (err) {
        db.run('ROLLBACK', () => reject(err));
      }
    });
  });
};

// Close database connection
const close = () => {
  return new Promise((resolve) => {
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err.message);
      } else {
        console.log('Database connection closed.');
      }
      resolve();
    });
  });
};

module.exports = {
  query,
  run,
  transaction,
  close,
  db
};
