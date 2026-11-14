const express = require('express');
const router = express.Router();
const kanbanControllers = require('../controllers/kanbanControllers');

router.post('/post/:id', kanbanControllers.addItem);
router.get('/get/:id', kanbanControllers.getKanban);


module.exports = router;