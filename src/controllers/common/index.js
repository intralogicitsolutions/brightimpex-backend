const { logger } = require('../../utils');
const { messageConstants } = require('../../constants');
const commonService = require('../../services/common')

const getCountries = async (req, res) => {
    try {
        const response = await commonService?.getCountries(res);
        logger.info(`${messageConstants.RESPONSE_FROM} get countries API`, JSON.stringify(response));
        res.send(response);
    } catch (err) {
        logger.error(`Get Countries ${messageConstants.API_FAILED}`, err);
        res.send(err);
    }
}

const getCitiesByCountry = async (req, res) => {
    try {
        const response = await commonService?.getCitiesByCountry(req, res);
        logger.info(`${messageConstants.RESPONSE_FROM} get cities by country API`, JSON.stringify(response));
        res.send(response);
    } catch (err) {
        logger.error(`Get cities by country ${messageConstants.API_FAILED}`, err);
        res.send(err);
    }
}

module.exports = {
    getCountries,
    getCitiesByCountry
}