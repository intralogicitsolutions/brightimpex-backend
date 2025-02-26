const express = require('express');
const api = express.Router();

const routes = [
    `auth`,
    `product`,
    `catalogue`,
    `size`,
    `series`,
    `category`,
    `upload`,
    `contact-us`,
    `common`
];

routes.forEach((route) => require(`./${route}`)(api));

module.exports = api;