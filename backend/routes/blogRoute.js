import express from 'express';
import asyncHandler from 'express-async-handler';
import Blog from '../models/blogModel';
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
  const blogs = await Blog.find({ ...category, ...search }).sort(order);
  res.send(blogs);
}));

router.get('/categories', asyncHandler(async (req, res) => {
  const categories = await Blog.find().distinct('category');
  res.send(categories);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.send(blog);
  } else {
    throw Error('Blog not found.');
  }
}));
router.post('/', isAuthenticated, isAdmin, asyncHandler(async (req, res) => {
  const blog = new Blog({
    imageUrl: req.body.imageUrl,
    headline: req.body.headline,
    blogPost: req.body.blogPost,
  
  });
  const newBlog = await blog.save();
  res.send({ message: 'Blog Created', data: newBlog });
}));

router.put('/:id', isAuthenticated, isAdmin, asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    blog.imageUrl = req.body.imageUrl || blog.imageUrl;
    blog.headline = req.body.headline || blog.headline;
    blog.blogPost = req.body.blogPost || blog.blogPost;
  

    const updatedBlog = await blog.save();
    res.send({ message: 'Blog Updated', data: updatedBlog });
  } else {
    throw Error('Blog does not exist.');
  }
}));
router.post('/:id/reviews', isAuthenticated, asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    const review = {
      rating: req.body.rating, comment: req.body.comment, user: req.user._id, name: req.user.name,
    };
    blog.reviews.push(review);
    blog.rating = blog.reviews.reduce((a, c) => c.rating + a, 0) / blog.reviews.length;
    blog.numReviews = blog.reviews.length;
    const updatedBlog = await blog.save();
    res.send({ message: 'Comment Created.', data: updatedBlog.reviews[updatedBlog.reviews.length - 1] });
  } else {
    throw Error('Blog does not exist.');
  }
}));
router.delete('/:id', isAuthenticated, isAdmin, asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    const removeBlog = await blog.remove();
    res.send({ message: 'Blog Deleted', data: removeBlog });
  } else {
    throw Error('Blog already removed.');
  }
}));

export default router;
