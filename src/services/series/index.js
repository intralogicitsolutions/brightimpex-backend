const { responseData, messageConstants } = require('../../constants');
const { logger } = require('../../utils');
const SeriesSchema = require('../../models/series');

const createSeries = async (body, res) => {
    return new Promise(async () => {
        const series = new SeriesSchema(body);
        await series?.save().then((result) => {
            logger.info(`${messageConstants.SERIES_CREATED}`);
            return responseData.success(res, result, `${messageConstants.SERIES_CREATED}`);
        }).catch(err => {
            logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
            return responseData.fail(res, messageConstants.INTERNAL_SERVER_ERROR, 500)
        })
    })
}

const getSeries = async (res) => {
    return new Promise(async () => {
        await SeriesSchema.find({ isDeleted: false })
            .populate({
                path: 'size_id',
                select: 'height width unit'
            }).then((result) => {
                logger.info(`${messageConstants.SERIES_FETCHED}`);
                return responseData.success(res, result, `${messageConstants.SERIES_FETCHED}`);
            }).catch(err => {
                logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
                return responseData.fail(res, messageConstants.INTERNAL_SERVER_ERROR, 500)
            })
    })
}
const updateSeries = async (body, res) => {
    return new Promise(async () => {
        if (!body?.id) {
            logger.error(`Update series ${messageConstants.API_FAILED}`, "id not provided");
            return responseData.fail(res, 'Please provide id', 404);
        }
        const updateFields = {};
        if (body.name !== undefined) updateFields.name = body.name;
        if (body.description !== undefined) updateFields.description = body.description;
        if (body.size_id !== undefined) updateFields.size_id = body.size_id;

        await SeriesSchema.findByIdAndUpdate(
            body.id,
            { $set: updateFields },
            { new: true }
        ).then((result) => {
            if (!result) {
                logger.warn('Series not found.');
                return responseData.fail(res, 'Series not found.', 404);
            }
            logger.info('Series updated successfully.');
            return responseData.success(res, null, `${messageConstants.SERIES_UPDATED}`);
        }).catch(err => {
            logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
            return responseData.fail(res, messageConstants.INTERNAL_SERVER_ERROR, 500);
        })
    })
}
const deleteSeries = async (id, res) => {
    if (!id) {
        logger.error(`Delete Series ${messageConstants.API_FAILED}`, "id not provided");
        return responseData.fail(res, 'Please provide id', 404);
    }
    await SeriesSchema.findByIdAndUpdate(id,
        { $set: { isDeleted: true } },
        { new: true })
        .then((size) => {
            if (!size) {
                logger.warn(`Series with id ${id} not found`);
                return responseData.fail(res, `Series with id ${id} not found`, 404);
            }
            logger.info(`Series with id ${id} deleted successfully`);
            return responseData.success(res, null, `${messageConstants.SERIES_DELETED}`);
        }).catch(err => {
            logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
            return responseData.fail(res, messageConstants.INTERNAL_SERVER_ERROR, 500);
        })
};


module.exports = {
    createSeries,
    getSeries,
    updateSeries,
    deleteSeries
}