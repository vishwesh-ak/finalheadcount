const nano = require('nano')(process.env.DATABASE_URL);

const db = nano.use(process.env.DATABASE_NAME);

module.exports = db;
