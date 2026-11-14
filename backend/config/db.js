const mysql = require('mysql2');

const con = mysql.createPool({
  host: process.env.HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
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

// const con = mysql.createConnection({
//   host:process.env.LOCAL_DB_HOST,
//   user: process.env.LOCAL_DB_USER,
//   password: process.env.LOCAL_DB_PASSWORD,
//   database: process.env.LOCAL_DB_DATABASE,
// });

// con.connect((err) => {
//   if(err){
//     console.log(`Unable to connect with local database\n${err}\n${err.message}`);
//     return;
//   }
//   console.log(`Local Database is connected successfully!`);
// });

module.exports = con;