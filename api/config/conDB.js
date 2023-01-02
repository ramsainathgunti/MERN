const mongoose = require("mongoose");
require("dotenv").config();

const conDB = async() => {
    try {
        mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
    } catch (err) {
        console.log("Failed to connect to DB");
    }
};

module.exports = conDB;