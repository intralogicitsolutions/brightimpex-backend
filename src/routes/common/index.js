const { urlConstants } = require('../../constants');
const commonController = require('../../controllers/common');

module.exports = (app) => {
    app.get(urlConstants.GET_COUNTRY_LIST, commonController?.getCountries);
    app.get(urlConstants.GET_CITY_LIST, commonController?.getCitiesByCountry);
};