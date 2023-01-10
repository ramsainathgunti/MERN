const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

//Register

const Register = async(req, res) => {
    try {
        const {
            firstName,
            lastName,
            password,
            email,
            picturePath,
            friends,
            occupation,
            location,
        } = req.body;
        const pwdHash = await bcrypt.hash(password, 10);
        const savedUser = await User.create({
            firstName,
            lastName,
            password: pwdHash,
            email,
            picturePath,
            friends,
            occupation,
            location,
            viewedProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000),
        });
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const Login = async(req, res) => {
    try {
        const { email, password } = req.body;
        // if (!email || !password)
        //     return res.status(400).json({ message: "Provide email and password" });
        const foundUser = await User.findOne({ email });
        if (!foundUser) return res.status(400).json("User not found");
        const match = await bcrypt.compare(password, foundUser.password);
        if (!match) return res.status(400).json("Invalid credentials");
        const token = jwt.sign({ id: foundUser._id },
            process.env.ACCESS_SECRET_TOKEN, { expiresIn: "1d" }
        );
        delete foundUser.password;
        res.status(200).json({ token, foundUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { Register, Login };