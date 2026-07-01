const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { requireAdmin } = require('../middlewares/auth');

// admin routes
router.get('/admin', requireAdmin, adminController.getDashboard);
router.post('/admin/users/:id/delete', requireAdmin, adminController.deleteUser);
router.post('/admin/articles/:id/delete', requireAdmin, adminController.deleteArticle);
router.post('/admin/comments/:id/delete', requireAdmin, adminController.deleteComment);

module.exports = router;
