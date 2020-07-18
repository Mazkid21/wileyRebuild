import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 5,
  },
  comment: {
    type: String,
    required: true
  },
}, {
  timestamps: true
});

const blogSchema = new mongoose.Schema({
  imageUrl: {
    type: String
  },
  headline: {
    type: String
  },
  blogPost: {
    type: String
  },
  reviews: [reviewSchema],
  rating: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 5,
  },
  numReviews: {
    type: Number,
    default: 0
  },
}, {
  timestamps: true
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;