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
        image: {
            type: String
        },
        catalogue_doc: {
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
