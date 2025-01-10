const productService = require('../../services/product');
const { logger } = require('../../utils');
const { messageConstants } = require('../../constants');

// const signUp = async (req, res) => {
//     try {
//         const response = await productService.signUp(req.body, res);
//         logger.info(`${messageConstants.RESPONSE_FROM} signup API`, JSON.stringify(response));
//         res.send(response);
//     } catch (err) {
//         logger.error(`Signup ${messageConstants.API_FAILED}`, err);
//         res.send(err);
//     }
// }

module.exports = {
    // signUp
}