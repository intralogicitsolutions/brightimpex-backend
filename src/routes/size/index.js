const { sizeValidator } = require('../../middleware');
const { urlConstants } = require('../../constants');
const sizeController = require('../../controllers/size');

module.exports = (app) => {
    app.post(urlConstants.SIZE, sizeValidator.createSizeValidation, sizeController?.createSize);
    app.get(urlConstants.SIZE, sizeController?.getSize);
    app.post(urlConstants.UPDATE_SIZE, sizeController?.updateSize);
    app.post(urlConstants.DELETE_SIZE, sizeController?.deleteSize)
};