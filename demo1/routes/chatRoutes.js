const express = require('express');
const chatRouter = express.Router();
const chatController = require('../controllers/chatController');
chatRouter.get('/fetch-messages', chatController.fetchMessages);
chatRouter.post('/post-message', chatController.postMessage);
chatRouter.post('/generate-chat', chatController.generateChat);

module.exports = chatRouter;
