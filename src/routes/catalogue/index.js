const catalogueController = require('../../controllers/catalogue');
const { catalogueValidator } = require('../../middleware');
const { urlConstants } = require('../../constants');

module.exports = (app) => {
    app.get(urlConstants.CATALOGUE, catalogueController.getCatalogues);
    app.post(urlConstants.CATALOGUE, catalogueValidator.createCatalogueValidation, catalogueController.createCatalogue);
    app.put(urlConstants.CATALOGUE, catalogueValidator.updateCatalogueValidation, catalogueController.updateCatalogues);
    app.delete(urlConstants.CATALOGUE, catalogueValidator.deleteCatalogueValidation, catalogueController.deleteCatalogues);
};