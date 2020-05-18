const express = require('express');
const api = express.Router();
const userRouter = require('../api/user/userRoutes');
const authorizationRoutes = require('./authorization/authorizationRoutes');

api.use('/user', userRouter);
api.use('/auth', authorizationRoutes );

module.exports = api;