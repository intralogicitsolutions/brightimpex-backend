const { contactUsValidator } = require('../../middleware');
const { urlConstants } = require('../../constants');
const contactUsController = require('../../controllers/contact-us');

module.exports = (app) => {
    app.post(urlConstants.CONTACT_US, contactUsValidator.sendQueryValidation, contactUsController?.sendQuery);
};