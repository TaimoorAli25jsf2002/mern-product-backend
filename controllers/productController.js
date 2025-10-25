// controllers/productController.js
const Product = require('../models/Product');

// GET /api/products - list all products
exports.getProducts = async (req, res, next) => {
  try {
    // optional: filtering by category or search query
    const { category, q } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (q) filter.name = { $regex: q, $options: 'i' };

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// GET /api/products/:id - get one product
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// POST /api/products - create product
exports.createProduct = async (req, res, next) => {
  try {
    const { name, price, category } = req.body;
    const product = new Product({ name, price, category });
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    // Mongoose validation errors come here
    next(err);
  }
};

// PUT /api/products/:id - update product
exports.updateProduct = async (req, res, next) => {
  try {
    const { name, price, category } = req.body;
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, category },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/products/:id - delete product
exports.deleteProduct = async (req, res, next) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted', id: deleted._id });
  } catch (err) {
    next(err);
  }
};
