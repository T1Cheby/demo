const express = require('express');
const chatRouter = express.Router();
const chatController = require("../controllers/chatController")
const upload = require("../middlewares/multer")

chatRouter.get("/fetch-messages", chatController.fetchMessages);
chatRouter.post("/post-message", upload.single("file") ,chatController.postMessage);
chatRouter.post("/generate-chat", chatController.generateChat);

module.exports = chatRouter;