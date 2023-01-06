const express = require("express");
const router = express.Router();
const {
    getUser,
    getUserFriends,
    addRemoveFriend,
} = require("../controllers/userController");
const verifyJWT = require("../middleware/verifyJWT");

router.get("/:id", verifyJWT, getUser);
router.get("/:id/friends", verifyJWT, getUserFriends);

router.patch("/:id/:friendId", verifyJWT, addRemoveFriend);

module.exports = router;