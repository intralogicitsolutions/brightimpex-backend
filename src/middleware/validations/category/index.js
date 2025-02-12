const Joi = require('joi');
const { validateRequest } = require('../validate-request');

const createCategoryValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().allow(null).optional()
    })
    validateRequest(req.body, res, schema, next)
}

const updateCategoryValidation = (req, res, next) => {
    const schema = Joi.object({
        _id: Joi.string().required(),
        name: Joi.string(),
        description: Joi.string().allow(null).optional()
    })
    validateRequest(req.body, res, schema, next)
}

const deleteCategoryValidation = (req, res, next) => {
    const schema = Joi.object({
        _id: Joi.string().required()
    })
    validateRequest(req.query, res, schema, next)
}

module.exports = {
    createCategoryValidation,
    updateCategoryValidation,
    deleteCategoryValidation
}