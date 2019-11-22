const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

// Routers
const authRouter = require('../auth/auth-router');
const adminRouter = require('../admins/admin-router');
const todosRouter = require('../todos/todos-router');
const volunteersRouter = require('../volunteers/volunteers-router');

// Custom Middlewarez
const authMiddleware = require('../auth/authenticate-middleware');
const checkTypeMiddleware = require('../auth/check-type-middleware');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/admins', authMiddleware, checkTypeMiddleware, adminRouter);
server.use('/api/todos', authMiddleware, todosRouter);
server.use('/api/volunteers', authMiddleware, volunteersRouter);

module.exports = server;