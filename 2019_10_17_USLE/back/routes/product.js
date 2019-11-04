const express = require('express');
const router = express.Router();

const db = require('../models');

router.post('/add', async(req, res, next) => {

    try{
        
    }catch(e){
        console.error(e);
        return next(e);
    }
})

module.exports = router;