const { sizeValidator } = require('../../middleware');
const { urlConstants } = require('../../constants');
const sizeController = require('../../controllers/size');

module.exports = (app) => {
    app.post(urlConstants.SIZE, sizeValidator.createSizeValidation, sizeController?.createSize);
    app.get(urlConstants.SIZE, sizeController?.getSize);
    app.put(urlConstants.SIZE, sizeValidator.updateSizeValidation, sizeController?.updateSize);
    app.delete(urlConstants.SIZE, sizeValidator.deleteSizeValidation, sizeController?.deleteSize);
};