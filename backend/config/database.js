const { query, run, transaction, close } = require('./database-sqlite');

// Database connection pool (SQLite compatibility)
const pool = {
  execute: (sql, params) => {
    if (sql.trim().toLowerCase().startsWith('select')) {
      return query(sql, params).then(rows => [rows]);
    } else {
      return run(sql, params).then(result => [result]);
    }
  },
  getConnection: async () => {
    return {
      execute: async (sql, params) => {
        if (sql.trim().toLowerCase().startsWith('select')) {
          return [await query(sql, params)];
        } else {
          return [await run(sql, params)];
        }
      },
      beginTransaction: () => Promise.resolve(),
      commit: () => Promise.resolve(),
      rollback: () => Promise.resolve(),
      release: () => Promise.resolve()
    };
  }
};

// Test database connection
const testConnection = async () => {
  try {
    await query('SELECT 1');
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

// Execute query with error handling
const queryFunc = async (sql, params = []) => {
  try {
    const [rows] = await pool.execute(sql, params);
    return rows;
  } catch (error) {
    console.error('Database query error:', error.message);
    throw error;
  }
};

// Execute transaction
const transactionFunc = async (callback) => {
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
  query: queryFunc,
  transaction: transactionFunc,
  testConnection
};
