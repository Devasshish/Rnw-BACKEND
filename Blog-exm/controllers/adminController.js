const User = require('../models/User');
const Article = require('../models/Article');
const Comment = require('../models/Comment');

exports.getDashboard = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    const articles = await Article.find().populate('author', 'username');
    const comments = await Comment.find().populate('author', 'username').populate('article', 'title');
    
    res.render('adminDashboard', { 
      user: req.user, 
      users, 
      articles,
      comments
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    // Prevent admin from deleting themselves
    if (userId === req.user.id) {
      return res.status(400).send("You cannot delete yourself.");
    }
    
    // Delete all comments and articles by this user first
    await Comment.deleteMany({ author: userId });
    await Article.deleteMany({ author: userId });
    await User.findByIdAndDelete(userId);
    
    res.redirect('/admin');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const articleId = req.params.id;
    await Comment.deleteMany({ article: articleId });
    await Article.findByIdAndDelete(articleId);
    
    // If they delete from the article page, redirect to home, else admin
    const referer = req.get('Referrer') || '/admin';
    if (referer.includes('/admin')) {
      res.redirect('/admin');
    } else {
      res.redirect('/');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const comment = await Comment.findById(commentId);
    if (comment) {
      // Remove comment reference from article
      await Article.findByIdAndUpdate(comment.article, { $pull: { comments: commentId } });
      await Comment.findByIdAndDelete(commentId);
    }
    
    const referer = req.get('Referrer') || '/admin';
    res.redirect(referer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
