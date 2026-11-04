const userModel = require('../models/userModel');

const addItem = (req, res) => {
  const {item} = req.body;
  if(!item.trim()){
    return res.status(400).json({
      message : 'Please enter valid todo.'
    });
  }
  userModel.insertItem(
    req.params.id,
    item,
    (err, result) => {
      if(err){
        console.log(`Item insertion error for id: ${req.params.id}\n${err}`);
        return res.status(500).json({
          message : 'Something went wrong'
        });
      }
      console.log(`User ${req.params.id} added Item id: ${result.insertId}`);
      return res.status(201).json({
        message : 'Item added successfully',
      });
    }
  );
};

const getList = (req, res) => {
  userModel.getTodos(
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
  userModel.removeItem(
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
  userModel.clearTodos(
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
module.exports = {
  addItem,
  getList,
  deleteItem,
  deleteAllItems,
};