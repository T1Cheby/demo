const express = require('express');
const router = express.Router();
const profileController = require("../controllers/profileController")

router.put("/updateProfile/:email", profileController.updateProfile);
router.get("/getProfile/:email", profileController.getProfile);
router.delete("/deleteProfile/:email", profileController.deleteProfile);

module.exports = router;