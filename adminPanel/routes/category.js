const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { ensureAuthenticated } = require('../middlewares/auth');

router.get('/', ensureAuthenticated, categoryController.index);
router.post('/', ensureAuthenticated, categoryController.store);
router.post('/:id/update', ensureAuthenticated, categoryController.update);
router.post('/:id/delete', ensureAuthenticated, categoryController.destroy);

module.exports = router;
