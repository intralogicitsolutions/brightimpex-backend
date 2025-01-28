const productValidator = require('./product');
const catalogueValidator = require('./catalogue');
const authValidator = require('./auth');
const sizeValidator = require('./size');
const seriesValidator = require('./series');
const categoryValidator = require('./category');
const uploadValidator = require('./upload')

module.exports = {
    authValidator,
    productValidator,
    catalogueValidator,
    sizeValidator,
    seriesValidator,
    categoryValidator,
    uploadValidator
}