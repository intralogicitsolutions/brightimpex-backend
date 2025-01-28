const { categoryValidator } = require('../../middleware');
const { urlConstants } = require('../../constants');
const categoryController = require('../../controllers/category');

module.exports = (app) => {
    app.post(urlConstants.CATEGORY, categoryValidator.createCategoryValidation, categoryController?.createCategory);
    app.get(urlConstants.CATEGORY, categoryController?.getCategory);
    app.post(urlConstants.UPDATE_CATEGORY, categoryController?.updateCategory);
    app.post(urlConstants.DELETE_CATEGORY, categoryController?.deleteCategory)
};