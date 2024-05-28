const chatService = require("../services/chatService");
const fileService = require("../services/fileService");

exports.generateChat = async (req, res) => {
    const user1 = req.body.user1;
    const user2 = req.body.user2;
    console.log(user1, user2);
    const response = await chatService.generateChat(user1, user2);
    res.status(200).json(response);
};

exports.postMessage = async (req, res) => {
    const chatRoomID = req.body.chatRoomID;
    const sender = req.body.sender;
    const message = req.body.message;
    const file = req.file;
    // console.log(file,sender,message,chatRoomID);
    const r = await fileService.uploadFile(file);
    // const url = await fileService.getUrl(file);
    // console.log(r, file.filename);
    const response = await chatService.postMessage(chatRoomID, sender, message, file.filename);
    res.status(200).json(response);
};

exports.fetchMessages = async (req, res) => {
    const chatRoomID = req.body.chatRoomID;
    const response = await chatService.fetchMessages(chatRoomID);
    // res.writeHead(200, { 'Content-Type': "text/plain" });
    res.status(200).json(response);
};
