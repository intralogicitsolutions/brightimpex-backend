const { categoryValidator, jsonWebToken } = require('../../middleware');
const { urlConstants } = require('../../constants');
const categoryController = require('../../controllers/category');

module.exports = (app) => {
    app.get(urlConstants.CATEGORY, categoryController?.getCategory);
    app.post(urlConstants.CATEGORY, jsonWebToken.validateToken, categoryValidator.createCategoryValidation, categoryController?.createCategory);
    app.put(urlConstants.CATEGORY, jsonWebToken.validateToken, categoryValidator.updateCategoryValidation, categoryController?.updateCategory);
    app.delete(urlConstants.CATEGORY, jsonWebToken.validateToken, categoryValidator.deleteCategoryValidation, categoryController?.deleteCategory)
};