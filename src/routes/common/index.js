const { urlConstants } = require('../../constants');
const commonController = require('../../controllers/common');
const { commonValidator } = require('../../middleware/validations');

module.exports = (app) => {
    app.get(urlConstants.GET_COUNTRY_LIST, commonController?.getCountries);
    app.get(urlConstants.GET_CITY_LIST, commonValidator.getCitiesValidation, commonController?.getCitiesByCountry);
};