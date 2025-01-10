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
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('catalogue', catalogueSchema);
