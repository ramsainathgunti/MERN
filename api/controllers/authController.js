const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Login = async(req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password)
            return res.status(400).json("Enter username and password");
        const foundUser = await User.findOne({ username }).exec();
        if (!foundUser)
            return res.status(404).json("User does not exist! Please register");
        const match = await bcrypt.compare(password, foundUser.password);
        if (!match) return res.status(403).json("Password Incorrect");
        const access_token = jwt.sign({
                username: foundUser.username,
                email: foundUser.email,
            },
            process.env.ACCESS_SECRET_TOKEN, { expiresIn: "1d" }
        );
        res.cookie("access_token", access_token, {
            httpOnly: true,
        });
        res.status(200).json({
            message: "Login Successful",
            user: {
                username: foundUser.username,
                email: foundUser.email,
                createdAt: foundUser.createdAt,
                token: access_token,
            },
        });
    } catch (err) {
        console.log("Authentication failed", err);
        res.status(401).json("Not Authenticated");
    }
};

const Register = async(req, res) => {
    try {
        const { username, password, email } = req.body;
        if (!username) return res.status(400).json("Username is required");

        if (!password || password.length < 6)
            return res.status(400).json("password is required of min 6 characters");

        let userExists = await User.findOne({ email }).exec();
        if (userExists) return res.status(400).json("Email already exists");

        const hashPwd = await bcrypt.hash(password, 10);
        const regUser = await User.create({
            username: username,
            password: hashPwd,
            email: email,
        });
        console.log(regUser);
        res.status(201).json({
            message: "User created Successfully",
            details: { username, email },
        });
    } catch (err) {
        console.log("Error in Create User", err);
        res.status(400).json("Error Try again");
    }
};

const Logout = async(req, res) => {
    try {
        const cookies = req.cookies;
        if (!cookies.access_token || !cookies) return res.sendStatus(204);
        res.clearCookie("access_token", { httpOnly: true });
        res.status(200).json("Logged Out Successfully");
    } catch (err) {
        console.log(err);
    }
};

module.exports = { Login, Register, Logout };