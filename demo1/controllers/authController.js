const authService = require("../services/authService");
const authMethod =require("../helper/authMethod");
const Users = require("../models/Users")
exports.signup = async (req, res) => {
    try {
        const userData = req.body;
        const response = await authService.signup(userData);
        if (response.user) {
            res.status(200).json(response);
        } else {
            res.status(400).json(response);
        }
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.login = async (req, res) => {
    try {
        const data = req.body;
        const response = await authService.login(data);
        if (response.user) {
            res.status(200).json(response);
        } else {
            res.status(404).json(response);
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.deleteAuth = async (req, res) => {
    try {
        // const email = req.params.email;
        // const response = await authService.deleteAuth({ email });
        // if (response.message) {
        //     res.status(200).json(response);
        // } else {
        //     res.status(404).json({ message: "Error: Can't Delete Authentication!" });
        // }
        res.status(200).json({message: "Okay, I'm Fine!"});
    } catch (error) {
        console.error('Delete authentication error:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


exports.refeshToken = async (req,res) => {
    const accessTokenFromHeader = req.headers.x_authorization;
    if(!accessTokenFromHeader){
        return res.status(400).send("cant find access token");
    }

    const refeshTokenFromBody = req.body.refeshToken;
    if(!refeshTokenFromBody){
        return res.status(400).send("cant find refresh token");
    };

    const accessTokenLife = "30m";
    const accessTokenSecret = "vital_cap_24";

    const decoded = await authMethod.decodeToken(
        accessTokenFromHeader,
        accessTokenSecret
    )

    if(!decoded){
        return res.status(400).send("not suitable access token");
    }
    const userEmail = decoded.payload.email;
    const user = await Users.getUserByEmail(userEmail);
    if(!user){
        return res.status(400).send("users does not exist");
    }

    if(refeshTokenFromBody != user.refeshToken){
        return res.status(400).send("not suitable refresh token");
    }

    const dataForToken = {
        email: userEmail
    }

    const accessToken = authMethod.generateToken(
        dataForToken,
        accessTokenSecret,
        accessTokenLife
    )

    if(!accessToken){
        return res.status(400).send("cant create token");
    }
    
    return res.json({
        accessToken
    })



}