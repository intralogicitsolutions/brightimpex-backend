const mongoose = require('mongoose');

const catalogueSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            index: { unique: true }
        },
        description: {
            type: String,
            trim: true,
        },
        image: {
            type: String
        },

        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
        size_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'size',
        },
        series_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'series',
        },
        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category',
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('catalogue', catalogueSchema);
