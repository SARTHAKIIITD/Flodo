const express = require('express');
const router = express.Router();
const todoControllers = require('../controllers/todoControllers');

router.post('/post/:id', todoControllers.addItem); // Add item

module.exports = router;

