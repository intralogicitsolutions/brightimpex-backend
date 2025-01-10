const catalogueController = require('../../controllers/catalogue');
const { catalogueValidator } = require('../../middleware');
const { urlConstants } = require('../../constants');

module.exports = (app) => {
    app.post(urlConstants.CATALOGUE, catalogueValidator.createCatalogueValidation, catalogueController.createCatalogue);
    app.get(urlConstants.CATALOGUE, catalogueController.getCatalogues);
    app.post(urlConstants.UPDATE_CATALOUGE, catalogueController.updateCatalogues);
    app.post(urlConstants.DELETE_CATALOGUE, catalogueController.deleteCatalogues);
};