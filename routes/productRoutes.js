// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');

// CRUD routes
router.get('/', controller.getProducts);
router.post('/', controller.createProduct);
router.get('/:id', controller.getProductById);
router.put('/:id', controller.updateProduct);
router.delete('/:id', controller.deleteProduct);

module.exports = router;
