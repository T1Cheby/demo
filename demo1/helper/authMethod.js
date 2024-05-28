const jwt = require("jsonwebtoken");
const promisify = require("util").promisify;
const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);
const Users = require("../models/Users");

exports.generateToken = async (dataForToken, accesTokenSecret, accesTokenLife = 2) => {
    try {
        return await sign(
            {
                payload: dataForToken,
            },
            accesTokenSecret,
            {
                algorithm: "HS256",
                expiresIn: accesTokenLife
            }
        )
    } catch (err) {
        console.log(err);
        return null;
    }
}

// equal to verify
exports.decodeToken = async (token, secretKey) => {
    try {
        return await verify(token, secretKey, {
            ignoreExpiration: true
        })
    } catch (err) {
        console.log(err)
    }
}

exports.verifyToken = async (token, secretKey) => {
    try {
        return await verify(token, secretKey)
    } catch (err) {
        console.log(err)
    }
}
