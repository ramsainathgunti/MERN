const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const multer = require("multer");
const path = require("path");
require("dotenv").config();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");

/* MiddleWares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.contentSecurityPolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

//File Storage

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

//DB connection and Server Conf

const conDB = require("./config/conDB");
conDB();

mongoose.connection.once("open", () => {
    console.log("DataBase connected");
    app.listen(port, (req, res) => {
        console.log(`Server running on ${port}`);
    });
});