const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email:
        {
            type: String,
            unique: true,
            required: [true, 'please Enter Email'],
        },
        password: {
            type: String,
            required: [true, 'Please Enter Password']
        },
        name:
        {
            type: String,
            required: [true, 'please Enter your Name'],
        },
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;