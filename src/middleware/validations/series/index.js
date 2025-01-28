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

const updateSeriesValidation = (req, res, next) => {
    const schema = Joi.object({
        _id: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string(),
        size_id: Joi.string()
    })
    validateRequest(req.body, res, schema, next)
}

const deleteSeriesValidation = (req, res, next) => {
    const schema = Joi.object({
        _id: Joi.string().required(),
    })
    validateRequest(req.query, res, schema, next)
}

module.exports = {
    createSeriesValidation,
    updateSeriesValidation,
    deleteSeriesValidation
}