const { urlConstants } = require('../../constants');
const uploadController = require('../../controllers/upload');
const multer = require('multer');
const { uploadValidator } = require('../../middleware/validations');
const { jsonWebToken } = require('../../middleware');

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 10 }
});

module.exports = (app) => {
    app.post(urlConstants.GET_IMAGE, uploadValidator.getImageValidation, uploadController?.getImage);
    app.post(urlConstants.UPLOAD_IMAGE, jsonWebToken.validateToken, upload.single('file'), uploadController?.uploadImage);
    app.post(urlConstants.UPLOAD_DOCUMENT, jsonWebToken.validateToken, upload.single('file'), uploadController?.uploadDocument);
};