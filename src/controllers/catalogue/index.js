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

const updateCatalogues = async (req, res) => {
    try {
        const response = await catalogueService?.updateCatalogues(req.body, res);
        logger.info(`${messageConstants.RESPONSE_FROM} update Catalogues API`, JSON.stringify(response));
        res.send(response);
    } catch (err) {
        logger.error(`update Catalogues ${messageConstants.API_FAILED}`, err);
        res.send(err);
    }
}

const deleteCatalogues = async (req, res) => {
    try {
        const response = await catalogueService?.deleteCatalogues(req?.params?.id, res);
        logger.info(`${messageConstants.RESPONSE_FROM} delete Catalogues API`, JSON.stringify(response));
        res.send(response);
    } catch (err) {
        logger.error(`delete Catalogues ${messageConstants.API_FAILED}`, err);
        res.send(err);
    }
}

module.exports = {
    createCatalogue,
    getCatalogues,
    updateCatalogues,
    deleteCatalogues
}