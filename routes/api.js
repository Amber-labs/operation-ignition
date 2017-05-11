var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//Mogoose Schema models
var User = require('../models/user');
var Player = require('../models/player');

/* Get home route */
router.all('/', function (req, res, next) {
    Player.getPlayerByUsername(req.username, function (error, doc){
        console.log(req.body.username);
        //server side validation to ensure correct input types
        req.checkBody('username','Username is required').notEmpty();
        var errors = req.validationErrors();
        if (errors)
        {
            res.render('error',{error:errors});
        }
        else
        {
            res.json(doc);
        }
    });
});

module.exports = router;