const path = require('path');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname,'../Frontend')));

// routes
const pageRoutes = require('./routes/pageRoutes');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const kanbanRoutes = require('./routes/kanbanRoutes');

app.use('/auth', authRoutes);
app.use('/todo', todoRoutes);
app.use('/kanban', kanbanRoutes);
app.use('/', pageRoutes);
module.exports = app;