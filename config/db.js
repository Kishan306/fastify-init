import mysql from "mysql2/promise"
import dotenv from 'dotenv';
dotenv.config()

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306
});

db.getConnection((err, conn) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database!');
     // Don't forget to release the connection if you test manually
  }
});
export default db;