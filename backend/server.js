require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3500;
const connectDB = require("./config/conDB");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/cors");

//Database connection
connectDB();

app.use(cookieParser());

//BuiltIn middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//CORS
//app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.send("Welcome to Booking Application");
});

//routes
app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/users", require("./routes/users"));
app.use("/api/v1/hotels", require("./routes/hotels"));
app.use("/api/v1/rooms", require("./routes/rooms"));

//error handler middleware

app.use((err, req, res, next) => {
    const errStatus = err.status || 500;
    const errMsg = err.message || "Something went wrong";
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: err.stack,
    });
});

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
        console.log(`Server running on ${port}`);
    });
});