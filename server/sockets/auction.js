const Product = require('../models/productModel');

module.exports = (io) => {
  return io.on('connection', (socket) => {
    socket.on('bid', async ({ id, current_price }) => {
      await Product.updatePrice(id, current_price);
      const product = await Product.getOne(id);
      io.emit('newPrice', product);
    });    
  });
};