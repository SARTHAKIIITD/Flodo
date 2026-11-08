const Todo = require('../models/todo');
const todoRepository = require('../repositories/todoRepository');

const addItem = (req, res) => {
  const {item} = req.body;
  if(!item.trim()){
    return res.status(400).json({
      message : 'Please enter valid todo.'
    });
  }
  const todo = new Todo(
    item.trim(),
    req.params.id
  );

  todoRepository.insertItem(
    todo,
    (err, result) => {
      if(err){
        console.log(`Item insertion error for id: ${req.params.id}\n${err}`);
        return res.status(500).json({
          message : 'Something went wrong'
        });
      }
      todo.id = result.insertId;
      console.log(`User ${req.params.id} added Item id: ${result.insertId}`);
      return res.status(201).json({
        message : 'Item added successfully',
      });
    }
  );
};

const getList = (req, res) => {
  todoRepository.getTodos(
    req.params.id,
    (err, result) =>{
      if(err){
        console.log(`Unable to get todos for user ID: ${req.params.id}\n${err}`);
        return res.status(500).json({
          message : 'something went wrong',
        });
      }
      return res.status(200).json({
        message : 'Your list here',
        todoList : result,
      });
    }
  );
};

const deleteItem = (req, res) => {
  const {todoId} = req.body;
  todoRepository.removeItem(
    req.params.id,
    todoId,
    (err, result) => {
      if(err){
        console.log(`Error while removing item for user ID: ${req.params.id}\n${err}`);
        return res.status(500).json({
          message : `Something went wrong`,
        });
      }
      return res.status(200).json({
        message : 'item deleted',
      });
    }
  );
};

const deleteAllItems = (req, res) => {
  todoRepository.clearTodos(
    req.params.id,
    (err, result) => {
      if(err){
        console.log(`Error while deleting all item of user ID: ${req.params.id}\n${err}`);
        return res.status(400).json({
          message : `Something went wrong`,
        });
      }
      console.log(`All items deleted for user ID: ${req.params.id}`);
      return res.status(200).json({
        message : `Items deleted successfully`,
      });
    }
  );
};

const checkItem = (req, res) => {
  const {todoId, isCompleted} = req.body;
  todoRepository.toggleCompleted(
    req.params.id,
    todoId,
    isCompleted,
    (err, result) => {
      if(err){
        console.log(`Error while toggle completed for user ID: ${req.params.id}`);
        return res.status(400).json({
          message : `Something went wrong`,
        });
      }
      return res.status(200).json({
        message : 'ok',
      });
    }
  );
};

const editItemName = (req, res) => {
  const{todoId, newItem} = req.body;
  todoRepository.changeTodoName(
    req.params.id,
    todoId,
    newItem,
    (err, result) => {
      if(err){
        console.log(`Error which changing item name for user ID: ${req.params.id}\n${err}`);
        return res.status(400).json({
          message : `Something Went Wrong`,
        });
      }
      return res.status(200).json({
        message : `ok`,
      });
    }
  );
};
module.exports = {
  addItem,
  getList,
  deleteItem,
  deleteAllItems,
  checkItem,
  editItemName,
};