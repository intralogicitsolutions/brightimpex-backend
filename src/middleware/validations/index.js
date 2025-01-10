const productValidator = require('./product');
const catalogueValidator = require('./catalogue');
const authValidator = require('./auth');

module.exports = {
    authValidator,
    productValidator,
    catalogueValidator
}