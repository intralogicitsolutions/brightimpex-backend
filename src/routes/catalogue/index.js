const catalogueController = require('../../controllers/catalogue');
const { catalogueValidator, jsonWebToken } = require('../../middleware');
const { urlConstants } = require('../../constants');

module.exports = (app) => {
    app.get(urlConstants.CATALOGUE, catalogueController.getCatalogues);
    app.post(urlConstants.CATALOGUE, jsonWebToken.validateToken, catalogueValidator.createCatalogueValidation, catalogueController.createCatalogue);
    app.put(urlConstants.CATALOGUE, jsonWebToken.validateToken, catalogueValidator.updateCatalogueValidation, catalogueController.updateCatalogues);
    app.delete(urlConstants.CATALOGUE, jsonWebToken.validateToken, catalogueValidator.deleteCatalogueValidation, catalogueController.deleteCatalogues);
};