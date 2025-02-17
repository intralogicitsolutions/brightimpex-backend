const { responseData, messageConstants } = require('../../constants');
const { logger } = require('../../utils');
const CatalogueSchema = require("../../models/catalogue");
const { ObjectId } = require('mongoose').Types;

const createCatalogue = async (body, res) => {
    return new Promise(async () => {
        const { name, size_id, series_id, category_id } = body;
        console.log({ name, size_id, series_id, category_id });
        await CatalogueSchema.findOne({ name, size_id, series_id, category_id, isDeleted: false }).then(async (catalogue) => {
            if (catalogue) {
                logger.error(messageConstants.CATALOGUE_EXISTS);
                return responseData.fail(res, messageConstants.CATALOGUE_EXISTS, 400);
            } else {
                const catalogue = new CatalogueSchema(body);
                await catalogue.save().then((result) => {
                    logger.info(`${messageConstants.CATALOGUE_CREATED}`);
                    return responseData.success(res, result, `${messageConstants.CATALOGUE_CREATED}`);
                }).catch((err) => {
                    if (err.code === 11000) {
                        logger.error(messageConstants.CATALOGUE_EXISTS);
                        return responseData.fail(res, messageConstants.CATALOGUE_EXISTS, 400)
                    }
                    logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
                    return responseData.fail(res, messageConstants.INTERNAL_SERVER_ERROR, 500);
                })
            }
        }).catch((err) => {
            logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
            return responseData.fail(res, messageConstants.INTERNAL_SERVER_ERROR, 500);
        })
    })
}

const getCatalogues = async (res) => {
    return new Promise(async () => {
        await CatalogueSchema.find({ isDeleted: false })
            .populate({
                path: 'size_id',
                select: 'height width unit'
            })
            .populate({
                path: 'series_id',
                // populate: {
                //     path: 'size_id',
                //     select: 'height width unit '
                // },
                select: 'name description size_id'
            })
            .populate({
                path: 'category_id',
                select: 'name description'
            }).then((result) => {
                logger.info(`${messageConstants.CATALOGUE_FETCHED}`);
                return responseData.success(res, result, `${messageConstants.CATALOGUE_FETCHED}`);
            }).catch((err) => {
                logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
                return responseData.fail(res, messageConstants.INTERNAL_SERVER_ERROR, 500)
            })
    })
}

const updateCatalogues = async (body, res) => {
    return new Promise(async () => {
        const { _id, ...fields } = body;
        const { name, size_id, series_id, category_id } = fields;

        const filters = {
            name,
            size_id,
            series_id,
            category_id,
            isDeleted: false,
            _id: { $ne: _id }
        };

        await CatalogueSchema.findOne(filters).then(async (catalogue) => {
            if (catalogue) {
                logger.error(messageConstants.CATALOGUE_EXISTS);
                return responseData.fail(res, messageConstants.CATALOGUE_EXISTS, 400);
            } else {
                await CatalogueSchema.findByIdAndUpdate(
                    _id,
                    { $set: fields },
                    { new: true }
                ).then((result) => {
                    if (!result) {
                        logger.warn('Catalogues not found.');
                        return responseData.fail(res, 'catalogues not found.', 404);
                    }
                    logger.info('Catalogues updated successfully.');
                    return responseData.success(res, null, `${messageConstants.CATALOGUE_UPDATED}`);
                }).catch(err => {
                    if (err.code === 11000) {
                        logger.error(messageConstants.CATALOGUE_EXISTS);
                        return responseData.fail(res, messageConstants.CATALOGUE_EXISTS, 400)
                    }
                    logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
                    return responseData.fail(res, messageConstants.INTERNAL_SERVER_ERROR, 500);
                })
            }
        }).catch((err) => {
            logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
            return responseData.fail(res, messageConstants.INTERNAL_SERVER_ERROR, 500);
        })
    })
}
const deleteCatalogues = async (id, res) => {
    await CatalogueSchema.findByIdAndUpdate(
        id,
        { $set: { isDeleted: true } },
        { new: true }
    )
        .then((catalogue) => {
            if (!catalogue) {
                logger.warn(`Catalogue with id ${id} not found`);
                return responseData.fail(res, `Catalogue with id ${id} not found`, 404);
            }
            logger.info(`Catalogue with id ${id} deleted successfully`);
            return responseData.success(res, null, `${messageConstants.CATALOGUE_DELETED}`);
        }).catch(err => {
            logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
            return responseData.fail(res, messageConstants.INTERNAL_SERVER_ERROR, 500);
        })
};


module.exports = {
    createCatalogue,
    getCatalogues,
    updateCatalogues,
    deleteCatalogues
}