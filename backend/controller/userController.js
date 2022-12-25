const createError = require("../utils/error");
const User = require("../models/User");

// const createUser = async(req, res, next) => {
//     try {
//         const user = await User.create(req.body);
//         res.status(201).json(user);
//     } catch (err) {
//         next(createError(400, "Failed to create User"));
//     }
// };

const getAllUsers = async(req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        next(createError(401, "Not Authenticated"));
    }
};

const updateUser = async(req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, {
                $set: req.body,
            }, { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
};

const deleteUser = async(req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted");
    } catch (err) {
        next(err);
    }
};

const getSingleUser = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    updateUser,
    getAllUsers,
    getSingleUser,
    deleteUser,
};