const express = require('express');
const router = express.Router();
const todoControllers = require('../controllers/todoControllers');

router.post('/post/:id', todoControllers.addItem); // Add item
router.get('/get/:id', todoControllers.getList); // Get List

module.exports = router;

