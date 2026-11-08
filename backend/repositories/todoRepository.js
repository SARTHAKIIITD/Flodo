const db = require('../config/db');

const insertItem = (
  todo,
  callback
) => {
  const sql = `
  INSERT INTO todos
  (todo, user_id) 
  VALUES (?,?)
  `;
  db.query(
    sql,
    [todo.name, todo.userId],
    (err, result) => {
      callback(err, result);
    }
  );
};

const getTodos = (
  id,
  callback
) => {
  const sql = `
  SELECT id, todo, completed
  FROM todos
  WHERE 
  user_id = ?
  `;
  db.query(
    sql,
    [id],
    (err, result) =>{
      callback(err, result);
    }
  );
};

const removeItem = (
  id,
  todoId,
  callback
) => {
  const sql = `
  DELETE FROM
  todos
  WHERE
  id = ?
  `;
  db.query(
    sql,
    [todoId],
    (err, result) => {
      callback(err, result);
    }
  );
};

const clearTodos = (
  userId,
  callback
) => {
  const sql = `
  DELETE FROM
  todos
  WHERE
  user_id = ?
  `;
  db.query(
    sql,
    [userId],
    (err, result) => {
      callback(err,result);
    }
  );
};

const toggleCompleted = (
  userId,
  todoId,
  isCompleted,
  callback
) => {
  const sql = `
  UPDATE todos
  SET completed = ?
  WHERE
  id = ?
  `;
  db.query(
    sql,
    [isCompleted, todoId],
    (err, result) => {
      callback(err, result);
    }
  );
};

const changeTodoName = (
  userId,
  todoId,
  newItem,
  callback
) => {
  const sql = `
  UPDATE todos
  SET todo = ?
  WHERE id = ? 
  `;
  db.query(
    sql,
    [newItem, todoId],
    (err, result) => {
      callback(err, result);
    }
  );
};

module.exports = {
  insertItem,
  getTodos,
  removeItem,
  clearTodos,
  toggleCompleted,
  changeTodoName,
};