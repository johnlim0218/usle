const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const db = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares/userMiddleware');

router.post('/add', async(req, res, next) => {

    try{
        
    }catch(e){
        console.error(e);
        return next(e);
    }
});

// multer 설정
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb){
            cb(null, 'uploads');
        },
        // 파일 명 재설정
        filename(req, file, done){
            // 파일 이름과 확장자를 분리해준다.
            const ext = path.extname(file.originalname); // 확장자
            const basename = path.basename(file.originalname, ext); // 파일이름
            done(null, basename + new Date().valueOf() + ext);
        }
    }),
    // 파일크기 상한 5mb 
    limits: { fileSize: 5 * 1024 * 1024 }, 
})

router.post('/add/images', upload.array('image'), async(req, res, next) => {
    return res.json(req.files.map(v => v.filename));
})

module.exports = router;