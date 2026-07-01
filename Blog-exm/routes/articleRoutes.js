const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const { requireAuth } = require('../middlewares/auth');

// article routes
router.get('/', articleController.getAllArticles);
router.get('/my-articles', requireAuth, articleController.getMyArticles);
router.get('/articles/new', requireAuth, articleController.getNewArticleForm);
router.post('/articles/new', requireAuth, articleController.postNewArticle);
router.get('/articles/:id', articleController.getArticle);
router.post('/articles/:id/comments', requireAuth, articleController.postComment);

module.exports = router;
