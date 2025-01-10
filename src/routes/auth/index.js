const api = require('../../controllers/auth');
const { authValidator, jsonWebToken } = require('../../middleware');
const { urlConstants } = require('../../constants');

module.exports = (app) => {
    app.post(urlConstants.ADMIN_SIGNUP, authValidator.signUpValidation, api.signUp);
    app.get(urlConstants.ACTIVATE_ACCOUNT, jsonWebToken.validateToken, api.activateAccount);
    app.post(urlConstants.ADMIN_SIGNIN, authValidator.signInValidation, api.signIn);
    app.post(urlConstants.FORGOT_PASSWORD, authValidator.forgotPasswordValidation, api.forgotPassword);
    app.post(urlConstants.CHANGE_PASSWORD, jsonWebToken.validateToken, authValidator.changePasswordValidation, api.changePassword);
}