const User = require("../models/user");
const bcrypt = require("bcrypt");

const Login = (req, res) => {
    res.send("Auth router");
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
        res
            .status(201)
            .json({
                message: "User created Successfully",
                details: { username, email },
            });
    } catch (err) {
        console.log("Error in Create User", err);
        res.status(400).json("Error Try again");
    }
};

module.exports = { Login, Register };