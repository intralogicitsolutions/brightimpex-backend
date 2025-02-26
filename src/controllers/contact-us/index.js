const { logger } = require('../../utils');
const { messageConstants } = require('../../constants');
const contactUsServise = require('../../services/contact-us')


const sendQuery = async (req, res) => {
    try {
        const response = await contactUsServise?.sendQuery(req?.body, res);
        logger.info(`${messageConstants.RESPONSE_FROM} send query API`, JSON.stringify(response));
        res.send(response);
    } catch (err) {
        logger.error(`Send query ${messageConstants.API_FAILED}`, err);
        res.send(err);
    }
}

module.exports = {
    sendQuery
}