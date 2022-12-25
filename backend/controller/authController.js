const User = require("../models/User");
const bcrypt = require("bcrypt");
const createError = require("../utils/error");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createUser = async(req, res, next) => {
    try {
        const hashPwd = await bcrypt.hash(req.body.password, 10);
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashPwd,
        });
        res.status(201).json(newUser);
    } catch (err) {
        next(err);
    }
};

const loginUser = async(req, res, next) => {
    try {
        const foundUser = await User.findOne({ username: req.body.username });
        if (!foundUser) return next(createError(404, "Username not found"));
        const isPassMatch = await bcrypt.compare(
            req.body.password,
            foundUser.password
        );
        if (!isPassMatch)
            return next(createError(400, "Username or Password incorrect"));

        const accessToken = await jwt.sign({
                id: foundUser._id,
                isAdmin: foundUser.isAdmin,
            },
            process.env.ACCESS_SECRET_TOKEN, { expiresIn: "1h" }
        );

        const { password, isAdmin, ...otherDetails } = foundUser._doc;
        res.cookie("jwt", accessToken, {
            httpOnly: true,
        });
        res.status(200).json({ details: {...otherDetails }, isAdmin });
    } catch (err) {
        next(err);
    }
};

module.exports = { createUser, loginUser };