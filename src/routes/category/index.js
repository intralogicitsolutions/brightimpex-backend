const { categoryValidator } = require('../../middleware');
const { urlConstants } = require('../../constants');
const categoryController = require('../../controllers/category');

module.exports = (app) => {
    app.get(urlConstants.CATEGORY, categoryController?.getCategory);
    app.post(urlConstants.CATEGORY, categoryValidator.createCategoryValidation, categoryController?.createCategory);
    app.put(urlConstants.CATEGORY, categoryValidator.updateCategoryValidation, categoryController?.updateCategory);
    app.delete(urlConstants.CATEGORY, categoryValidator.deleteCategoryValidation, categoryController?.deleteCategory)
};