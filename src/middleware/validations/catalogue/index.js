const Joi = require('joi');
const { validateRequest } = require('../validate-request');

const createCatalogueValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().allow(null).optional(),
        image_name: Joi.string().allow(null).optional(),
        image_path: Joi.string().required(),
        catalogue_doc_name: Joi.string().allow(null).optional(),
        catalogue_doc_path: Joi.string().required(),
        size_id: Joi.string().required(),
        series_id: Joi.string().required(),
        category_id: Joi.string().required()
    })
    validateRequest(req.body, res, schema, next)
}

const updateCatalogueValidation = (req, res, next) => {
    const schema = Joi.object({
        _id: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string().allow(null).optional(),
        image_name: Joi.string().allow(null).optional(),
        image_path: Joi.string().required(),
        catalogue_doc_name: Joi.string().allow(null).optional(),
        catalogue_doc_path: Joi.string().required(),
        size_id: Joi.string().required(),
        series_id: Joi.string().required(),
        category_id: Joi.string().required()
    })
    validateRequest(req.body, res, schema, next)
}

const deleteCatalogueValidation = (req, res, next) => {
    const schema = Joi.object({
        _id: Joi.string().required(),
    })
    validateRequest(req.query, res, schema, next)
}

module.exports = {
    createCatalogueValidation,
    updateCatalogueValidation,
    deleteCatalogueValidation
}