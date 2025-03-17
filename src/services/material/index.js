const { responseData, messageConstants } = require('../../constants');
const { logger } = require('../../utils');
const MaterialSchema = require('../../models/material');
const CatalogueSchema = require('../../models/catalogue');

const createMaterial = async (body, res) => {
    return new Promise(async () => {
        const { name } = body;
        await MaterialSchema.findOne({ name, isDeleted: false }).then(async (material) => {
            if (material) {
                logger.error(messageConstants.MATERIAL_EXISTS);
                return responseData.fail(res, messageConstants.MATERIAL_EXISTS, 400);
            } else {
                const material = new MaterialSchema(body);
                await material?.save().then((result) => {
                    logger.info(`${messageConstants.MATERIAL_CREATED}`);
                    return responseData.success(res, result, `${messageConstants.MATERIAL_CREATED}`);
                }).catch(err => {
                    if (err.code === 11000) {
                        logger.error(messageConstants.MATERIAL_EXISTS);
                        return responseData.fail(res, messageConstants.MATERIAL_EXISTS, 400)
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

const getMaterial = async (res) => {
    return new Promise(async () => {
        await MaterialSchema.find({ isDeleted: false })
            .then((result) => {
                logger.info(`${messageConstants.MATERIAL_FETCHED}`);
                return responseData.success(res, result, `${messageConstants.MATERIAL_FETCHED}`);
            }).catch(err => {
                logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
                return responseData.fail(res, messageConstants.INTERNAL_SERVER_ERROR, 500)
            })
    })
}

const updateMaterial = async (body, res) => {
    return new Promise(async () => {
        const { _id, ...fields } = body;
        const { name } = fields;
        const filters = {
            name,
            isDeleted: false,
            _id: { $ne: _id }
        };
        await MaterialSchema.findOne(filters).then(async (material) => {
            if (material) {
                logger.error(messageConstants.MATERIAL_EXISTS);
                return responseData.fail(res, messageConstants.MATERIAL_EXISTS, 400);
            } else {
                await MaterialSchema.findByIdAndUpdate(
                    _id,
                    { $set: fields },
                    { new: true }
                ).then((result) => {
                    if (!result) {
                        logger.warn('Material not found.');
                        return responseData.fail(res, 'Material not found.', 404);
                    }
                    logger.info('Material updated successfully.');
                    return responseData.success(res, null, `${messageConstants.MATERIAL_UPDATED}`);
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

const deleteMaterial = async (id, res) => {
    await CatalogueSchema.findOne({ material_id: id, isDeleted: false }).then(async (catalogue) => {
        if (catalogue) {
            logger.warn(`Delete all the products of this material to delete this material`);
            return responseData.fail(res, `Delete all the products of this material to delete this material`, 400);
        } else {
            await MaterialSchema.findByIdAndUpdate(
                id,
                { $set: { isDeleted: true } },
                { new: true }
            )
                .then((material) => {
                    if (!material) {
                        logger.warn(`Material with id ${id} not found`);
                        return responseData.fail(res, `Material with id ${id} not found`, 404);
                    }
                    logger.info(`Material with id ${id} deleted successfully`);
                    return responseData.success(res, null, `${messageConstants.MATERIAL_DELETED}`);
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
    createMaterial,
    getMaterial,
    updateMaterial,
    deleteMaterial
}