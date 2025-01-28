const mongoose = require('mongoose');
const { logger } = require('../utils');
const { messageConstants } = require('../constants');

const connectDb = async () => {
    try {
        var dbURI = process.env.DB_URL;
        let connection = await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true });
        logger.info(`Database ${messageConstants.CONNECTED_SUCCESSFULLY}`);
    } catch (error) {
        console.error(error);
        process.exit(1)
    }
};

module.exports = connectDb;