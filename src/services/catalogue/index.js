const { responseData, messageConstants, mailTemplateConstants, mailSubjectConstants } = require('../../constants');
const { cryptoGraphy } = require('../../middleware');
const { logger, mail } = require('../../utils');
const CatalogueSchema = require("../../models/catalogue")

const createCatalogue = async (body, res) => {
    return new Promise(async () => {
        const catalogue = new CatalogueSchema(body);

        await catalogue.save().then((result) => {
            logger.info(`${messageConstants.CATALOGUE_CREATED}`);
            return responseData.success(res, result, `${messageConstants.CATALOGUE_CREATED}`);
        }).catch((err) => {
            logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
            return responseData.fail(res, messageConstants.INTERNAL_SERVER_ERROR, 500)
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
                populate: {
                    path: 'size_id',
                    select: 'height width unit '
                },
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
        if (!body?.id) {
            logger.error(`Update catalogues ${messageConstants.API_FAILED}`, "id not provided");
            return responseData.fail(res, 'Please provide id', 404);
        }
        const updateFields = {};
        if (body.name !== undefined) updateFields.name = body.name;
        if (body.description !== undefined) updateFields.description = body.description;
        if (body.image !== undefined) updateFields.image = body.image;
        if (body.size_id !== undefined) updateFields.size_id = body.size_id;
        if (body.series_id !== undefined) updateFields.series_id = body.series_id;
        if (body.category_id !== undefined) updateFields.category_id = body.category_id;

        await CatalogueSchema.findByIdAndUpdate(
            body.id,
            { $set: updateFields },
            { new: true }
        ).then((result) => {
            if (!result) {
                logger.warn('Catalogues not found.');
                return responseData.fail(res, 'catalogues not found.', 404);
            }
            logger.info('Catalogues updated successfully.');
            return responseData.success(res, null, `${messageConstants.CATALOGUE_UPDATED}`);
        }).catch(err => {
            logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
            return responseData.fail(res, messageConstants.INTERNAL_SERVER_ERROR, 500);
        })
    })
}
const deleteCatalogues = async (id, res) => {
    if (!id) {
        logger.error(`Delete catalogues ${messageConstants.API_FAILED}`, "id not provided");
        return responseData.fail(res, 'Please provide id', 404);
    }
    await CatalogueSchema.findByIdAndUpdate(id,
        { $set: { isDeleted: true } },
        { new: true })
        .then((size) => {
            if (!size) {
                logger.warn(`Catalogues with id ${id} not found`);
                return responseData.fail(res, `Series with id ${id} not found`, 404);
            }
            logger.info(`Catalogues with id ${id} deleted successfully`);
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