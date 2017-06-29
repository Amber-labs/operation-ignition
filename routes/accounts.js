var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');
var Player = require('../models/player');

/* GET accounts register page. */
router.get('/register', function(req, res, next) {
  res.render('register');
});

/* POST accounts register */
router.post('/register', function (req, res, next) {
  var username = req.body.Username;
  var name = req.body.Name;
  var email = req.body.Email;
  var password = req.body.Password;
  console.log(JSON.stringify(req.body));

  //form validation
  req.checkBody('Name','Name is required').notEmpty();
  req.checkBody('Email', 'Email is Required').notEmpty();
  req.checkBody('Email', 'Invalid Email').isEmail();
  req.checkBody('Username', 'Username is Required').notEmpty();
  req.checkBody('Password', 'Password is Required').notEmpty();
  req.checkBody('Confirm-Password', 'Passwords do not match').equals(password);
  var errors = req.validationErrors();
  //req form has errors
  if (errors){
      console.log(errors);
      res.render('register', {
          errors: errors
      });
  }
  //req form valid
  else
  {
      User.getUserByUsername(username, function (err, doc) {
          if (err)
              console.log('Error finding username! ' + error);
          else {
              //new user
              if (!doc) {
                  console.log('new user');
                  //new user
                  var newUser = new User({
                      username: username,
                      password: password,
                      email: email,
                      name: name,
                      admin: true
                  });
                  //new player
                  var newPlayer = new Player({
                      username: username,
                      //base player data
                      created: false,
                      level: 1,
                      experience: 0,
                      //base player stats
                      stats: {
                          currentHealth: 10,
                          maxHealth: 10,
                          defence: 10,
                          specialDefence: 10,
                          attack: 10,
                          specialAttack: 10,
                          stamina: 10,
                          mana: 10,
                          precision: 10,
                          healing: 10,
                          buff: 10,
                          condition: 10
                      },
                      inventory : [],
                      equipment: {
                          weapon: {},
                          armor: {
                              helmet: {},
                              shirt: {},
                              pants: {},
                              shoes: {},
                          }
                      }
                  });
                  //save new user to db
                  User.createUser(newUser, function (err, user) {
                      if (err)
                          throw err;
                      console.log(user);
                  });
                  //save new player to db
                  Player.createPlayer(newPlayer, function (err, player){
                     if (err)
                         throw err;
                     console.log(player);
                  });

                  res.render('index', {title: 'Home'});
              }
              //already registered username
              else {
                  console.log('username taken');
                  res.render('register', {title: 'Sign up', errors: [{msg: 'Username taken'}]});
              }
          }
      });
  }
});

/* GET accounts login page */
router.get('/login', function (req, res, next) {
  res.render('login', {title:'Log in'});
});

/* POST accounts login
* Authenticate and/or login session
*/
router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/accounts/register', failureFlash: true }), function(req, res) {
    res.redirect('/');
});

/* GET accounts logout
* Logout users session
*/
router.get('/logout',function (req, res){
    req.logout();
    res.redirect('/accounts/login');
});

/* GET accounts admin page */
router.get('/admin', ensureAuthenticated, function (req, res) {
    User.getUserByUsername(req.user.username, function (error, doc){
        if (error)
            res.render('error', error);
        else
        {
            console.log("doc: "+doc);
            //user exists and is admin account render the admin account
            if (typeof doc != 'undefined' && doc.admin)
                res.render('admin', {title: 'Admin - '+doc.username});
            //redirect to home/root as they may or may not be logged in
            else
                res.redirect('/');
        }
    })
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.getUserByUsername(username, function(err, user){
            console.log('hi');
            if(err){
                throw err;
            }
            if(!user){
                return done(null, false), {message: 'Unknown User'};
            }

            User.comparePassword(password, user.password, function (err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                } else{
                    return done(null, false, {message: 'Invalid Password'});
                }
            });
        });
    }));


passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        //req.flash('error_msg', 'You are not logged in');
        res.redirect('/users/login');
    }
}

module.exports = router;
