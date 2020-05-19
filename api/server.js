const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();
const authRoutes = require('./auth/auth-router');
const userRoutes = require('./users/user-router');
const budgetRoutes = require('./budgets/budgets-router');

const { verifyToken } = require('./utils');

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true}))

server.get('/', (req,res) => {
  res.send('hello world');
});

server.use('/api/auth', authRoutes);
server.use('/api/users', userRoutes);
server.use('/api/budget', budgetRoutes);

module.exports = server;
