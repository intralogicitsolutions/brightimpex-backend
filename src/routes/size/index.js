const { sizeValidator, jsonWebToken } = require('../../middleware');
const { urlConstants } = require('../../constants');
const sizeController = require('../../controllers/size');

module.exports = (app) => {
    app.get(urlConstants.SIZE, sizeController?.getSize);
    app.post(urlConstants.SIZE, jsonWebToken.validateToken, sizeValidator.createSizeValidation, sizeController?.createSize);
    app.put(urlConstants.SIZE, jsonWebToken.validateToken, sizeValidator.updateSizeValidation, sizeController?.updateSize);
    app.delete(urlConstants.SIZE, jsonWebToken.validateToken, sizeValidator.deleteSizeValidation, sizeController?.deleteSize);
};