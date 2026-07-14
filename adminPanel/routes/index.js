const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/auth');

const Category = require('../models/Category');
const Product = require('../models/Product');
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
        const products = await Product.find().populate('category').sort({ createdAt: -1 });
        res.render('home', { title: 'Home - NexVault', products, user: req.user, layout: false });
    } catch (err) {
        console.error(err);
        res.render('home', { title: 'Home - NexVault', products: [], user: req.user, layout: false });
    }
});

router.get('/product-details/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category subcategory extraCategory');
        if (!product) {
            return res.redirect('/');
        }
        res.render('product-details', { title: `${product.name} - NexVault`, product, user: req.user, layout: false });
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});

router.get('/dashboard', ensureAuthenticated, async (req, res) => {
    try {
        const productCount = await Product.countDocuments();
        const categoryCount = await Category.countDocuments();
        const userCount = await User.countDocuments();
        const sales = 0; // Placeholder as no order model exists
        
        const recentProducts = await Product.find().sort({ createdAt: -1 }).limit(3);
        const recentUsers = await User.find().sort({ createdAt: -1 }).limit(3);
        const recentCategories = await Category.find().sort({ createdAt: -1 }).limit(3);
        
        let activities = [];
        recentProducts.forEach(p => activities.push({ icon: 'fa-plus text-success', text: `New product "${p.name}" added.`, date: p.createdAt }));
        recentUsers.forEach(u => activities.push({ icon: 'fa-user-plus text-primary', text: `New user "${u.name}" registered.`, date: u.createdAt }));
        recentCategories.forEach(c => activities.push({ icon: 'fa-list text-warning', text: `New category "${c.name}" created.`, date: c.createdAt }));
        
        activities.sort((a, b) => b.date - a.date);
        activities = activities.slice(0, 5);
        
        res.render('admin/dashboard', { 
            title: 'Dashboard',
            productCount,
            categoryCount,
            userCount,
            sales,
            activities
        });
    } catch (err) {
        console.error(err);
        res.render('admin/dashboard', { title: 'Dashboard', productCount: 0, categoryCount: 0, userCount: 0, sales: 0, activities: [] });
    }
});

module.exports = router;
