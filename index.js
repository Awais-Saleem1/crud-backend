const express = require('express');
const mongoose = require('mongoose');
const productRoute = require('./routes/product.route.js');
const authRoute = require('./routes/auth.route.js');
const cors = require('cors');
require('dotenv').config()
const app = express()

const corsOptions = {
    origin: ['https://simple-crud-backend-eta.vercel.app', 'http://localhost:3000']
};
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors(corsOptions))
// routes
app.use("/api/products", productRoute);
app.use("/api/auth", authRoute)

app.get('/', (req, res) => {
    res.send("Hello from Node at Port 3000.")
});

// DB_STRING
mongoose.connect(process.env.DB_STRING_ATLAS)
    .then(() => {
        console.log('Connected to MongoDB Database!');
        app.listen(3000, () => {
            console.log('Server is running on port 3000')
        });
    })
    .catch(() => {
        console.log('Connection failed')
    });

module.exports = app;