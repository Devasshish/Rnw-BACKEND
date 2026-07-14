const express = require('express');
const router = express.Router();
const subcategoryController = require('../controllers/subcategoryController');
const { ensureAuthenticated } = require('../middlewares/auth');

router.get('/', ensureAuthenticated, subcategoryController.index);
router.post('/', ensureAuthenticated, subcategoryController.store);
router.post('/:id/update', ensureAuthenticated, subcategoryController.update);
router.post('/:id/delete', ensureAuthenticated, subcategoryController.destroy);
router.get('/by-category/:categoryId', ensureAuthenticated, subcategoryController.getByCategory);

module.exports = router;
