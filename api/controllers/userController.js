const User = require("../models/User");

const getUser = async(req, res) => {
    try {
        const userId = req.params.id;
        console.log(userId);
        const foundUser = await User.findById(userId).exec();

        res.status(200).json(foundUser);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

const getUserFriends = async(req, res) => {
    try {
        const userId = req.params.id;
        const foundUser = await User.findById(userId);
        const friends = await Promise.all(
            foundUser.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => ({
                _id,
                firstName,
                lastName,
                occupation,
                location,
                picturePath,
            })
        );
        res.status(200).json({ Friends: formattedFriends });
    } catch (err) {
        {
            res.status(404).json({ message: err.message });
        }
    }
};

const addRemoveFriend = async(req, res) => {
    try {
        const { id, friendId } = req.params;
        const foundUser = await User.findById(id);
        const friend = await User.findById(friendId);

        if (foundUser.friends.includes(friendId)) {
            foundUser.friends.filter((id) => id !== friendId);
            friend.friends.filter((id) => id !== id);
        } else {
            foundUser.friends.push(friendId);
            friend.friends.push(id);
        }
        await foundUser.save();
        await friend.save();

        const friends = await Promise.all(
            foundUser.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.friends.map({
            _id,
            firstName,
            lastName,
            occupation,
            location,
            picturePath,
        });
        res.status(200).json({ updatedFriendsList: formattedFriends });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

module.exports = { getUser, getUserFriends, addRemoveFriend };