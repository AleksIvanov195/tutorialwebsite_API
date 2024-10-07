const mysql = require('mysql');
require('dotenv').config();

const dbConfig ={
	database: process.env.DB_NAME,
	host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
	namedPlaceholders:true
}

let database = null;

try{
	database = mysql.createConnection(dbConfig)
}
catch (error){
	console.log('Error creating database connection: '+ error.message);
	process.exit();
}


export default database;