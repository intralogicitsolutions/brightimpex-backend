const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        region: {
            type: String
        },
        regionCode: {
            type: String
        },
        country: {
            type: String,
            required: true
        },
        countryCode: {
            type: String,
            required: true
        },
        coordinates: {
            type: {
                type: String
            },
            coordinates: {
                type: [Number]
            }
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

module.exports = mongoose.model('city', CitySchema);
