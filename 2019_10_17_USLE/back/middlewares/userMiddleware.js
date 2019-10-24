exports.necessarilyLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
    } else {
        return res.status(401).send('로그인이 필요합니다.');
    }
}

exports.unnecessarilyLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        next();
    } else {
        return res.status(401).send('로그인한 사용자는 접근할 수 없습니다.');
    }
}