const express = require('express');
const router = express.Router();
const extraCategoryController = require('../controllers/extraCategoryController');
const { ensureAuthenticated } = require('../middlewares/auth');

router.get('/', ensureAuthenticated, extraCategoryController.index);
router.post('/', ensureAuthenticated, extraCategoryController.store);
router.post('/:id/update', ensureAuthenticated, extraCategoryController.update);
router.post('/:id/delete', ensureAuthenticated, extraCategoryController.destroy);
router.get('/by-subcategory/:subcategoryId', ensureAuthenticated, extraCategoryController.getBySubcategory);

module.exports = router;
