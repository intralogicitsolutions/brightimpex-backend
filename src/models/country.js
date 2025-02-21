const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        code: {
            type: String,
            required: true
        },
        capital: {
            type: String,
            required: true
        },
        region: {
            type: String,
            required: true
        },
        currency: {
            code: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            symbol: {
                type: String,
                required: true
            }
        },
        language: {
            code: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        },
        flag: {
            type: String,
            required: true
        },
        dialling_code: {
            type: String,
            required: true
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
        timestamps: true
    }
);

module.exports = mongoose.model('country', CountrySchema);
