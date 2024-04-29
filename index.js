const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const productRoute = require('./routes/product.route.js');
const app = express()

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// routes
app.use("/api/products", productRoute);


app.get('/', (req, res) => {
    res.send("Hello from Node at Port 3000.")
});



// app.post('/api/products', async (req, res) => {
//     try {
//         const product = await Product.create(req.body);
//         res.status(200).json({product});
//     }
//     catch (error) {
//         res.status(500).json({message:error.message});
//     }
// });

// app.get('/api/products', async (req, res) => {
//     try {
//         const products = await Product.find({});
//         res.status(200).json(products);

//     } catch (error) {
//         res.status(500).json({message: error.message})
//     }
// });

// app.get('/api/product/:id', async (req, res) => {
//     try {
//         const {id} = req.params;
//         const product = await Product.findById(id);
//         res.status(200).json(product);

//     } catch (error) {
//         res.status(500).json({message: error.message})
//     }
// });

// app.put('/api/product/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const product = await Product.findByIdAndUpdate(id, req.body);
//         if (!product) {
//             return res.status(404).json({ message: "Product not found" })
//         }
//         const updatedProduct = await Product.findById(id);
//         res.status(200).json(updatedProduct)

//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })

// app.delete('/api/product/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const product = await Product.findByIdAndDelete(id);
//         if (!product) {
//             return res.status(404).json({ message: "Product not Found" });
//         }
//         res.status(200).json({ message: "Product deleted successfully" })
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })


mongoose.connect('mongodb://mongoAdmin%401:Pass%40Mongo1@localhost:27017/')
    .then(() => {
        console.log('Connected to MongoDB Database!');
        app.listen(3000, () => {
            console.log('Server is running on port 3000')
        });
    })
    .catch(() => {
        console.log('Connection failed')
    });
