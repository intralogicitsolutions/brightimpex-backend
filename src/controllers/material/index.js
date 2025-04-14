const { logger } = require('../../utils');
const { messageConstants } = require('../../constants');
const materialService = require('../../services/material');

const createMaterial = async (req, res) => {
    try {
        const response = await materialService?.createMaterial(req?.body, res);
        logger.info(`${messageConstants.RESPONSE_FROM} create material API`, JSON.stringify(response));
        res.send(response);
    } catch (err) {
        logger.error(`Create material ${messageConstants.API_FAILED}`, err);
        res.send(err);
    }
}

const getMaterial = async (req, res) => {
    try {
        const response = await materialService?.getMaterial(res);
        logger.info(`${messageConstants.RESPONSE_FROM} get material API`, JSON.stringify(response));
        res.send(response);
    } catch (err) {
        logger.error(`Get material ${messageConstants.API_FAILED}`, err);
        res.send(err);
    }
}

const updateMaterial = async (req, res) => {
    try {
        const response = await materialService?.updateMaterial(req.body, res);
        logger.info(`${messageConstants.RESPONSE_FROM} update material API`, JSON.stringify(response));
        res.send(response);
    } catch (err) {
        logger.error(`update material ${messageConstants.API_FAILED}`, err);
        res.send(err);
    }
}

const deleteMaterial = async (req, res) => {
    try {
        const response = await materialService?.deleteMaterial(req?.query?._id, res);
        logger.info(`${messageConstants.RESPONSE_FROM} delete material API`, JSON.stringify(response));
        res.send(response);
    } catch (err) {
        logger.error(`delete material ${messageConstants.API_FAILED}`, err);
        res.send(err);
    }
}

module.exports = {
    createMaterial,
    getMaterial,
    updateMaterial,
    deleteMaterial
}