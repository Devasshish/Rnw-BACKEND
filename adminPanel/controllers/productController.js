const Product = require('../models/Product');
const Category = require('../models/Category');

exports.index = async (req, res) => {
    try {
        const products = await Product.find().populate('category subcategory extraCategory');
        const categories = await Category.find();
        res.render('admin/product', { products, categories, title: 'Manage Products' });
    } catch (err) {
        req.flash('error_msg', 'Server Error');
        res.redirect('/dashboard');
    }
};

exports.store = async (req, res) => {
    try {
        const image = req.file ? `/uploads/${req.file.filename}` : null;
        if(!image) {
             req.flash('error_msg', 'Image is required');
             return res.redirect('/product');
        }
        
        const productData = { ...req.body, image };
        if (productData.extraCategory === '') delete productData.extraCategory;
        
        const newProduct = new Product(productData);
        await newProduct.save();
        req.flash('success_msg', 'Product added');
        res.redirect('/product');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error adding product');
        res.redirect('/product');
    }
};

exports.update = async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.file) updateData.image = `/uploads/${req.file.filename}`;
        if (updateData.extraCategory === '') delete updateData.extraCategory;
        
        await Product.findByIdAndUpdate(req.params.id, updateData);
        req.flash('success_msg', 'Product updated');
        res.redirect('/product');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error updating product');
        res.redirect('/product');
    }
};

exports.destroy = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        req.flash('success_msg', 'Product deleted');
        res.redirect('/product');
    } catch (err) {
        req.flash('error_msg', 'Error deleting product');
        res.redirect('/product');
    }
};
