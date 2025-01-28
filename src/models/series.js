const mongoose = require('mongoose');

const seriesSchema = mongoose.Schema(
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
        size_id: {
            type: mongoose.Schema.Types.ObjectId, // Reference to `size`
            ref: 'size',
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

module.exports = mongoose.model('series', seriesSchema);
