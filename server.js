const express = require('express');
const { PORT } = require('./app/config');
const { databaseConnection } = require('./app/database/connection');
const bodyParser = require("body-parser");
const cors = require("cors");

const StartServer = async () => {

    const app = express();

    await databaseConnection();

    app.use(cors())
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    require('./app/routes/auth.routes')(app)
    app.listen(PORT, () => {
        console.log(`listening to port ${PORT}`);
    })
        .on('error', (err) => {
            console.log(err);
            process.exit();
        })
}

StartServer();