const authController = require("../controllers/authController");
const express = require("express");
const router = express.Router();

router.post("/login", authController.Login);

module.exports = router;