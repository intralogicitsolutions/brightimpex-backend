const { logger } = require('../../utils');
const { messageConstants } = require('../../constants');
const seriesService = require('../../services/series');


const createSeries = async (req, res) => {
    try {
        const response = await seriesService?.createSeries(req?.body, res);
        logger.info(`${messageConstants.RESPONSE_FROM} create series API`, JSON.stringify(response));
        res.send(response);
    } catch (err) {
        logger.error(`Create series ${messageConstants.API_FAILED}`, err);
        res.send(err);
    }
}
const getSeries = async (req, res) => {
    try {
        const response = await seriesService?.getSeries(res);
        logger.info(`${messageConstants.RESPONSE_FROM} get series API`, JSON.stringify(response));
        res.send(response);
    } catch (err) {
        logger.error(`Get series ${messageConstants.API_FAILED}`, err);
        res.send(err);
    }
}

const updateSeries = async (req, res) => {
    try {
        const response = await seriesService?.updateSeries(req.body, res);
        logger.info(`${messageConstants.RESPONSE_FROM} update series API`, JSON.stringify(response));
        res.send(response);
    } catch (err) {
        logger.error(`update series ${messageConstants.API_FAILED}`, err);
        res.send(err);
    }
}

const deleteSeries = async (req, res) => {
    try {
        const response = await seriesService?.deleteSeries(req?.query?._id, res);
        logger.info(`${messageConstants.RESPONSE_FROM} delete series API`, JSON.stringify(response));
        res.send(response);
    } catch (err) {
        logger.error(`delete series ${messageConstants.API_FAILED}`, err);
        res.send(err);
    }
}

module.exports = {
    createSeries,
    getSeries,
    updateSeries,
    deleteSeries
}