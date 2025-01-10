const { logger } = require('../../utils');
const { messageConstants } = require('../../constants');
const categoryServise = require('../../services/category')


const createCategory = async (req, res) => {
    try {
        const response = await categoryServise?.createCategory(req?.body, res);
        logger.info(`${messageConstants.RESPONSE_FROM} create series API`, JSON.stringify(response));
        res.send(response);
    } catch (err) {
        logger.error(`Create series ${messageConstants.API_FAILED}`, err);
        res.send(err);
    }
}
const getCategory = async (req, res) => {
    try {
        const response = await categoryServise?.getCategory(res);
        logger.info(`${messageConstants.RESPONSE_FROM} get category API`, JSON.stringify(response));
        res.send(response);
    } catch (err) {
        logger.error(`Get category ${messageConstants.API_FAILED}`, err);
        res.send(err);
    }
}

const updateCategory = async (req, res) => {
    try {
        const response = await categoryServise?.updateCategory(req.body, res);
        logger.info(`${messageConstants.RESPONSE_FROM} update category API`, JSON.stringify(response));
        res.send(response);
    } catch (err) {
        logger.error(`update category ${messageConstants.API_FAILED}`, err);
        res.send(err);
    }
}

const deleteCategory = async (req, res) => {
    try {
        const response = await categoryServise?.deleteCategory(req?.params?.id, res);
        logger.info(`${messageConstants.RESPONSE_FROM} delete category API`, JSON.stringify(response));
        res.send(response);
    } catch (err) {
        logger.error(`delete category ${messageConstants.API_FAILED}`, err);
        res.send(err);
    }
}

module.exports = {
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
}