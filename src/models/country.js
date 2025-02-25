const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        country_code: {
            type: String,
            required: true
        },
        cities: {
            type: [String],
        }
    });

module.exports = mongoose.model('country', CountrySchema);
