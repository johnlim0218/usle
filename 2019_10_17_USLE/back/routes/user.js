const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const db = require('../models');
const { necessarilyLoggedIn, unnecessarilyLoggedIn } = require('../middlewares/userMiddleware');
const router = express.Router();

router.get('/', necessarilyLoggedIn, (req, res, next) => {
    const user = Object.assign({}, req.user.toJSON());
    delete user.password;
    return res.json(user);
})

router.post('/login', unnecessarilyLoggedIn, (req, res, next) => {
//로그인 라우터
    passport.authenticate('local', (err, user, info) => {
        if(err){
            console.log(err);
            return next(err);
        };
        if(info){
            console.log(info);
            return res.status(403).send(info.reason);
        };
        
        return req.login(user, async(loginErr) => {
            try{
                if(loginErr) {
                    return next(loginErr);
                };

                const fullUser = await db.User.findOne({
                    where: {
                        id: user.id,
                    },
                    attributes: ['id', 'email', 'nickname'],
                });

                return res.json(fullUser);

            } catch(e) {
                return next(e);
            }
        });
    })(req, res, next);
});

router.post('/logout', necessarilyLoggedIn, (req, res) => {
//로그아웃 라우터 
    req.logout();
    req.session.destroy();
    res.send('로그아웃 되었습니다.');
})

router.post('/signup', async(req, res, next) => {
//회원가입 라우터
    try{
        // 아이디 중복 확인
        const checkDupEmail = await db.User.findOne({
            where: {
                email: req.body.email,
            }
        });
        // 중복된 아이디가 DB에 있을 경우
        if(checkDupEmail){
            return res.status(403).send('이미 사용중인 아이디입니다.');
        }
        // 중복된 아이디가 DB에 없을 경우
        // 회원가입 진행
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const newUser = await db.User.create({
            email: req.body.email,
            password: hashedPassword,
            nickname: req.body.nickname,
        });

        return res.status(200).json(newUser);
    } catch(e) {
        return next(e);
    }
})


module.exports = router;