const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router
    .post("/register", authController.Register)
    .post("/login", authController.Login)
    .get("/logout", authController.Logout);

module.exports = router;