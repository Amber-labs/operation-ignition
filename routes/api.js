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
* To be implemented: attribute validation, ensure updates only happen from admin accounts
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
            player.created = true;
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
            if (req.body.specialization)
                player.specialization = req.body.specialization;
            /*
            player validation
            (NEEDS to be condensed but cannot think of a simple solution ATM
            will look into later on) probably with arrays but because of how
            html forms send my data defaultly I can't see an easy solution.
             */

            if (req.body.level)
                player.level = req.body.level;
            if (req.body.experience)
                player.experience = req.body.experience;
            if (req.body.equipment)
                player.equipment = req.body.equipment;
            if (req.body.inventory)
                player.inventory = req.body.inventory;

            if (req.body.currentHealth)
                player.stats.currentHealth = req.body.currentHealth;
            if (req.body.maxHealth)
                player.stats.maxHealth = req.body.maxHealth;
            if (req.body.defence)
                player.stats.defence = req.body.defence;
            if (req.body.specialDefence)
                player.stats.specialDefence = req.body.specialDefence;
            if (req.body.attack)
                player.stats.attack = req.body.attack;
            if (req.body.specialAttack)
                player.stats.specialAttack = req.body.specialAttack;
            if (req.body.stamina)
                player.stats.stamina = req.body.stamina;
            if (req.body.mana)
                player.stats.mana = req.body.mana;
            if (req.body.precision)
                player.stats.precision = req.body.precision;
            if (req.body.healing)
                player.stats.healing = req.body.healing;
            if (req.body.buff)
                player.stats.buff = req.body.buff;
            if (req.body.condition)
                player.stats.condition = req.body.condition;
        }
        player.save();
        console.log(req.body);
        res.redirect('/accounts/admin')
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

/*
* JSON API for updating class data
* To be implemented: class validation, ensure updates only happen from admin accounts
 */
router.post('/classes/data', function (req, res, next){
    checkAdmin(req.user, res, function(){
        Class.getClasses(function(error, doc){
            if (error)
                res.render(error);
            else
            {
                if (typeof doc != 'undefined')
                {
                    console.log(req.body);
                    for (var i = 0; i < doc.classes.length; i++)
                        if (req.body[doc.classes[i].name])
                            doc.classes[i] = JSON.parse(req.body[doc.classes[i].name]);
                    doc.lastUpdate = new Date().getTime();
                    doc.save();
                    console.log(doc);
                    res.redirect('/accounts/admin');
                }
                else
                    res.end('Error classes not found')
            }
        });
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
* standard function to ensure requests player are identified and in our database
 */
function checkPlayerIdentity(user, res, next) {
    checkUserIdentified(user, res, function() {
        //validate request identity exists in database
        Player.getPlayerByUsername(user.username, function (error, doc) {
            //error validating request identity
            if (error)
                res.render('error', {error: error});
            else {
                //success validating requested identity exists
                if (typeof doc != 'undefined')
                    next(doc);
                //requested identity does not exist
                else
                    res.redirect('/accounts/login');
            }
        });
    });
}

function checkAdmin(user, res, next) {
    checkUserIdentified(user, res, function(){
        User.getUserByUsername(user.username, function (error, doc){
            if (error)
                res.render('error', {error: error});
            else {
                if (typeof doc != 'undefined' && doc.admin === true)
                    next(doc);
                else
                    res.redirect('/accounts/login');
            }
        })
    });
}

//standard function for checking if requests are identified
function checkUserIdentified(user, res, next) {
    //if request is identified
    if (typeof user != 'undefined')
        next();
    //request is not identified
    else
        res.redirect('/accounts/login');
}

module.exports = router;