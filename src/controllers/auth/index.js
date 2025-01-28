const authService = require('../../services/auth');
const { logger } = require('../../utils');
const { messageConstants } = require('../../constants');

const signUp = async (req, res) => {
    try {
        const response = await authService.signUp(req.body, res);
        logger.info(`${messageConstants.RESPONSE_FROM} signup API`, JSON.stringify(response));
        res.send(response);
    } catch (err) {
        logger.error(`Signup ${messageConstants.API_FAILED}`, err);
        res.send(err);
    }
}

const activateAccount = async (req, res) => {
    try {
        const response = await authService.activateAccount(req.userDetails, res);
        logger.info(`${messageConstants.RESPONSE_FROM} activate account API`, JSON.stringify(response));
        res.send(response);
    } catch (err) {
        logger.error(`Activate account ${messageConstants.API_FAILED}`, err);
        res.send(err);
    }
}

const signIn = async (req, res) => {
    try {
        const response = await authService.signIn(req.body, res);
        logger.info(`${messageConstants.RESPONSE_FROM} signin API`, JSON.stringify(response));
        res.send(response)
    } catch (err) {
        logger.error(`Signin ${messageConstants.API_FAILED}`, err);
        res.send(err)
    }
}

const forgotPassword = async (req, res, next) => {
    try {
        const response = await authService.forgotPassword(req, res, next);
        logger.info(`${messageConstants.RESPONSE_FROM} forgotPassword API`, JSON.stringify(response));
        res.send(response);
    } catch (err) {
        logger.error(`Forgot Password ${messageConstants.API_FAILED}`, err);
        res.send(err);
    }

}
const changePassword = async (req, res, next) => {
    try {
        const userData = req?.userDetails;
        const response = await authService.changePassword(req.body, userData, res, next);
        logger.info(`${messageConstants.RESPONSE_FROM} changePassword API`, JSON.stringify(response));
        res.send(response);
    } catch (err) {
        logger.error(`Change Password ${messageConstants.API_FAILED}`, err);
        res.send(err);
    }

}

module.exports = {
    signUp,
    activateAccount,
    signIn,
    forgotPassword,
    changePassword
}