// Express Route Handlers

const adminService = require("../services/adminService");

// Function to get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await adminService.getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(403).json({ error: error.message });
    }
};

// Function to delete a user by email
exports.deleteUser = async (req, res) => {
    try {
        const userEmail = req.params.email;
        const response = await adminService.deleteUser({ email: userEmail });
        res.status(200).json({ message: response });
    } catch (error) {
        res.status(403).json({ error: error.message });
    }
};

// Function to modify a user by email
exports.modifyUser = async (req, res) => {
    try {
        const userEmail = req.params.email;
        const modifiedUserData = req.body; // Assuming req.body contains modified user data
        const response = await adminService.modifyUser({ email: userEmail, ...modifiedUserData });
        res.status(200).json({ message: response });
    } catch (error) {
        res.status(403).json({ error: error.message });
    }
};
