import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel';
import { isAuthenticated, isAdmin } from '../util';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const category = req.query.category ? { category: req.query.category } : {};
  const search = req.query.search ? {
    name: {
      $regex: req.query.search,
      $options: 'i',
    },

  } : {};
  const order = req.query.sort ? (req.query.sort === 'lowest'
    ? { price: 1 } : { price: -1 }) : { _id: -1 };
  const products = await Product.find({ ...category, ...search }).sort(order);
  res.send(products);
}));

router.get('/categories', asyncHandler(async (req, res) => {
  const categories = await Product.find().distinct('category');
  res.send(categories);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    throw Error('Product not found.');
  }
}));
router.post('/', isAuthenticated, isAdmin, asyncHandler(async (req, res) => {
  const product = new Product({
    imageUrl: req.body.imageUrl,
    headline: req.body.headline,
    linkUrl: req.body.linkUrl,
  
  });
  const newProduct = await product.save();
  res.send({ message: 'Product Created', data: newProduct });
}));

router.put('/:id', isAuthenticated, isAdmin, asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    product.imageUrl = req.body.imageUrl || product.imageUrl;
    product.headline = req.body.headline || product.headline;
    product.linkUrl = req.body.linkUrl || product.linkUrl;
  

    const updatedProduct = await product.save();
    res.send({ message: 'Product Updated', data: updatedProduct });
  } else {
    throw Error('Product does not exist.');
  }
}));
router.post('/:id/reviews', isAuthenticated, asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    const review = {
      rating: req.body.rating, comment: req.body.comment, user: req.user._id, name: req.user.name,
    };
    product.reviews.push(review);
    product.rating = product.reviews.reduce((a, c) => c.rating + a, 0) / product.reviews.length;
    product.numReviews = product.reviews.length;
    const updatedProduct = await product.save();
    res.send({ message: 'Comment Created.', data: updatedProduct.reviews[updatedProduct.reviews.length - 1] });
  } else {
    throw Error('Product does not exist.');
  }
}));
router.delete('/:id', isAuthenticated, isAdmin, asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    const removeProduct = await product.remove();
    res.send({ message: 'Product Deleted', data: removeProduct });
  } else {
    throw Error('Product already removed.');
  }
}));

export default router;
