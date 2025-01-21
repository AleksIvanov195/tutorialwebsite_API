import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const dbConfig = {
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  namedPlaceholders: true,
	waitForConnections: true,
  connectionLimit: 10,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
};

let database = null;

try {
  database = await mysql.createConnection(dbConfig);
} catch (error) {
  console.log('Error creating database connection: ' + error.message);
  process.exit();
}

export default database;
