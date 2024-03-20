require('dotenv').config()
const sql = require('mysql2')
const db = sql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  });
  
  //Connect to the DB
  db.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting connection from pool:', err);
      return;
    }
    connection.release();
  });
  
  //DB on connect
  if (db) {
    db.on('connection', (connection) => {
      console.log(`Connection established on connection ${connection.config.database}`);
    });
  } else {
    console.log('Error');
  }
  module.exports = db;