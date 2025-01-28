const uploadService = require('../../services/upload');

const uploadImage = async (req, res) => {
    try {
        const response = await uploadService?.uploadImage(req, res);
        logger.info(`${messageConstants.RESPONSE_FROM} upload image API`, JSON.stringify(response));
        res.send(response);
    } catch (err) {
        logger.error(`Upload Image ${messageConstants.API_FAILED}`, err);
        res.send(err);
    }
}

const getImage = async (req, res) => {
    try {
        const response = await uploadService?.getImage(req?.body?.filePath, res);
        logger.info(`${messageConstants.RESPONSE_FROM} get image API`, JSON.stringify(response));
        res.send(response);
    } catch (err) {
        logger.error(`Get Image ${messageConstants.API_FAILED}`, err);
        res.send(err);
    }
}

const uploadDocument = async (req, res) => {
    try {
        const response = await uploadService?.uploadDocument(req, res);
        logger.info(`${messageConstants.RESPONSE_FROM} upload document API`, JSON.stringify(response));
        res.send(response);
    } catch (err) {
        logger.error(`Upload document ${messageConstants.API_FAILED}`, err);
        res.send(err);
    }
}

module.exports = {
    uploadImage,
    getImage,
    uploadDocument
};