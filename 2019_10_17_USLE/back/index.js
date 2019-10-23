const express = require('express');
const morgan = require('morgan');

const db = require('./models');

const app = express();
db.sequelize.sync();

app.use(morgan('dev'));

app.listen(3065, () => {
    console.log('usle server is running on localhost:3065');
});

