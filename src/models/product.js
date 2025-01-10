const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        catalogue_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'catalogue'
        },
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
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('product', productSchema);