const jwt = require("jsonwebtoken");

const verifyStripe = (req, res, next) => {
    const headers = req.headers.Authorization || req.headers.authorization;
    if (!headers) return res.sendStatus(401);
    const token = headers.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
        if (err) return res.sendStatus(403);
        req.username = decoded.username;
        req.email = decoded.email;
        next();
    });
};

module.exports = verifyStripe;