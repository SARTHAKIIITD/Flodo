const db = require('../config/db');

const insertUser = (
  name,
  username,
  email,
  password,
  callback
) => {
  const sql = `
  INSERT INTO users
  (name, username, email, password)
  VALUES(?,?,?,?)`;

  db.query(
    sql,
    [name, username, email, password],
    (err, result) => {
      callback(err, result);
    }
  );
};

const checkUser =(
  username,
  callback
) => {
  const sql = `
  SELECT * FROM users
  WHERE username = ?`;

  db.query(
    sql,
    [username],
    (err, result) => {
      callback(err, result);
    }
  );
};

const insertItem = (
  id,
  item,
  callback
) => {
  const sql = `
  INSERT INTO todos
  (todo, user_id)
  VALUES (?,?)
  `;
  db.query(
    sql,
    [item, id],
    (err, result) => {
      callback(err, result);
    }
  );
};
module.exports = {
  insertUser,
  checkUser,
  insertItem,
};