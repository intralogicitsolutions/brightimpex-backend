const Joi = require('joi');
const { validateRequest } = require('../validate-request');

const createCatalogueValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string(),
        image: Joi.string(),
        size_id: Joi.string().required(),
        series_id: Joi.string().required(),
        category_id: Joi.string().required()
    })
    validateRequest(req.body, res, schema, next)
}

module.exports = {
    createCatalogueValidation,
}