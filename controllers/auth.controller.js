const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var validator = require('validator');

const User = require('../models/user.model');
require('dotenv').config();


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Missing email or password" });
        }
        if (!validator.isEmail(email)) {
            return res.status(500).json({ message: "Please Enter a Valid Email Address" })
        }
        if (!validator.isStrongPassword(password, {
            minLength: 8,
            minUppercase: 0,
            minLowercase: 0,
            minNumbers: 1,
            minSymbols: 0,
        })) {
            return res.status(500).json({ message: "Password must be at least 8 characters long, must contain Alphanumeric characters" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        // const user = await User.create({ name, email, password: password });
        console.log('user ->', user)
        res.status(200).json({ message: "User Registered Successfully" });
    } catch (error) {
        console.log("error ->", error)
        res.status(500).json({ message: error.message })
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password) {
        return res.status(400).json({ error: "Missing email or password" });
    }

    if (!validator.isEmail(email)) {
        return res.status(500).json({ message: "Please Enter a Valid Email Address" })
    }

    if (!validator.isStrongPassword(password, {
        minLength: 8,
        minUppercase: 0,
        minLowercase: 0,
        minNumbers: 1,
        minSymbols: 0,
    }
    )) {
        return res.status(500).json({ message: "Password must be at least 8 characters long, must contain Alphanumeric characters" })
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log("user not found");
            return res.status(400).json({ error: "Invalid Email or Password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ error: "Invalid Email or Password..." })
        };
        // if (password != user.password) {
        //     res.status(400).json({ error: "Invalid Email or Password..." })
        // }

        // for expiry -> expiresIn: '1h' / '1d' or "120" which is equal to "120ms" 
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
        );
        res.status(200).json({ message: 'User Successfully Log In', token })
    } catch (error) {
        console.log("error ->", error);
        res.status(500).json({ error: error.message })

    }
};

// const logoutUser = (req, res) => {

// }

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    registerUser,
    loginUser,
    // logoutUser,
    getUsers
}