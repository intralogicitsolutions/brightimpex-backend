const Joi = require('joi');
const { validateRequest } = require('../validate-request');

const createSizeValidation = (req, res, next) => {
    const schema = Joi.object({
        height: Joi.number().required(),
        width: Joi.number().required(),
        unit: Joi.string().required()
    })
    validateRequest(req.body, res, schema, next)
}

module.exports = {
    createSizeValidation
}