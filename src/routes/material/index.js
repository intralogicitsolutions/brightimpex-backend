const { materialValidator, jsonWebToken } = require('../../middleware');
const { urlConstants } = require('../../constants');
const materialController = require('../../controllers/material');

module.exports = (app) => {
    app.get(urlConstants.MATERIAL, materialController?.getMaterial);
    app.post(urlConstants.MATERIAL, jsonWebToken.validateToken, materialValidator.createMaterialValidation, materialController.createMaterial);
    app.put(urlConstants.MATERIAL, jsonWebToken.validateToken, materialValidator.updateMaterialValidation, materialController?.updateMaterial);
    app.delete(urlConstants.MATERIAL, jsonWebToken.validateToken, materialValidator.deleteMaterialValidation, materialController?.deleteMaterial)
};