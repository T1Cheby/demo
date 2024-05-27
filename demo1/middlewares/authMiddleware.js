const authMethod = require("../helper/authMethod");
const Users = require("../models/Users");

exports.isAuth = async (req, res, next) => {
    const accessTokenFromHeader = req.headers.authorization;
    // console.log(accessTokenFromHeader)
    if(!accessTokenFromHeader){
        return res.status(401).send("not found Token");
    }

    const accessTokenSecret = "vital_cap_24";
    const verified = await authMethod.verifyToken(accessTokenFromHeader, accessTokenSecret);
    // console.log(verified.email);
    if(!verified){
        return res.status(401).send("You are not allowed to access this service!");
    }

    const user =await Users.getUserByEmail(verified.email);
    // console.log(user);
    req.user = user;

    return next();
}