const express = require('express');
const userController = require('../user/userController');
const router = express.Router();

router
    .route('/')
    .get(userController.getUser)
    .post(userController.updateUser)
    .put(userController.createUser);

module.exports = router;
