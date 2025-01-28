const { seriesValidator } = require('../../middleware');
const { urlConstants } = require('../../constants');
const seriesController = require('../../controllers/series');

module.exports = (app) => {
    app.get(urlConstants.SERIES, seriesController?.getSeries);
    app.post(urlConstants.SERIES, seriesValidator.createSeriesValidation, seriesController.createSeries);
    app.put(urlConstants.SERIES, seriesValidator.updateSeriesValidation, seriesController?.updateSeries);
    app.delete(urlConstants.SERIES, seriesValidator.deleteSeriesValidation, seriesController?.deleteSeries)
};