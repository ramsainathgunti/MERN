const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
        unique: true,
    },
    password: {
        require: true,
        type: String,
        min: 6,
        max: 64,
    },
    stripe_account_id: "",
    stripe_seller: {},
    stripeSession: {},
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);