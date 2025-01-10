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
        await CatalogueSchema.find().then((result) => {
            logger.info(`${messageConstants.CATALOGUE_FETCHED}`);
            return responseData.success(res, result, `${messageConstants.CATALOGUE_FETCHED}`);
        }).catch((err) => {
            logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
            return responseData.fail(res, messageConstants.INTERNAL_SERVER_ERROR, 500)
        })
    })
}

module.exports = {
    createCatalogue,
    getCatalogues
}