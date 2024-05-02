const express = require("express");
const router = express.Router();

const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/product.controller.js');
const authenticateToken = require("../middleware/authenticateToken.js");

router.get('/', getProducts);
router.get('/:id', getProduct);

router.post('/', authenticateToken, createProduct);

router.put('/:id', updateProduct);

router.delete('/:id', authenticateToken, deleteProduct);


module.exports = router;