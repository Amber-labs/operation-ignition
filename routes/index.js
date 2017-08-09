var express = require('express');
var router = express.Router();

var Player = require('../models/player');

/* GET home page. */
router.get('/', function(req, res, next) {
  //Determine the sessions player
    res.render('index', { title: 'Home'});
});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        //req.flash('error_msg', 'You are not logged in');
        res.redirect('/accounts/login');
    }
}

module.exports = router;
