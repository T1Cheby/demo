const express = require('express');
const chatRouter = express.Router();
const chatController = require("../controllers/chatController")
const upload = require("../middlewares/multer")
const isAuth = authMiddleware.isAuth;

chatRouter.get("/fetch-messages", chatController.fetchMessages);
chatRouter.post("/post-message", upload.single("file") ,chatController.postMessage);
chatRouter.post("/generate-chat", isAuth, chatController.generateChat);

module.exports = chatRouter;