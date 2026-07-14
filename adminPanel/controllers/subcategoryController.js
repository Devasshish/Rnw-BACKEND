const Subcategory = require('../models/Subcategory');
const Category = require('../models/Category');

exports.index = async (req, res) => {
    try {
        const subcategories = await Subcategory.find().populate('category');
        const categories = await Category.find();
        res.render('admin/subcategory', { subcategories, categories, title: 'Manage Subcategories' });
    } catch (err) {
        req.flash('error_msg', 'Server Error');
        res.redirect('/dashboard');
    }
};

exports.store = async (req, res) => {
    try {
        const newSubcategory = new Subcategory(req.body);
        await newSubcategory.save();
        req.flash('success_msg', 'Subcategory added');
        res.redirect('/subcategory');
    } catch (err) {
        req.flash('error_msg', 'Error adding subcategory');
        res.redirect('/subcategory');
    }
};

exports.update = async (req, res) => {
    try {
        await Subcategory.findByIdAndUpdate(req.params.id, req.body);
        req.flash('success_msg', 'Subcategory updated');
        res.redirect('/subcategory');
    } catch (err) {
        req.flash('error_msg', 'Error updating subcategory');
        res.redirect('/subcategory');
    }
};

exports.destroy = async (req, res) => {
    try {
        await Subcategory.findByIdAndDelete(req.params.id);
        req.flash('success_msg', 'Subcategory deleted');
        res.redirect('/subcategory');
    } catch (err) {
        req.flash('error_msg', 'Error deleting subcategory');
        res.redirect('/subcategory');
    }
};

exports.getByCategory = async (req, res) => {
    try {
        const subcategories = await Subcategory.find({ category: req.params.categoryId });
        res.json(subcategories);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};
