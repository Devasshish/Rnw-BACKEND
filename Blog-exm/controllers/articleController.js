const Article = require('../models/Article');
const Comment = require('../models/Comment');
const User = require('../models/User');
// get articles
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate('author', 'username');
    res.render('articleList', { articles, user: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
// get my aricles

exports.getMyArticles = async (req, res) => {
  try {
    const articles = await Article.find({ author: req.user.id }).populate('author', 'username');
    res.render('myArticles', { articles, user: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// add article

exports.getNewArticleForm = (req, res) => {
  res.render('articleForm', { user: req.user });
};

exports.postNewArticle = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newArticle = new Article({
      title,
      content,
      author: req.user.id
    });
    const savedArticle = await newArticle.save();
    
    await User.findByIdAndUpdate(req.user.id, { $push: { articles: savedArticle._id } });
    
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// get single article

exports.getArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate('author', 'username')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'username'
        }
      });
    if (!article) return res.status(404).send('Article not found');
    res.render('articleItem', { article, user: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// add comment

exports.postComment = async (req, res) => {
  try {
    const { text } = req.body;
    const newComment = new Comment({
      text,
      author: req.user.id,
      article: req.params.id
    });
    const savedComment = await newComment.save();
    
    await Article.findByIdAndUpdate(req.params.id, { $push: { comments: savedComment._id } });
    
    res.redirect(`/articles/${req.params.id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
