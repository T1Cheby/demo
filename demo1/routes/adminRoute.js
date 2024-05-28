const express = require('express');
const router = express.Router();
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware")
const isAuth = authMiddleware.isAuth;
// Route to get all users
router.get('/users',isAuth, adminController.getUsers);

router.delete('/users/:email', isAuth, adminController.deleteUser);

router.put('/users/:email', isAuth, adminController.modifyUser);

module.exports = router;
