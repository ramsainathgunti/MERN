const Post = require("../models/Post");
const User = require("../models/User");

const createPost = async(req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const post = Post.create({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: [],
        });

        //find all posts
        const posts = await Post.find();
        res.status(201).json(posts);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};
const getFeedPosts = async(req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
const getUserPosts = async(req, res) => {
    try {
        const userId = req.params.userId;
        const post = await Post.find({ userId });
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
const likePost = async(req, res) => {
    try {
        const id = req.params.id;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if (isLiked) {
            post.liked.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id, { likes: post.likes }, { new: true }
        );
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status().json({ message: err.message });
    }
};

module.exports = { createPost, getFeedPosts, getUserPosts, likePost };