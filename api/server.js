const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('../auth/auth-router');
const adminRouter = require('../admins/admin-router');
const todosRouter = require('../todos/todos-router');
const volunteersRouter = require('../volunteers/volunteers-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/admins', adminRouter);
server.use('/api/todos', todosRouter);
server.use('/api/volunteers', volunteersRouter);

module.exports = server;