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

        //for now player starting equipment and inventory are hard coded in potentially could be loaded from external file
        if (!player.created)
        {
            player.class = req.body.class;
            player.appearance = req.body.appearance;
            player.inventory = [
                "potion",
                "potion",
                "potion"
            ];
            switch (player.class)
            {
                case "Solider":
                    player.equipment.weapon = {
                        name: 'Basic Long Sword',
                        icon: 'basicLongSword.png',
                        level: 1,
                        stats: {
                            levelRequirement: 1,
                            attack: 1,
                            specialAttack: 1,
                            defence: 1,
                            specialDefence: 1
                        }
                    }
                    break;
                case "Mercenary":
                    player.equipment.weapon = {
                        name: 'Basic Short Sword',
                        icon: 'basicShortSword.png',
                        level: 1,
                        stats: {
                            levelRequirement: 1,
                            attack: 1,
                            specialAttack: 1,
                            precision: 1,
                            stamina: 1
                        }
                    }
                    break;
                case "Black Mage":
                    player.equipment.weapon = {
                        name: 'Basic Wand',
                        icon: 'basicStaff.png',
                        level: 1,
                        stats: {
                            levelRequirement: 1,
                            attack: 1,
                            specialAttack: 1,
                            mana: 1,
                            condition: 1
                        }
                    }
                    break;
                case "Ranger":
                    player.equipment.weapon = {
                        name: 'Basic Bow',
                        icon: 'basicBow.png',
                        level: 1,
                        stats: {
                            levelRequirement: 1,
                            attack: 1,
                            specialAttack: 1,
                            precision: 1,
                            condition: 1
                        }
                    }
                    break;
                case "White Mage":
                    player.equipment.weapon = {
                        name: 'Basic Staff',
                        icon: 'basicSword.png',
                        level: 1,
                        stats: {
                            levelRequirement: 1,
                            attack: 1,
                            specialAttack: 1,
                            buff: 1,
                            healing: 1
                        }
                    }
                    break;
            }
        }
        else
        {
            if (req.body.player.specialization)
                player.specialization = req.body.specialization;
            //player validation
            player.level = req.body.level;
            player.experience = req.body.experience;
            player.stats = req.body.stats;
            player.equipment = req.body.equipment;
            player.inventory = req.body.inventory;
        }
        player.save();
        console.log(player);
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