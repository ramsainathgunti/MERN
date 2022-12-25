const jwt = require("jsonwebtoken");
const createError = require("./error");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
    const cookie = req.cookies;
    if (!cookie.jwt) return next(createError(401, "Not Authenticated"));
    const accessToken = cookie.jwt;

    jwt.verify(accessToken, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
        if (err) return next(createError(403, "Invalid token"));
        req.user = decoded;
        next();
    });
};

const verifyUser = (req, res, next) => {
    verifyJWT(req, res, next, () => {
        if (req.user.id == req.params.id || req.user.isAdmin) {
            next();
        } else {
            next(createError(403, "You are not Authorized"));
        }
    });
};

const verifyAdmin = (req, res, next) => {
    verifyJWT(req, res, next, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            next(createError(403, "You are not Authorized"));
        }
    });
};

module.exports = { verifyJWT, verifyUser, verifyAdmin };