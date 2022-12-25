const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewURlParser: true,
            useUnifiedTopology: true,
        });
    } catch (err) {
        throw err;
    }
};

module.exports = connectDB;