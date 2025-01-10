const UserSchema = require('../../models/user');
const { responseData, mailSubjectConstants, mailTemplateConstants, messageConstants } = require('../../constants');
const { jsonWebToken, cryptoGraphy } = require('../../middleware');
const { logger, mail } = require('../../utils');

const signUp = async (body, res) => {
    return new Promise(async () => {
        const adminEmails = process.env.ADMIN_EMAILS;
        if(!adminEmails?.includes(body?.email)) {
            logger.error(messageConstants.PERMISSION_ERROR);
            return responseData.fail(res, messageConstants.PERMISSION_ERROR, 500);
        }
        body['password'] = await cryptoGraphy.hashPassword(body.password);
        body['status'] = 0;
        const userSchema = new UserSchema(body);
        await userSchema.save().then(async (result) => {
            await createJsonWebTokenForUser(result, '5m');
            const link = `${process.env.BASE_URL}/activate-account/${result._id}/${result.token}`;

            const mailContent = {
                firstname: body.firstname,
                lastname: body.lastname,
                link
            }

            delete result?._doc?.token;
            delete result?._doc?.password;

            logger.info(`User ${body['firstname']} ${body['lastname']} created successfully with ${body['email']}`);
            await mail.sendMailToUser(mailTemplateConstants.SIGNUP_TEMPLATE, body.email, mailSubjectConstants.SIGNUP_SUBJECT, res, mailContent);
            return responseData.success(res, result, messageConstants.ACTIVATION_MAIL_SENT);
        }).catch((err) => {
            if (err.code === 11000) {
                logger.error(`${Object.keys(err.keyValue)} already exists`);
                return responseData.fail(res, `${Object.keys(err.keyValue)} already exists `, 403);
            } else {
                logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
                return responseData.fail(res, messageConstants.INTERNAL_SERVER_ERROR, 500);
            }
        })
    })
}

const activateAccount = async (userDetails, res) => {
    return new Promise(async () => {
        await UserSchema.findOneAndUpdate({ _id: userDetails?._id }, { status: 1 }, { new: true }).then(async (result) => {
            if (result) {
                delete result?._doc?.password;
                logger.info(`User ${result['firstname']} ${result['lastname']} activated successfully with ${result['email']}`);
                return responseData.success(res, result, messageConstants.USER_ACTIVATED);
            } else {
                logger.error(messageConstants.USER_NOT_FOUND);
                return responseData.fail(res, messageConstants.USER_NOT_FOUND, 404);
            }
        }).catch((err) => {
            logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
            return responseData.fail(res, messageConstants.INTERNAL_SERVER_ERROR, 500);
        })
    })
}

const signIn = async (body, res) => {
    return new Promise(async () => {
        await UserSchema.findOne({
            email: body.email
        }).then(async (result) => {
            if (result) {
                const isMatch = await cryptoGraphy.comparePassword(body?.password, result?.password);
                if (isMatch) {
                    await createJsonWebTokenForUser(result);
                    logger.info(`User ${result['firstname']} ${result['lastname']} ${messageConstants.LOGGEDIN_SUCCESSFULLY}`);
                    return responseData.success(res, result, `User ${messageConstants.LOGGEDIN_SUCCESSFULLY}`);
                } else {
                    logger.error(messageConstants.EMAIL_PASS_INCORRECT);
                    return responseData.fail(res, messageConstants.EMAIL_PASS_INCORRECT, 401)
                }
            } else {
                logger.error(messageConstants.USER_NOT_FOUND);
                return responseData.fail(res, messageConstants.USER_NOT_FOUND, 404)
            }
        }).catch((err) => {
            logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
            return responseData.fail(res, messageConstants.INTERNAL_SERVER_ERROR, 500)
        })
    })
};

const forgotPassword = async (req, res, next) => {
    return new Promise(async () => {
        const user = await UserSchema.findOne({ email: req.body.email })
        if (user) {
            await createJsonWebTokenForUser(user, '5m');
            await forgotPasswordLink(res, user);
        } else {
            logger.error(messageConstants.USER_NOT_FOUND);
            return responseData.fail(res, messageConstants.USER_NOT_FOUND, 404)
        }
    })
}

const changePassword = async (body, user, res) => {
    return new Promise(async () => {
        body['new_password'] = await cryptoGraphy.hashPassword(body.new_password);
        await UserSchema.findOneAndUpdate(
            {
                _id: user._id
            },
            {
                password: body['new_password']
            }
        ).then(async (result) => {
            if (result) {
                delete result?._doc?.password;
                logger.info(`${messageConstants.PASSWORD_CHANGED} for ${user.email}`);
                return responseData.success(res, {}, messageConstants.PASSWORD_CHANGED);
            } else {
                logger.error(`${messageConstants.PASSWORD_NOT_CHANGED} for ${user.email}`);
                return responseData.fail(res, messageConstants.PASSWORD_NOT_CHANGED, 403)
            }
        })
    })
}

const createJsonWebTokenForUser = async (user, expiresIn = '8h') => {
    user['token'] = await jsonWebToken.createToken(user['_id'], expiresIn)
    await UserSchema.updateOne({
        _id: user['_id']
    }, { $set: { token: user['token'] } });
}

const forgotPasswordLink = async (res, user) => {
    const link = `${process.env.BASE_URL}/password-reset/${user._id}/${user.token}`;
    const mailContent = {
        firstname: user.firstname,
        lastname: user.lastname,
        link: link
    }
    await mail.sendMailToUser(mailTemplateConstants.FORGOT_PASS_TEMPLATE, user.email, mailSubjectConstants.FORGOT_PASS_SUBJECT, res, mailContent);
    return responseData.success(res, {}, messageConstants.EMAIL_SENT_FORGOT_PASSWORD);
}

module.exports = {
    signUp,
    activateAccount,
    signIn,
    forgotPassword,
    changePassword,
}