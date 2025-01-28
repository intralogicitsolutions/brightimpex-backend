const { seriesValidator } = require('../../middleware');
const { urlConstants } = require('../../constants');
const seriesController = require('../../controllers/series');

module.exports = (app) => {
    app.post(urlConstants.SERIES, seriesValidator.createSeriesValidation, seriesController.createSeries);
    app.get(urlConstants.SERIES, seriesController?.getSeries);
    app.post(urlConstants.UPDATE_SERIES, seriesController?.updateSeries);
    app.post(urlConstants.DELETE_SERIES, seriesController?.deleteSeries)
};