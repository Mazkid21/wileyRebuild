import express from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel';
import { isAuthenticated, isAdmin } from '../util';

const router = express.Router();

router.get(
  '/',
  isAuthenticated,
  isAdmin,
  asyncHandler(async (req, res) => {
    const blogs = await Order.find({}).populate('user');
    res.send(blogs);
  })
);

router.post('/ddd', (req, res) => {
  res.send('ok');
  res.send('new');
});

router.get(
  '/mine',
  isAuthenticated,
  asyncHandler(async (req, res) => {
    const blogs = await Order.find({ user: req.user._id });
    res.send(blogs);
  })
);

router.get(
  '/categories',
  asyncHandler(async (req, res) => {
    const categories = await Order.find().distinct('category');
    res.send(categories);
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const blog = await Order.findById(req.params.id);
    if (blog) {
      res.send(blog);
    } else {
      throw Error('Order not found.');
    }
  })
);
router.post(
  '/',
  isAuthenticated,
  asyncHandler(async (req, res) => {
    const blog = new Order({
      orderItems: req.body.cartItems,
      payment: req.body.payment,
      shipping: req.body.shipping,
      itemPrice: req.body.itemPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
      taxPrice: req.body.taxPrice,
      user: req.user._id,
    });
    const newOrder = await blog.save();
    res.send({ message: 'Order Created', data: newOrder });
  })
);
router.put(
  '/:id/pay',
  isAuthenticated,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.payment.paymentResult = {
        orderID: req.body.orderID,
        payerID: req.body.payerID,
        paymentID: req.body.paymentID,
      };
      order.isPaid = true;
      order.paidAt = Date.now();

      const updatedOrder = await order.save();
      res.send({ message: 'Order Paid', data: updatedOrder });
    } else {
      throw Error('Order does not exist.');
    }
  })
);
router.put(
  '/:id/deliver',
  isAuthenticated,
  isAdmin,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.send({ message: 'Order Delivered', data: updatedOrder });
    } else {
      throw Error('Order does not exist.');
    }
  })
);

router.put(
  '/:id',
  isAuthenticated,
  isAdmin,
  asyncHandler(async (req, res) => {
    const blog = await Order.findById(req.params.id);
    if (blog) {
      blog.name = req.body.name || blog.name;
      blog.price = req.body.price || blog.price;
      blog.countInStock = req.body.countInStock || blog.countInStock;
      blog.image = req.body.image || blog.image;
      blog.category = req.body.category || blog.category;
      blog.brand = req.body.brand || blog.brand;
      blog.features = req.body.features || blog.features;

      const updatedOrder = await blog.save();
      res.send({ message: 'Order Updated', data: updatedOrder });
    } else {
      throw Error('Order does not exist.');
    }
  })
);
router.delete(
  '/:id',
  isAuthenticated,
  isAdmin,
  asyncHandler(async (req, res) => {
    const blog = await Order.findById(req.params.id);
    if (blog) {
      const removeOrder = await blog.remove();
      res.send({ message: 'Order Deleted', data: removeOrder });
    } else {
      throw Error('Order already removed.');
    }
  })
);

export default router;
