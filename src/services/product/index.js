const { responseData, messageConstants, mailTemplateConstants, mailSubjectConstants } = require('../../constants');
const { cryptoGraphy } = require('../../middleware');
const { logger, mail } = require('../../utils');

// const signIn = async (body, res) => {
//     return new Promise(async () => {
//         await UserSchema.findOne({ email: body.email }).then(async (result) => {
//             if (result) {
//                 const isMatch = await cryptoGraphy.comparePassword(body?.password, result?.password);
//                 if (isMatch) {
//                     await createJsonWebTokenForUser(result)
//                     logger.info(`User ${result['firstname']} ${result['lastname']} ${messageConstants.LOGGEDIN_SUCCESSFULLY}`);
//                     return responseData.success(res, result, `User ${messageConstants.LOGGEDIN_SUCCESSFULLY}`);
//                 } else {
//                     return responseData.fail(res, messageConstants.EMAIL_PASS_INCORRECT, 401)
//                 }
//             } else {
//                 logger.error(messageConstants.USER_NOT_FOUND);
//                 return responseData.fail(res, messageConstants.USER_NOT_FOUND, 404)
//             }
//         }).catch((err) => {
//             logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
//             return responseData.fail(res, messageConstants.INTERNAL_SERVER_ERROR, 500)
//         })
//     })
// }

module.exports = {
    // signIn,
}