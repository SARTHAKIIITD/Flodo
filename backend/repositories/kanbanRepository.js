const db = require('../config/db');

const insertItem = (
  kanban,
  callback
) => {
  const sql = `
  INSERT INTO kanban
  (name, userId) 
  VALUES (?,?)
  `;
  db.query(
    sql,
    [kanban.name, kanban.userId],
    (err, result) => {
      callback(err, result);
    }
  );
};

const getKanban = (
  id,
  callback
) => {
  const sql = `
  SELECT id, name, status
  FROM kanban
  WHERE 
  userId = ?
  `;
  db.query(
    sql,
    [id],
    (err, result) =>{
      callback(err, result);
    }
  );
};

module.exports = {
  insertItem,
  getKanban,
};