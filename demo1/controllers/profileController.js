const profileService = require("../services/profileService");

exports.updateProfile = async (req, res) => {
    const email = req.params.email;
    const data = req.body;
    data.email = email;
    const response = await profileService.updateProfile(data);
    if (response.message === "Profile updated!") {
        res.status(200).json(response);
    } else {
        res.status(400).json({ message: "Error: Unable to update profile!" });
    }
}

exports.deleteProfile = async (req, res) => {
    const email = req.params.email;
    const data = req.body;
    data.email = email;
    const response = await profileService.deleteProfile(data);
    res.status(200).json(response);
}

exports.getProfile = async (req, res) => {
    const email = req.params.email;
    const data = req.body;
    data.email = email;
    const response = await profileService.getProfile(data);
    if (response.message === "Profile found") {
        res.status(200).json(response);
    } else {
        res.status(404).json({ message: "Error: Unable to find profile!" });
    }
}
