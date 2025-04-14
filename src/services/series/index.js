const { responseData, messageConstants } = require('../../constants');
const { logger } = require('../../utils');
const SeriesSchema = require('../../models/series');
const CatalogueSchema = require('../../models/catalogue');

const createSeries = async (body, res) => {
    return new Promise(async () => {
        const { name } = body;
        await SeriesSchema.findOne({ name, isDeleted: false }).then(async (series) => {
            if (series) {
                logger.error(messageConstants.SERIES_EXISTS);
                return responseData.fail(res, messageConstants.SERIES_EXISTS, 400);
            } else {
                const series = new SeriesSchema(body);
                await series?.save().then((result) => {
                    logger.info(`${messageConstants.SERIES_CREATED}`);
                    return responseData.success(res, result, `${messageConstants.SERIES_CREATED}`);
                }).catch(err => {
                    if (err.code === 11000) {
                        logger.error(messageConstants.SERIES_EXISTS);
                        return responseData.fail(res, messageConstants.SERIES_EXISTS, 400)
                    }
                    logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
                    return responseData.fail(res, messageConstants.INTERNAL_SERVER_ERROR, 500)
                })
            }
        }).catch((err) => {
            logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
            return responseData.fail(res, messageConstants.INTERNAL_SERVER_ERROR, 500)
        })
    })
}

const getSeries = async (res) => {
    return new Promise(async () => {
        await SeriesSchema.find({ isDeleted: false })
            .then((result) => {
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
        const { _id, ...fields } = body;
        const { name } = fields;
        const filters = {
            name,
            isDeleted: false,
            _id: { $ne: _id }
        };
        await SeriesSchema.findOne(filters).then(async (series) => {
            if (series) {
                logger.error(messageConstants.SERIES_EXISTS);
                return responseData.fail(res, messageConstants.SERIES_EXISTS, 400);
            } else {
                await SeriesSchema.findByIdAndUpdate(
                    _id,
                    { $set: fields },
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
            }
        }).catch((err) => {
            logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
            return responseData.fail(res, messageConstants.INTERNAL_SERVER_ERROR, 500)
        })
    })
}

const deleteSeries = async (id, res) => {
    await CatalogueSchema.findOne({ series_id: id, isDeleted: false }).then(async (catalogue) => {
        if (catalogue) {
            logger.warn(`Delete all the products of this series to delete this series`);
            return responseData.fail(res, `Delete all the products of this series to delete this series`, 400);
        } else {
            await SeriesSchema.findByIdAndUpdate(
                id,
                { $set: { isDeleted: true } },
                { new: true }
            )
                .then((series) => {
                    if (!series) {
                        logger.warn(`Series with id ${id} not found`);
                        return responseData.fail(res, `Series with id ${id} not found`, 404);
                    }
                    logger.info(`Series with id ${id} deleted successfully`);
                    return responseData.success(res, null, `${messageConstants.SERIES_DELETED}`);
                }).catch((err) => {
                    logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
                    return responseData.fail(res, messageConstants.INTERNAL_SERVER_ERROR, 500);
                })
        }
    }).catch((err) => {
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