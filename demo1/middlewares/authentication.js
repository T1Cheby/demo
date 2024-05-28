// const jwt = require("jsonwebtoken");
// function verifyToken(req, res, next) {
//     let token = req.headers.authorization;

//     if (!token) {
//         return res.status(401).json({ message: "Authorization token missing" });
//     }

//     const tokenParts = token.split(" ");
//     if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
//         return res.status(401).json({ message: "Invalid token format" });
//     }

//     token = tokenParts[1];

//     jwt.verify(token, "secret", (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ message: "Invalid token" });
//         }
//         req.userId = decoded.id;
//         next();
//     });
// }

// module.exports = verifyToken;