const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { forwardAuthenticated, ensureAuthenticated } = require('../middlewares/auth');

router.get('/login', forwardAuthenticated, authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/logout', authController.logout);
router.get('/forgot', forwardAuthenticated, authController.getForgot);
router.post('/forgot', authController.postForgot);
router.get('/reset', forwardAuthenticated, authController.getReset);
router.post('/reset', authController.postReset);

module.exports = router;
