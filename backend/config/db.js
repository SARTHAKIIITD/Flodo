const mysql = require('mysql2');

const con = mysql.createPool({
  host: process.env.HOST,
  port: process.env.DB_PORT,
  user: "root",
  password: process.env.PASSWORD,
  database: process.env.DATABASE,

  waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 20000
});

con.getConnection((err) => {
  if(err){
    console.log(`Unable to connect with database\n${err}\n${err.message}`);
    return;
  }
  console.log(`Database is connected successfully!`);
});

module.exports = con;