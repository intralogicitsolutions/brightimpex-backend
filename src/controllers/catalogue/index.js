const catalogueService = require('../../services/catalogue');
const { logger } = require('../../utils');
const { messageConstants } = require('../../constants');

const createCatalogue = async (req, res) => {
    try {
        const response = await catalogueService.createCatalogue(req.body, res);
        logger.info(`${messageConstants.RESPONSE_FROM} create catalogue API`, JSON.stringify(response));
        res.send(response);
    } catch (err) {
        logger.error(`Create Catalogue ${messageConstants.API_FAILED}`, err);
        res.send(err);
    }
}

const getCatalogues = async (req, res) => {
    try {
        const response = await catalogueService.getCatalogues(res);
        logger.info(`${messageConstants.RESPONSE_FROM} get catalogues API`, JSON.stringify(response));
        res.send(response);
    } catch (err) {
        logger.error(`Get Catalogues ${messageConstants.API_FAILED}`, err);
        res.send(err);
    }
}

module.exports = {
    createCatalogue,
    getCatalogues
}