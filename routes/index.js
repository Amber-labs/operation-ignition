var express = require('express');
var router = express.Router();

var Player = require('../models/player');

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
  //Determine the sessions player
  Player.getPlayerByUsername(req.user.username, function(error, doc){
    if (error)
    {
      console.err('Error no entry found');
    }
    else
    {
      if (typeof doc != 'undefined')
        res.render('index', {player:doc});
      else
        res.redirect('/accounts/login');
    }
  });
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
