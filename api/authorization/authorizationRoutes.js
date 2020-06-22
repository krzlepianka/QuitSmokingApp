const express = require('express');
const router = express.Router();
const AuthorizationController = require('./authorizationController');

router
.route('/login')
.post(AuthorizationController.Login);

router
.route('/register')
.post(AuthorizationController.Register);

router
.route('/')
.post(AuthorizationController.Authorization)

module.exports = router;