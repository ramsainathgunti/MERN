const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewURlParser: true,
        });
    } catch (err) {}
};

module.exports = connectDB;