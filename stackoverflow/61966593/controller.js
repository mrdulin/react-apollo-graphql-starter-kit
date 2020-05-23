import { ProductModel } from './productModel';

export const getAllProducts = (req, res) => {
  const products = new ProductModel('github', 'reddit').getAll();

  res.status(200);
  res.send(products);
};
