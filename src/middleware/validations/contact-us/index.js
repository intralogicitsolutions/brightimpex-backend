const Joi = require('joi');
const { validateRequest } = require('../validate-request');

const sendQueryValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        message: Joi.string().required(),
        city: Joi.string().required(),
        country: Joi.string().required(),
        phone: Joi.number().required(),
    })
    validateRequest(req.body, res, schema, next)
}

module.exports = {
    sendQueryValidation
}