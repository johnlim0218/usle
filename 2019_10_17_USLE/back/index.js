const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const expressSession = require('express-session');
const passport = require('passport');

const passportConfig = require('./passport');

const db = require('./models');
const userAPIRouter = require('./routes/user');

const app = express();
db.sequelize.sync();

passportConfig();

// 로거
app.use(morgan('dev'));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/user', userAPIRouter);

app.listen(3065, () => {
    console.log('usle server is running on localhost:3065');
});

