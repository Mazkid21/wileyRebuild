import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  articleHeadline: {
    type: String,
  },
  articleImg: {
    type: String,
  },
  articleLink: {
    type: String,
  },
  publication: {
    type: String,
  },
}, {
  timestamps: true,
});

const Article = mongoose.model('Article', articleSchema);

export default Article;
