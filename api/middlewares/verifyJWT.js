const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
    const token = req.headers.Authorization || req.headers.authorization;
    if (!token) return res.status(403).json("Access Denied");
    if (token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
    }
    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
        if (err) return res.status(403).json("Invalid token");
        req._id = decoded;
        next();
    });
};

module.exports = verifyJWT;