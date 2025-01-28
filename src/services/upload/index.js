const fs = require("fs");
const path = require("path");
const { messageConstants, responseData } = require("../../constants");
const mime = require('mime-types');

const uploadDir = path.join(__dirname, "../../../uploads");

const uploadImage = async (req, res) => {
    return new Promise(async () => {
        const file = req?.file;
        if (!file) {
            return responseData.fail(res, messageConstants.FILE_NOT_PROVIDE, 400);
        };

        const imagesDir = path.join(uploadDir, "images");

        if (!fs.existsSync(imagesDir)) {
            fs.mkdirSync(imagesDir, { recursive: true });
        }

        const originalName = file.originalname;
        const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}${path.extname(originalName)}`;
        const filePath = path.join(imagesDir, uniqueName);

        fs.writeFile(filePath, file.buffer, (err) => {
            if (err) {
                return responseData.fail(res, messageConstants.FILE_SAVE_ERROR, 500);
            }

            const relativeFilePath = `images/${uniqueName}`;
            return responseData.success(res, { filePath: relativeFilePath, fileName: originalName }, `${messageConstants.FILE_UPLOADED_SUCCESSFULLY}`);
        });
    })
}

const getImage = async (filePath, res) => {
    return new Promise(async () => {
        const fullPath = path.join(uploadDir, filePath);

        fs.readFile(fullPath, (err, data) => {
            if (err) {
                if (err.code == 'ENOENT') {
                    return responseData.fail(res, messageConstants.FILE_NOT_FOUND, 500);
                } else {
                    return responseData.fail(res, messageConstants.FILE_READ_ERROR, 500);
                }
            }
            const mimeType = mime.lookup(fullPath) || 'application/octet-stream';
            res.setHeader("Content-Type", mimeType);
            res.send(data);
        });
    })
}

const uploadDocument = async (req, res) => {
    return new Promise(async () => {
        const file = req?.file;
        if (!file) {
            return responseData.fail(res, messageConstants.FILE_NOT_PROVIDE, 400);
        };

        const documentsDir = path.join(uploadDir, "documents");

        if (!fs.existsSync(documentsDir)) {
            fs.mkdirSync(documentsDir, { recursive: true });
        }

        const originalName = file.originalname;
        const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}${path.extname(originalName)}`;
        const filePath = path.join(documentsDir, uniqueName);

        fs.writeFile(filePath, file.buffer, (err) => {
            if (err) {
                return responseData.fail(res, messageConstants.FILE_SAVE_ERROR, 500);
            }

            const relativeFilePath = `documents/${uniqueName}`;
            return responseData.success(res, { filePath: relativeFilePath, fileName: originalName }, `${messageConstants.FILE_UPLOADED_SUCCESSFULLY}`);
        });
    })
}

module.exports = {
    uploadImage,
    getImage,
    uploadDocument
}