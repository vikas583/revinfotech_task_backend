const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    mobile_no: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    access_token: {
        type: String
    },

    created_at: {
        type: Date,
        default: mongoose.now(),
        required: true
    },
    updated_at: {
        type: Date,
        default: mongoose.now(),
        required: true
    }
});

module.exports = mongoose.model("users", userSchema);