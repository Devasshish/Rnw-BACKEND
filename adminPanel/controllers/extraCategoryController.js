const ExtraCategory = require('../models/ExtraCategory');
const Subcategory = require('../models/Subcategory');
const Category = require('../models/Category');

exports.index = async (req, res) => {
    try {
        const extracategories = await ExtraCategory.find().populate({
            path: 'subcategory',
            populate: { path: 'category' }
        });
        const categories = await Category.find();
        res.render('admin/extracategory', { extracategories, categories, title: 'Manage Extra Categories' });
    } catch (err) {
        req.flash('error_msg', 'Server Error');
        res.redirect('/dashboard');
    }
};

exports.store = async (req, res) => {
    try {
        const newExtraCategory = new ExtraCategory(req.body);
        await newExtraCategory.save();
        req.flash('success_msg', 'Extra Category added');
        res.redirect('/extracategory');
    } catch (err) {
        req.flash('error_msg', 'Error adding extra category');
        res.redirect('/extracategory');
    }
};

exports.update = async (req, res) => {
    try {
        await ExtraCategory.findByIdAndUpdate(req.params.id, req.body);
        req.flash('success_msg', 'Extra Category updated');
        res.redirect('/extracategory');
    } catch (err) {
        req.flash('error_msg', 'Error updating extra category');
        res.redirect('/extracategory');
    }
};

exports.destroy = async (req, res) => {
    try {
        await ExtraCategory.findByIdAndDelete(req.params.id);
        req.flash('success_msg', 'Extra Category deleted');
        res.redirect('/extracategory');
    } catch (err) {
        req.flash('error_msg', 'Error deleting extra category');
        res.redirect('/extracategory');
    }
};

exports.getBySubcategory = async (req, res) => {
    try {
        const extra = await ExtraCategory.find({ subcategory: req.params.subcategoryId });
        res.json(extra);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};
