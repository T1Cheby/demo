const express = require('express');
const router = express.Router();
const authController = require("../controllers/authController")
const authMiddleware = require("../middlewares/authMiddleware")

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/refresh-token", authController.refeshToken);
const isAuth = authMiddleware.isAuth;
router.delete("/delete-auth/:email", isAuth, authController.deleteAuth);
module.exports = router; 