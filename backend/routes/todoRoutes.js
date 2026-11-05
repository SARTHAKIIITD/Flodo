const express = require('express');
const router = express.Router();
const todoControllers = require('../controllers/todoControllers');

router.post('/post/:id', todoControllers.addItem); // Add item
router.get('/get/:id', todoControllers.getList); // Get List
router.delete('/delete/:id', todoControllers.deleteItem); // Delete item
router.delete('/delete/all/:id', todoControllers.deleteAllItems); // Delete all todos
router.patch('/patch/:id', todoControllers.checkItem); // Checkbox

module.exports = router;

