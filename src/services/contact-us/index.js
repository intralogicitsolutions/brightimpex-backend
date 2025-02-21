const { responseData, messageConstants, mailSubjectConstants, mailTemplateConstants } = require('../../constants');
const { logger, mail } = require('../../utils');
const ContactUsSchema = require('../../models/contact-us');

const sendQuery = async (body, res) => {
    return new Promise(async () => {
        const contact = new ContactUsSchema(body);
        await contact?.save().then(async (result) => {
            if (result) {
                const email = process.env.EMAIL_USER;
                const mailContent = {
                    ...body
                }
                await mail.sendMailToUser(mailTemplateConstants.QUERY_TEMPLATE, email, mailSubjectConstants.NEW_QUERY_SUBJECT, res, mailContent);
                logger.info(`${messageConstants.CONTACT_QUERY_CREATED}`);
                return responseData.success(res, result, `${messageConstants.CONTACT_QUERY_CREATED}`);
            }
        }).catch(err => {
            logger.error(messageConstants.INTERNAL_SERVER_ERROR, err);
            return responseData.fail(res, messageConstants.CONTACT_QUERY_CREATED, 500)
        })
    })
}

module.exports = {
    sendQuery
}