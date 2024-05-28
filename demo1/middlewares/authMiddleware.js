const authMethod = require("../helper/authMethod");
const Users = require("../models/Users");

exports.isAuth = async (req, res, next) => {
    // add the mechanism to automatically generate refresh or something?
    // add the mechanism to use the refresh to generate the new one
    // add the mechanism to filter users by role
    const accessTokenFromHeader = req.headers.authorization;
    console.log(accessTokenFromHeader)

    if(!accessTokenFromHeader){
        return res.status(401).send("not found Token");
    }

    const accessTokenSecret = "vital_cap_24";
    const verified = await authMethod.verifyToken(accessTokenFromHeader, accessTokenSecret);
    console.log(verified.payload.email);
    if(!verified){
        return res.status(401).send("You are not allowed to access this service!");
    }

    if (verified.payload.email !== req.params.email){
        // console.log(verified.email !== req.params.email)
        return res.status(401).send("You are not allowed to access this service!");
    } 
    const user =await Users.getUserByEmail(verified.email);

    // console.log(user);
    req.user = user;

    return next();
}