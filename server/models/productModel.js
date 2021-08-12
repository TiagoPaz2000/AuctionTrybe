const connection = require("../database/connectionDB");


const getAll = async () => {
  const [result] = await connection.execute('SELECT * FROM products');

  return result;
};

const getOne = async (id) => {
  const [result] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);

  return result[0];
}

const updatePrice = async (id, current_price) => {
  await connection
    .execute('UPDATE products SET current_price = ? WHERE id = ?', [current_price, id]);
}

module.exports = { getAll, updatePrice, getOne };