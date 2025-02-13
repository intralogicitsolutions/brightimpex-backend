const { responseData, messageConstants } = require('../../constants');
const { logger } = require('../../utils');
const CategorySchema = require('../../models/category');

const createCategory = async (body, res) => {
    return new Promise(async () => {
        const { name } = body;
        await CategorySchema.findOne({ name, isDeleted: false }).then(async (category) => {
            console.log({ category })
            if (category) {
                logger.error(messageConstants.CATEGORY_EXISTS);
                return responseData.fail(res, messageConstants.CATEGORY_EXISTS, 400);
            } else {
                const category = new CategorySchema(body);
                await category?.save().then((result) => {
                    logger.info(`${messageConstants.CATEGORY_CREATED}`);
                    return responseData.success(res, result, `${messageConstants.CATEGORY_CREATED}`);
                }).catch(err => {
                    logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
                    if (err.code === 11000) {
                        return responseData.fail(res, messageConstants.CATEGORY_EXISTS, 400)
                    }
                    return responseData.fail(res, messageConstants.CATEGORY_EXISTS, 500)
                })
            }
        }).catch((err) => {
            logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
            return responseData.fail(res, messageConstants.INTERNAL_SERVER_ERROR, 500)
        })
    })
}

const getCategory = async (res) => {
    return new Promise(async () => {
        await CategorySchema.find({ isDeleted: false })
            .then((result) => {
                logger.info(`${messageConstants.CATEGORY_FETCHED}`);
                return responseData.success(res, result, `${messageConstants.CATEGORY_FETCHED}`);
            }).catch(err => {
                logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
                return responseData.fail(res, messageConstants.INTERNAL_SERVER_ERROR, 500)
            })
    })
}

const updateCategory = async (body, res) => {
    return new Promise(async () => {
        const { _id, ...fields } = body;
        const { name } = fields;
        const filters = {
            name,
            isDeleted: false,
            _id: { $ne: _id }
        };
        await CategorySchema.findOne(filters).then(async (category) => {
            if (category) {
                logger.error(messageConstants.CATEGORY_EXISTS);
                return responseData.fail(res, messageConstants.CATEGORY_EXISTS, 400);
            } else {
                await CategorySchema.findByIdAndUpdate(
                    _id,
                    { $set: fields },
                    { new: true }
                ).then((result) => {
                    if (!result) {
                        logger.warn('Category not found.');
                        return responseData.fail(res, 'Category not found.', 404);
                    }
                    logger.info(messageConstants.CATEGORY_UPDATED);
                    return responseData.success(res, null, `${messageConstants.CATEGORY_UPDATED}`);
                }).catch(err => {
                    logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
                    if (err.code === 11000) {
                        return responseData.fail(res, messageConstants.CATEGORY_EXISTS, 400)
                    }
                    return responseData.fail(res, messageConstants.INTERNAL_SERVER_ERROR, 500);
                })
            }
        }).catch((err) => {
            logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
            return responseData.fail(res, messageConstants.INTERNAL_SERVER_ERROR, 500)
        })
    })
}

const deleteCategory = async (id, res) => {
    await CategorySchema.findByIdAndUpdate(
        id,
        { $set: { isDeleted: true } },
        { new: true }
    )
        .then((size) => {
            if (!size) {
                logger.warn(`Category with id ${id} not found`);
                return responseData.fail(res, `Series with id ${id} not found`, 404);
            }
            logger.info(`Category with id ${id} deleted successfully`);
            return responseData.success(res, null, `${messageConstants.CATEGORY_DELETED}`);
        }).catch(err => {
            logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
            return responseData.fail(res, messageConstants.INTERNAL_SERVER_ERROR, 500);
        })
};


module.exports = {
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
}