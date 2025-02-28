import mysql from "mysql2"
import dotenv from 'dotenv';
dotenv.config()

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306
});

connection.getConnection((err, conn) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database!');
     // Don't forget to release the connection if you test manually
  }
});

const db = connection.promise()
export default db;