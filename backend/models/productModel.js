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

const productSchema = new mongoose.Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    min: 0
  },
  countInStock: {
    type: Number,
    min: 0
  },
  category: {
    type: String
  },
  brand: {
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

const Product = mongoose.model('Product', productSchema);

export default Product;