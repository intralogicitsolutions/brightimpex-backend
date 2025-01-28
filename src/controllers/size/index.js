const { logger } = require('../../utils');
const { messageConstants } = require('../../constants');
const sizeService = require('../../services/size');


const createSize = async (req, res) => {
    try {
        const response = await sizeService?.createSize(req?.body, res);
        logger.info(`${messageConstants.RESPONSE_FROM} create size API`, JSON.stringify(response));
        res.send(response);
    } catch (err) {
        logger.error(`Create size ${messageConstants.API_FAILED}`, err);
        res.send(err);
    }
}

const getSize = async (req, res) => {
    try {
        const response = await sizeService?.getSize(res);
        logger.info(`${messageConstants.RESPONSE_FROM} get size API`, JSON.stringify(response));
        res.send(response);
    } catch (err) {
        logger.error(`Get size ${messageConstants.API_FAILED}`, err);
        res.send(err);
    }
}

const updateSize = async (req, res) => {
    try {
        const response = await sizeService?.updateSize(req.body, res);
        logger.info(`${messageConstants.RESPONSE_FROM} update size API`, JSON.stringify(response));
        res.send(response);
    } catch (err) {
        logger.error(`update size ${messageConstants.API_FAILED}`, err);
        res.send(err);
    }
}

const deleteSize = async (req, res) => {
    try {
        const response = await sizeService?.deleteSize(req?.params?.id, res);
        logger.info(`${messageConstants.RESPONSE_FROM} delete size API`, JSON.stringify(response));
        res.send(response);
    } catch (err) {
        logger.error(`delete size ${messageConstants.API_FAILED}`, err);
        res.send(err);
    }
}

module.exports = {
    createSize,
    getSize,
    updateSize,
    deleteSize
}