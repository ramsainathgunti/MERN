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
const cors = require("cors");

const { Register } = require("./controllers/authController");
const verifyJWT = require("./middleware/verifyJWT");

const User = require("./models/User");
const Post = require("./models/Post");

/* MiddleWares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));
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

//File Routes
const { createPost } = require("./controllers/postController");
app.post("/api/auth/register", upload.single("picture"), Register);
app.post("/api/posts", verifyJWT, upload.single("picture"), createPost);

//Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));

//DB connection and Server Conf

const conDB = require("./config/conDB");
conDB();

const { users, posts } = require("./data/index");

mongoose.connection.once("open", () => {
    // User.insertMany(users);
    // Post.insertMany(posts);
    console.log("DataBase connected");
    app.listen(port, (req, res) => {
        console.log(`Server running on ${port}`);
    });
});