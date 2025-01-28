const { responseData, messageConstants } = require('../../constants');
const { logger } = require('../../utils');
const SizeSchema = require("../../models/size");

const createSize = async (body, res) => {
    return new Promise(async () => {
        const { height, width, unit } = body;
        await SizeSchema.findOne({ height, width, unit, isDeleted: false }).then(async (size) => {
            if (size) {
                logger.error(messageConstants.SIZE_EXISTS);
                return responseData.fail(res, messageConstants.SIZE_EXISTS, 400);
            } else {
                const size = new SizeSchema(body);
                await size.save().then((result) => {
                    logger.info(`${messageConstants.SIZE_CREATED}`);
                    return responseData.success(res, result, `${messageConstants.SIZE_CREATED}`);
                }).catch((err) => {
                    logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
                    return responseData.fail(res, messageConstants.INTERNAL_SERVER_ERROR, 500);
                })
            }
        }).catch((err) => {
            logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
            return responseData.fail(res, messageConstants.INTERNAL_SERVER_ERROR, 500);
        })
    })
}

const getSize = async (res) => {
    return new Promise(async () => {
        await SizeSchema.find({ isDeleted: false }).then((result) => {
            logger.info(`${messageConstants.SIZE_FETCHED}`);
            return responseData.success(res, result, `${messageConstants.SIZE_FETCHED}`);
        }).catch((err) => {
            logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
            return responseData.fail(res, messageConstants.INTERNAL_SERVER_ERROR, 500)
        })
    })
}

const updateSize = async (body, res) => {
    return new Promise(async () => {
        const { _id, height, width, unit } = body;
        await SizeSchema.findOne({
            height,
            width,
            unit,
            isDeleted: false,
            _id: { $ne: _id }
        }).then(async (size) => {
            if (size) {
                logger.error(messageConstants.SIZE_EXISTS);
                return responseData.fail(res, messageConstants.SIZE_EXISTS, 400);
            } else {
                await SizeSchema.findByIdAndUpdate(
                    _id,
                    { $set: { height, width, unit } },
                    { new: true }
                ).then((result) => {
                    if (!result) {
                        logger.warn('Size not found.');
                        return responseData.fail(res, 'Size not found.', 404);
                    }
                    logger.info('Size updated successfully.');
                    return responseData.success(res, null, `${messageConstants.SIZE_UPDATED}`);
                }).catch(err => {
                    logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
                    return responseData.fail(res, messageConstants.INTERNAL_SERVER_ERROR, 500);
                })
            }
        }).catch((err) => {
            logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
            return responseData.fail(res, messageConstants.INTERNAL_SERVER_ERROR, 500);
        })
    })
}

const deleteSize = async (id, res) => {
    await SizeSchema.findByIdAndUpdate(
        id,
        { $set: { isDeleted: true } },
        { new: true }
    )
        .then((size) => {
            if (!size) {
                logger.warn(`Size with id ${id} not found`);
                return responseData.fail(res, `Size with id ${id} not found`, 404);
            }
            logger.info(`Size with id ${id} deleted successfully`);
            return responseData.success(res, null, `${messageConstants.SIZE_DELETED}`);
        }).catch(err => {
            logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
            return responseData.fail(res, messageConstants.INTERNAL_SERVER_ERROR, 500);
        })
};


module.exports = {
    createSize,
    getSize,
    updateSize,
    deleteSize
}