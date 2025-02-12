const { seriesValidator, jsonWebToken } = require('../../middleware');
const { urlConstants } = require('../../constants');
const seriesController = require('../../controllers/series');

module.exports = (app) => {
    app.get(urlConstants.SERIES, seriesController?.getSeries);
    app.post(urlConstants.SERIES, jsonWebToken.validateToken, seriesValidator.createSeriesValidation, seriesController.createSeries);
    app.put(urlConstants.SERIES, jsonWebToken.validateToken, seriesValidator.updateSeriesValidation, seriesController?.updateSeries);
    app.delete(urlConstants.SERIES, jsonWebToken.validateToken, seriesValidator.deleteSeriesValidation, seriesController?.deleteSeries)
};