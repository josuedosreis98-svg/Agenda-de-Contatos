const HomeModel = require('../models/homeModel');

exports.index = (req,res,next) => {
    res.render('index');
    return;
};