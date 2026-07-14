const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { ensureAuthenticated } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.get('/', ensureAuthenticated, productController.index);
router.post('/', ensureAuthenticated, upload.single('image'), productController.store);
router.post('/:id/update', ensureAuthenticated, upload.single('image'), productController.update);
router.post('/:id/delete', ensureAuthenticated, productController.destroy);

module.exports = router;
