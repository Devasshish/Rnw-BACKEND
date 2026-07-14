const mongoose = require('mongoose');

const extraCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory', required: true },
    description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('ExtraCategory', extraCategorySchema);
