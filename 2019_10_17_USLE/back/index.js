const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const expressSession = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');

const uuid = require('uuid/v4');

const passportConfig = require('./passport');

const db = require('./models');
const userAPIRouter = require('./routes/user');
const productAPIRouter = require('./routes/product');
const productsAPIRouter = require('./routes/products');
const categoryAPIRouter = require('./routes/category');
const brandAPIRouter = require('./routes/brand');
const cartAPIRouter = require('./routes/cart');
const orderAPIRouter = require('./routes/order');

dotenv.config();
const app = express();
db.sequelize.sync();

passportConfig();

// 로거
app.use(morgan('dev'));
// 'Access-Control-Allow-Origin' 에러 방지
// 프론트 axios 요청을 받기 위함
app.use(cors({
    origin: true, // 쿠키 교환이 가능해진다.
    credentials: true, // 쿠키 교환이 가능해진다.
}));

// 이미지 폴더
app.use('/images', express.static('uploads'));
app.use('/public', express.static('public'));

// req.body를 사용하기 위해서 다음 두 줄을 추가한다.
// json형태 처리를 위함
app.use(express.json());
// form형태 데이터 처리를 위함
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
    genid: function(req){ // 커스텀 sessionId 생성
        return uuid();
    },
    resave: false,
    saveUninitialized: true,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'aq2w3e',
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/user', userAPIRouter);
app.use('/api/product', productAPIRouter);
app.use('/api/products', productsAPIRouter);
app.use('/api/category', categoryAPIRouter);
app.use('/api/brand', brandAPIRouter);
app.use('/api/cart', cartAPIRouter);
app.use('/api/order', orderAPIRouter);

app.use("/session", (req, res) => {
    // const { sessionID, cookies } = req;
  
    // // 서버가 생성한 sessionID
    // console.log('sessionID:', sessionID);
    // // 클라이언트가 보유한 cookie
    // console.log('cookies.yourCookieName', cookies);
    
  
    // res.json({
    //   sessionID,
    //   cookies
    // });
    

    /////////////////////////////
    // const milliseconds = (new Date().getTime() + '').slice(-9);

    // let newUserId = 123 + '';

    // if(newUserId.length < 6){
    //     for(let i = 0; i < (6 - newUserId.length); i ++){
    //         newUserId = '0' + newUserId; 
    //     }
    // }
    // console.log(milliseconds);
    // console.log(newUserId);

    /////////////////////////////

    const year = new Date().getFullYear() + '';
    const month = (new Date().getMonth() + 1) + '';
    const date = new Date().getDate() + '';
    const milliseconds = (new Date().getTime() + '').slice(-6);
    const millisecondss = (new Date().getTime() + '');
    let randomNum = '';
    for(let i = 0; i < 3; i++){
        randomNum = (randomNum + '') + (Math.floor(Math.random() * 10) + '');
    }
    console.log(millisecondss);
    res.json(year + month + date + milliseconds + randomNum);
  });

app.listen(3065, () => {
    console.log('usle server is running on localhost:3065');
});

