const express = require("express");
const router = express.Router();
const createConnectAccount = require("../controllers/stripeController");
const verifyStripe = require("../middleware/verify");

router
    .post("/createConnectAccount", verifyStripe, createConnectAccount)
    .get("/createConnectAccount", verifyStripe, (req, res) => {
        console.log("stripe connect");
        res.json("stripe connect");
    });

module.exports = router;