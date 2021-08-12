const Product = require('../models/productModel');

const getAll = async (_req, res) => {
  const products = await Product.getAll();

  return res.status(200).json(products);
};

module.exports = { getAll };