exports.isLoggedIn = (req, res, next) => {
    // 로그인이 필요한 경우
    if(req.isAuthenticated()) {
        next();
    } else {
        return res.status(401).send('로그인이 필요합니다.');
    }
}

exports.isNotLoggedIn = (req, res, next) => {
    // 로그인이 필요하지 않은 경우
    if(!req.isAuthenticated()) {
        next();
    } else {
        return res.status(401).send('로그인한 사용자는 접근할 수 없습니다.');
    }
}