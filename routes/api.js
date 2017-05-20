var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//Mogoose Schema models
var User = require('../models/user');
var Player = require('../models/player');
var State = require('../models/state');
var Class = require('../models/class');

/* Get player data route
* JSON API for returning player data from backend to front end
*/
router.get('/players/data', function (req, res, next) {
    checkPlayerIdentity(req.user, res, function (player) {
        res.json(player);
    });
});

/*
* JSON API for updating player data
* To be implemented: attribute validation
 */
router.post('/players/data', function (req, res, next) {
    checkPlayerIdentity(req.user, res, function (player) {
        //validate player changes
            //save player updates

        if (!player.created)
        {
                player.class = req.body.player.class;
        }
        else
        {
            if (req.body.player.specialization)
                player.specialization = req.body.player.specialization;
            //player validation
            player.level = req.body.player.level;
            player.experience = req.body.player.experience;
            player.stats = req.body.player.stats;
            player.equipment = req.body.player.equipment;
        }
        player.save();
        console.log(req.body);
    });
});

/*
* JSON API for returning class data to front end
 */
router.get('/classes/data', function (req, res, next){
    Class.getClasses(function (error, doc){
        if (error)
            res.render(error);
        else
        {
            //Classes found and returned to client/frontend
            if (typeof doc != undefined)
                res.json(doc);
            //Classes not found/not in database and should be added in
            else
                res.end('ERROR classes not found');
        }
    });
});

/* Get game states
* JSON API for returning preload game state data
* WIP, may be depreciated
*/
router.all('/states/preload', function (req, res, next){
    State.getStateByName('preload', function (error, doc){
        req.checkBody('Username','Username is required').notEmpty();
        var errors = req.validationErrors();
        if (errors)
            res.render('error', {error: errors});
        else
            res.json(doc);
    });
});

/*
* standard function to ensure requests are identified
 */
function checkPlayerIdentity(user, res, next) {
    //if request is identified
    if (typeof user != 'undefined')
    {
        //validate request identity exists
        Player.getPlayerByUsername(user.username, function(error, doc){
            //error validating request identity
            if (error)
                res.render('error', {error:error});
            else
            {
                //success validating requested identity exists
                if (typeof doc != 'undefined')
                    next(doc);
                //requested identity does not exist
                else
                    res.redirect('/accounts/login');
            }
        });
    }
    //request is not identified
    else
        res.redirect('/accounts/login');
}

module.exports = router;