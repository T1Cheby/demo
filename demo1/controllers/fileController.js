const fileService = require("../services/fileService");
const fs = require('fs');
const { promisify } = require('util');
const setTimeoutPromise = promisify(setTimeout);
const unlinkPromise = promisify(fs.unlink);
const readFilePromise = promisify(fs.readFile);

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
            // const data = await readFilePromise(filePath);
            // res.writeHead(200, { 'Content-Type': 'image/png' });
            // res.end(response.file, 'Base64');

            // await setTimeoutPromise(1000);
            // await unlinkPromise(filePath);

            if (response.file) {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.end(response.file); // Sending the buffer directly
            } 

            // console.log(`${filePath} was deleted`);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Error: Can't read or get file" });
        }
    } else {
        res.status(404).json({ message: "Error: Can't get file" });
    }
}
