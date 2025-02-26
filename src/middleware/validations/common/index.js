const Joi = require('joi');
const { validateRequest } = require('../validate-request');

const getCitiesValidation = (req, res, next) => {
    const schema = Joi.object({
        countryCode: Joi.string().required(),
    })
    validateRequest(req.query, res, schema, next)
}

module.exports = {
    getCitiesValidation
}