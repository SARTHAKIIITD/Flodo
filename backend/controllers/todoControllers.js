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

module.exports = {
  addItem,
};