const express = require("express");
const router = express.Router();

const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/product.controller.js');
const authenticateToken = require("../middleware/authenticateToken.js");

router.get('/', authenticateToken, getProducts);
router.post('/', authenticateToken, createProduct);
router.delete('/:id', authenticateToken, deleteProduct);

router.get('/:id', getProduct);
router.put('/:id', updateProduct);



module.exports = router;