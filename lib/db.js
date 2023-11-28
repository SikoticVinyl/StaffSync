const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables from .env file

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Get a connection from the pool
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error getting connection:', err);
    return;
  }

  // Access the port property from the connection configuration
  console.log('MySQL Port:', connection.config.port);

  // Release the connection back to the pool
  connection.release();
});

// Function to execute SQL queries
const executeQuery = async (sql, values = []) => {
    try {
      const connection = await pool.promise().getConnection();
      const [results] = await connection.query(sql, values);
      connection.release();
      return results;
    } catch (error) {
      throw new Error(`Error executing query: ${error.message}`);
    }
  };
  
  module.exports = {
    executeQuery
  };