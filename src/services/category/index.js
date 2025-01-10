const { responseData, messageConstants } = require('../../constants');
const { logger } = require('../../utils');
const CategorySchema = require('../../models/category');

const createCategory = async (body, res) => {
    return new Promise(async () => {
        const category = new CategorySchema(body);
        await category?.save().then((result) => {
            logger.info(`${messageConstants.CATEGORY_CREATED}`);
            return responseData.success(res, result, `${messageConstants.CATEGORY_CREATED}`);
        }).catch(err => {
            logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
            return responseData.fail(res, messageConstants.INTERNAL_SERVER_ERROR, 500)
        })
    })
}

const getCategory = async (res) => {
    return new Promise(async () => {
        await CategorySchema.find({ isDeleted: false })
            .populate({
                path: 'size_id',
                select: 'height width unit'
            })
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
        if (!body?.id) {
            logger.error(`Update category ${messageConstants.API_FAILED}`, "id not provided");
            return responseData.fail(res, 'Please provide id', 404);
        }
        const updateFields = {};
        if (body.name !== undefined) updateFields.name = body.name;
        if (body.description !== undefined) updateFields.description = body.description;

        await CategorySchema.findByIdAndUpdate(
            body.id,
            { $set: updateFields },
            { new: true }
        ).then((result) => {
            if (!result) {
                logger.warn('Category not found.');
                return responseData.fail(res, 'Category not found.', 404);
            }
            logger.info('Category updated successfully.');
            return responseData.success(res, null, `${messageConstants.CATEGORY_UPDATED}`);
        }).catch(err => {
            logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
            return responseData.fail(res, messageConstants.INTERNAL_SERVER_ERROR, 500);
        })
    })
}
const deleteCategory = async (id, res) => {
    if (!id) {
        logger.error(`Delete category ${messageConstants.API_FAILED}`, "id not provided");
        return responseData.fail(res, 'Please provide id', 404);
    }
    await CategorySchema.findByIdAndUpdate(id,
        { $set: { isDeleted: true } },
        { new: true })
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