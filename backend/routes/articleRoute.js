import express from 'express';
import asyncHandler from 'express-async-handler';
import Article from '../models/articleModel';
import { isAuthenticated, isAdmin } from '../util';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const articles = await Article.find();
  res.send(articles);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (article) {
    res.send(article);
  } else {
    throw Error('Article not found.');
  }
}));

router.post('/', isAuthenticated, isAdmin, asyncHandler(async (req, res) => {
  const article = new Article({
    articleHeadline: req.body.articleHeadline,
    articleImg: req.body.articleImg,
    articleLink: req.body.articleLink,
    publication: req.body.publication,

  });
  const newArticle = await article.save();
  res.send({ message: 'Article Created', data: newArticle });
}));

router.put('/:id', isAuthenticated, isAdmin, asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (article) {
    article.articleHeadline = req.body.articleHeadline || article.articleHeadline;
    article.articleImg = req.body.articleImg || article.articleImg;
    article.articleLink = req.body.articleLink || article.articleLink;
    article.publication = req.body.publication || article.publication;

    const updatedArticle = await article.save();
    res.send({ message: 'Article Updated', data: updatedArticle });
  } else {
    throw Error('Article does not exist.');
  }
}));

router.delete('/:id', isAuthenticated, isAdmin, asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (article) {
    const removeArticle = await article.remove();
    res.send({ message: 'Article Deleted', data: removeArticle });
  } else {
    throw Error('Article already removed.');
  }
}));

export default router;
