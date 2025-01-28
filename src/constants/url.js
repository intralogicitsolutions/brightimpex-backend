const urlConstants = {

    // ADMIN ROUTES
    ADMIN_SIGNUP: '/auth/signup',
    ACTIVATE_ACCOUNT: '/auth/activate',
    ADMIN_SIGNIN: '/auth/signin',
    FORGOT_PASSWORD: '/auth/forgot-password',
    CHANGE_PASSWORD: '/auth/change-password',

    // CATALOGUE ROUTES
    CATALOGUE: '/catalogue',
    UPDATE_CATALOUGE: `/catalogue/update-catalogue`,
    DELETE_CATALOGUE: '/catalogue/delete-catalogue/:id',

    // PRODUCT ROUTES
    PRODUCT: '/product',
    GET_PRODUCTS_BY_CATALOGUE: '/product/:catalogue_id',

    // SIZE ROUTES

    SIZE: '/size',
    UPDATE_SIZE: `/size/update-size`,
    DELETE_SIZE: '/size/delete-size/:id',

    // SERIES ROUTES

    SERIES: '/series',
    UPDATE_SERIES: `/series/update-series`,
    DELETE_SERIES: '/series/delete-series/:id',

    // CATEGORY ROUTES

    CATEGORY: '/category',
    UPDATE_CATEGORY: `/category/update-category`,
    DELETE_CATEGORY: '/category/delete-category/:id'
}

module.exports = urlConstants;