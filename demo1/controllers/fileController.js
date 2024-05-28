const fileService = require("../services/fileService");
// const fs = require('fs');
// const { promisify } = require('util');


exports.uploadFile = async (req, res) => {
    const file = req.file;
    console.log(file);
    const response = await fileService.uploadFile(file);
    if (response.message === "File uploaded successfully!") {
        res.status(200).json(response);
    } else {
        res.status(500).json({ message: "Error: Can't upload file" });
    }
}

exports.deleteFile = async (req, res) => {
    const fileName = req.params.name;
    const file = { name: fileName };
    const response = await fileService.deleteFile(file);
    if (response.message === "File deleted successfully!") {
        res.status(200).json(response);
    } else {
        res.status(500).json({ message: "Error: Can't delete file" });
    }
}

exports.getFile = async (req, res) => {
    const fileName = req.params.name;
    const file = { name: fileName };
    const filePath = `./downloads/${file.name}`;
    const response = await fileService.downloadFile(file);
    console.log(response);
    if (response.message === "File downloaded successfully!") {
        try {


            if (response.file) {
                if(fileName.split(".")[1] === "mp4"){
                    res.writeHead(200, { 'Content-Type': "video/mp4" });
                } else if (fileName.split(".")[1] === "png"){
                    res.writeHead(200, { 'Content-Type': "image/png" });
                } else if (fileName.split(".")[1] === "jpeg") {
                    res.writeHead(200, { 'Content-Type': "image/jpeg" });
                }else{
                    res.writeHead(200, { 'Content-Type': "text/plain" });
                }
                res.end(response.file); // Sending the buffer directly
            } 

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Error: Can't read or get file" });
        }
    } else {
        res.status(404).json({ message: "Error: Can't get file" });
    }
}
