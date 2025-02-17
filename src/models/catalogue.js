const mongoose = require('mongoose');

const catalogueSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        image_name: {
            type: String
        },
        image_path: {
            type: String
        },
        catalogue_doc_name: {
            type: String
        },
        catalogue_doc_path: {
            type: String
        },
        size_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'size',
            required: true,
        },
        series_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'series',
            required: true,
        },
        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category',
            required: true,
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('catalogue', catalogueSchema);
