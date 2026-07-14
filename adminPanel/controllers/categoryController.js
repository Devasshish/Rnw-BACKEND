const Category = require('../models/Category');

exports.index = async (req, res) => {
    try {
        const categories = await Category.find();
        res.render('admin/category', { categories, title: 'Manage Categories' });
    } catch (err) {
        req.flash('error_msg', 'Server Error');
        res.redirect('/dashboard');
    }
};

exports.store = async (req, res) => {
    try {
        const newCategory = new Category(req.body);
        await newCategory.save();
        req.flash('success_msg', 'Category added');
        res.redirect('/category');
    } catch (err) {
        req.flash('error_msg', 'Error adding category');
        res.redirect('/category');
    }
};

exports.update = async (req, res) => {
    try {
        await Category.findByIdAndUpdate(req.params.id, req.body);
        req.flash('success_msg', 'Category updated');
        res.redirect('/category');
    } catch (err) {
        req.flash('error_msg', 'Error updating category');
        res.redirect('/category');
    }
};

exports.destroy = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        req.flash('success_msg', 'Category deleted');
        res.redirect('/category');
    } catch (err) {
        req.flash('error_msg', 'Error deleting category');
        res.redirect('/category');
    }
};
