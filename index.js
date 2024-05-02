const express = require('express');
const mongoose = require('mongoose');
const productRoute = require('./routes/product.route.js');
const authRoute = require('./routes/auth.route.js');
// import 'dotenv/config';
require('dotenv').config()
const app = express()

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// routes
app.use("/api/products", productRoute);
app.use("/api/auth", authRoute)

app.get('/', (req, res) => {
    res.send("Hello from Node at Port 3000.")
});


mongoose.connect(process.env.DB_STRING)
    .then(() => {
        console.log('Connected to MongoDB Database!');
        app.listen(3000, () => {
            console.log('Server is running on port 3000')
        });
    })
    .catch(() => {
        console.log('Connection failed')
    });
