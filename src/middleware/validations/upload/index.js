const Joi = require('joi');
const { validateRequest } = require('../validate-request');

const getImageValidation = (req, res, next) => {
    const schema = Joi.object({
        filePath: Joi.string().required()
    })
    validateRequest(req.body, res, schema, next)
}

module.exports = {
    getImageValidation
}