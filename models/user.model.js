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
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;