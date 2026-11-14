const Kanban = require('../models/kanban');
const kanbanRepository = require('../repositories/kanbanRepository');

const addItem = (req, res) => {
  const {taskText} = req.body;
  if(!taskText.trim()){
    return res.status(400).json({
      message : 'Please enter valid todo.'
    });
  }
  const kanban = new Kanban(taskText, req.params.id);
  kanbanRepository.insertItem(
    kanban,
    (err, result) => {
      if(err){
        console.log(`Item insertion error for id: ${req.params.id}\n${err}`);
        return res.status(500).json({
          message : 'Something went wrong'
        });
      }
      kanban.id = result.insertId;
      console.log(`User ${req.params.id} added Item id: ${result.insertId}`);
      return res.status(201).json({
        message : 'Item added successfully',
      });
    }
  );
};

const getKanban = (req, res) => {
  kanbanRepository.getKanban(
    req.params.id,
    (err, result) =>{
      if(err){
        console.log(`Unable to get kanban for user ID: ${req.params.id}\n${err}`);
        return res.status(500).json({
          message : 'something went wrong',
        });
      }
      return res.status(200).json({
        message : 'Your data here',
        kanban : result,
      });
    }
  );
};

module.exports = {
  addItem,
  getKanban,
};