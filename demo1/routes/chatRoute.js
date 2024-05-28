const express = require('express');
const chatRouter = express.Router();
const chatController = require("../controllers/chatController")
const authMiddleware = require("../middlewares/authMiddleware")
const upload = require("../middlewares/multer")
const isAuth = authMiddleware.isAuth;

chatRouter.get("/fetch-messages", isAuth, chatController.fetchMessages);
chatRouter.post("/post-message", upload.single("file"), isAuth, chatController.postMessage);
chatRouter.post("/generate-chat", isAuth, chatController.generateChat);

module.exports = chatRouter;