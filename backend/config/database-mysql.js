const { query, run, transaction, close } = require('./database-sqlite');

// Database connection pool (SQLite compatibility)
const pool = {
  execute: (sql, params) => {
    if (sql.trim().startsWith('SELECT') || sql.trim().startsWith('SELECT')) {
      return query(sql, params).then(rows => [rows]);
    } else {
      return run(sql, params).then(result => [result]);
    }
  },
  getConnection: async () => {
    return {};
  }
};

// Test database connection
const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Database connected successfully');
        connection.release();
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1);
    }
};

// Execute query with error handling
const query = async (sql, params = []) => {
    try {
        const [rows] = await pool.execute(sql, params);
        return rows;
    } catch (error) {
        console.error('Database query error:', error.message);
        throw error;
    }
};

// Execute transaction
const transaction = async (callback) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const result = await callback(connection);
        await connection.commit();
        return result;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

module.exports = {
    pool,
    query,
    transaction,
    testConnection
};
