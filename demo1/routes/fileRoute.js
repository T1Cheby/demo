const express = require('express');
const router = express.Router();
const fileController = require("../controllers/fileController")
const upload = require("../middlewares/multer")

router.post("/upload", upload.single("file"), fileController.uploadFile);
router.get("/getFile/:name", fileController.getFile);
router.delete("/deleteFile/:name", fileController.deleteFile);

module.exports = router;