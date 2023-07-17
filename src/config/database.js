const mysql = require('mysql2');
const dotenv = require('dotenv'); 

dotenv.config();

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: '',
  database: process.env.DB_NAME,
 
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

module.exports = {db};
