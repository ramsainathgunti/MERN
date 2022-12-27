const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const port = process.env.PORT || 5000;
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/connectDB");
const mongoose = require("mongoose");

//database connection
connectDB();
//cors
app.use(cors(corsOptions));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", require("./routes/auth"));

mongoose.connection.once("open", () => {
    console.log("Connected to database");
    app.listen(port, () => {
        console.log(`Server running ${port}`);
    });
});