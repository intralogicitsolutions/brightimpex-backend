const { responseData, messageConstants } = require('../../constants');
const { logger } = require('../../utils');
const CountrySchema = require('../../models/country');
const { Types } = require('mongoose');

const getCountries = async (res) => {
    return new Promise(async () => {
        await CountrySchema.find().select('_id name country_code')
            .then((result) => {
                logger.info(`${messageConstants.COUNTRY_FETCHED}`);
                return responseData.success(res, result, `${messageConstants.COUNTRY_FETCHED}`);
            }).catch(err => {
                logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
                return responseData.fail(res, messageConstants.INTERNAL_SERVER_ERROR, 500)
            })
    })
}
const getCitiesByCountry = async (req, res) => {
    return new Promise(async () => {
        const countryId = req.params.countryId;
        await CountrySchema.find({_id: new Types.ObjectId(countryId)}).select('cities')
            .then((result) => {
                logger.info(`${messageConstants.COUNTRY_FETCHED}`);
                return responseData.success(res, result, `${messageConstants.COUNTRY_FETCHED}`);
            }).catch(err => {
                logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
                return responseData.fail(res, messageConstants.INTERNAL_SERVER_ERROR, 500)
            })
    })
}


module.exports = {
    getCountries,
    getCitiesByCountry
}