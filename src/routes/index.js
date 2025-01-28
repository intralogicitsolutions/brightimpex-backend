const express = require('express');
const api = express.Router();

const routes = [
    `auth`,
    `product`,
    `catalogue`
];

routes.forEach((route) => require(`./${route}`)(api));

module.exports = api;