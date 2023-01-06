const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const {
    getFeedPosts,
    getUserPosts,
    likePost,
} = require("../controllers/postController");

router.get("/", verifyJWT, getFeedPosts);
router.get("/:userId/posts", verifyJWT, getUserPosts);
router.patch("/:id/like", verifyJWT, likePost);

module.exports = router;