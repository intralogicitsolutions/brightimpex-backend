const Joi = require('joi');
const { validateRequest } = require('../validate-request');

const createSeriesValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string(),
        size_id: Joi.string()
    })
    validateRequest(req.body, res, schema, next)
}

module.exports = {
    createSeriesValidation
}