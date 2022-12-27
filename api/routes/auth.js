const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router
    .post("/register", authController.Register)
    .get("/login", authController.Login);

module.exports = router;