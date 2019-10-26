const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const expressSession = require('express-session');
const passport = require('passport');

const passportConfig = require('./passport');

const db = require('./models');
const userAPIRouter = require('./routes/user');

const app = express();
db.sequelize.sync();

passportConfig();

// req.body를 사용하기 위해서 다음 두 줄을 추가한다.
// json형태 처리를 위함
app.use(express.json());
// form형태 데이터 처리를 위함
app.use(express.urlencoded({ extended: true }));

// 로거
app.use(morgan('dev'));
// 'Access-Control-Allow-Origin' 에러 방지
// 프론트 axios 요청을 받기 위함
app.use(cors({
    origin: true, // 쿠키 교환이 가능해진다.
    credentials: true, // 쿠키 교환이 가능해진다.
}));


app.use(passport.initialize());
app.use(passport.session());

app.use('/api/user', userAPIRouter);

app.listen(3065, () => {
    console.log('usle server is running on localhost:3065');
});

