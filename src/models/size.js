const mongoose = require('mongoose');

const sizeSchema = mongoose.Schema(
    {
        height: {
            type: Number,
            required: true,
        },
        width: {
            type: Number,
            required: true,
        },
        unit: {
            type: String,
            trim: true,
            required: true
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
        },

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('size', sizeSchema);
