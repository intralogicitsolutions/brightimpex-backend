const { responseData, messageConstants } = require('../../constants');
const { logger } = require('../../utils');
const CountrySchema = require('../../models/country');
const CitySchema = require('../../models/city');

const getCountries = async (res) => {
    return new Promise(async () => {
        await CountrySchema.find()
            .then((result) => {
                logger.info(`${messageConstants.COUNTRY_FETCHED}`);
                return responseData.success(res, result, `${messageConstants.COUNTRY_FETCHED}`);
            }).catch(err => {
                logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
                return responseData.fail(res, messageConstants.INTERNAL_SERVER_ERROR, 500)
            })
    })
}

const getCitiesByCountry = async (data, res) => {
    const { countryCode } = data;
    return new Promise(async () => {
        await CitySchema.find({ countryCode })
            .then((result) => {
                logger.info(`${messageConstants.CITY_FETCHED}`);
                return responseData.success(res, result, `${messageConstants.CITY_FETCHED}`);
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