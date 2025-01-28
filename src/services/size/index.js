const { responseData, messageConstants } = require('../../constants');
const { logger } = require('../../utils');
const SizeSchema = require("../../models/size");

const createSize = async (body, res) => {
    return new Promise(async () => {
        const size = new SizeSchema(body);
        await size.save().then((result) => {
            logger.info(`${messageConstants.SIZE_CREATED}`);
            return responseData.success(res, result, `${messageConstants.SIZE_CREATED}`);
        }).catch((err) => {
            logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
            return responseData.fail(res, messageConstants.INTERNAL_SERVER_ERROR, 500)
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

        if (!body?.id) {
            logger.error(`Update size ${messageConstants.API_FAILED}`, "id not provided");
            return responseData.fail(res, 'Please provide id', 404);
        }

        const updateFields = {};
        if (body.height !== undefined) updateFields.height = body.height;
        if (body.width !== undefined) updateFields.width = body.width;
        if (body.unit !== undefined) updateFields.unit = body.unit;

        await SizeSchema.findByIdAndUpdate(
            body.id,
            { $set: updateFields },
            { new: true }
        ).then((result) => {
            console.log(result)
            if (!result) {
                logger.warn('Size not found.');
                return responseData.fail(res, 'Size not found.', 404);
            }

            logger.info('Size updated successfully.');
            return responseData.success(res, null, `${messageConstants.SIZE_UPDATED}`);
        }).catch(err => {
            console.error(err, ">>> Error updating size.");
            logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
            return responseData.fail(res, messageConstants.INTERNAL_SERVER_ERROR, 500);
        })
    })
}

const deleteSize = async (id, res) => {
    if (!id) {
        logger.error(`Delete size ${messageConstants.API_FAILED}`, "id not provided");
        return responseData.fail(res, 'Please provide id', 404);
    }
    await SizeSchema.findByIdAndUpdate(id,
        { $set: { isDeleted: true } },
        { new: true })
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