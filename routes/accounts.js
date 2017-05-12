var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

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
  req.checkBody('Confirm-Password', 'Passwords do not match').equals(req.body.password);
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
                      admin: false
                  });
                  //save new user to db
                  User.createUser(newUser, function (err, user) {
                      if (err)
                          throw err;
                      console.log(user);
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

/* GET accounts login */
router.get('/login', function (req, res, next) {
  res.render('login', {title:'Log in'});
});

/* POST accounts login */
router.post('/login', function (req, res, next){
    passport.authenticate('local', {successRedirect: '/', failureRedirect: '/accounts/login', failureFlash: true}),
        function(req, res) {
            res.redirect('/');
    };
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.getUserByUsername(username, function(err, user){
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
})

module.exports = router;
