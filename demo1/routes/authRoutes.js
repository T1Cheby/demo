const express = require('express');
const authenticationRouter = express.Router();
const authenticationController = require('../controllers/authenticationController');

authenticationRouter.post('/login', authenticationController.login);
authenticationRouter.post('/register', authenticationController.register);

module.exports = authenticationRouter;
