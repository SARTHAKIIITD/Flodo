const mysql = require('mysql2');

const con = mysql.createConnection({
  host: process.env.HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

con.connect((err) => {
  if(err){
    console.log(`Unable to connect with database\n${err}`);
    return;
  }
  console.log(`Database is connected successfully!`);
});

module.exports = con;