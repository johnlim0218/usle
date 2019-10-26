const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('../models');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async(email, password, done) => {
        try{
            // DB에서 email 검색
            const user = await db.User.findOne({
                where: { email }
            });
            // 검색 결과 없음
            if(!user) {
                return done(null, false, { reason: '회원 정보가 존재하지 않습니다.'});
            }
            // 비밀번호 비교
            const result = await bcrypt.compare(password,user.password);
            if(result){
                // 로그인 성공
                return done(null, user);
            }
            // 비밀번호 불일치로 로그인 실패
            return done(null, false, { reason: '비밀번호가 맞지 않습니다.'});

        } catch(e) {
            console.log(e);
            return done(e);
        }
    }))
}