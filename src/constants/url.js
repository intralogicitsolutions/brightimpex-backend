const urlConstants = {

    // ADMIN ROUTES
    ADMIN_SIGNUP: '/auth/signup',
    ACTIVATE_ACCOUNT: '/auth/activate',
    ADMIN_SIGNIN: '/auth/signin',
    FORGOT_PASSWORD: '/auth/forgot-password',
    CHANGE_PASSWORD: '/auth/change-password',

    // CATALOGUE ROUTES
    CATALOGUE: '/catalogue',

    // PRODUCT ROUTES
    PRODUCT: '/product',
    GET_PRODUCTS_BY_CATALOGUE: '/product/:catalogue_id',

    // SIZE ROUTES
    SIZE: '/size',

    // SERIES ROUTES
    SERIES: '/series',

    // CATEGORY ROUTES
    CATEGORY: '/category',

    // UPLOAD ROUTES
    UPLOAD_IMAGE: '/upload/uploadImage',
    GET_IMAGE: '/upload/getImage',
    UPLOAD_DOCUMENT: '/upload/uploadDocument',

    // CONTACT US ROUTES
    CONTACT_US: '/contact-us/query',

    // COMMON ROUTES
    GET_COUNTRY_LIST: '/common/get-country-list',
    GET_CITY_LIST: '/common/get-cities-list/:countryId'
}

module.exports = urlConstants;