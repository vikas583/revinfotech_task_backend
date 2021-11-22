const mongoose = require('mongoose');
const { DB_URL } = require('../config');

exports.databaseConnection = async () => {

    try {
        // console.log(DB_URL)
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Db Connected');

    } catch (error) {
        console.log('Error ============')
        console.log(error);
        process.exit(1);
    }

};

