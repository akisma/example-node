// config/passport.js

// load all the things we need
// var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var Models            = require('../app/models/models');

module.exports = function(passport){

	// =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session
    // uses errback model, passing error first

    // used to serialize the user for the session
    // passport.serializeUser(function(user, done) {
    //   done(null, user.dataValues.login_id);
    // });

    // // used to deserialize the user
    // passport.deserializeUser(function(id, done) {
    //   Models.User.findOne({
    //     where: {
    //       'login_id': id
    //     }
    //   }).then(function (user) {
    //     if (user == null) {
    //       done(new Error('Wrong user id.'))
    //     }

    //     done(null, user)
    //   })
    // });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    // passport.use('local-signup', new LocalStrategy({
    //   // by default, local strategy uses username and password, we will override with email
    //   usernameField : 'login_email',
    //   passwordField : 'login_password',
    //   passReqToCallback : true // allows us to pass back the entire request to the callback
    // },
    // function(req, email, password, done) {

    //   // asynchronous
    //   // User.findOne wont fire unless data is sent back
    //   process.nextTick(function() {

    //     // find a user whose email is the same as the forms email
    //     // we are checking to see if the user trying to login already exists
    //     Models.User.findOne({
    //     	where: {
    //     		'login_email' :  email
    //     	}
    //     }).then(function(user) {
    //       // TODO: if there are any errors, return the error
    //       // if (err)
    //       //     return done(err);

    //       // check to see if theres already a user with that email
    //       if (user) {
    //           return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
    //       } else {
    //       // if not, create a user
    //         Models.User.create({
    //           login_email: email,
    //           login_password: Models.User.options.instanceMethods.generateHash(password) //this shouldn't be necessary, should work as an instance method
    //         }).then(function(user){
    //           return done(null, user);
    //         });
    //       }

    //     });

    //   });

    // }));

	// =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    // passport.use('local-login', new LocalStrategy({
    //     // by default, local strategy uses username and password, we will override with email
    //     usernameField : 'login_email',
    //     passwordField : 'login_password',
    //     passReqToCallback : true // allows us to pass back the entire request to the callback
    // },
    // function(req, email, password, done) { // callback with email and password from our form

    //   // find a user whose email is the same as the forms email
    //   // we are checking to see if the user trying to login already exists
    //   Models.User.findOne({
    //   	where: {
    //   		'login_email' :  email
    //   	}
    //   }).then(function(user) {
    //       // TODO if there are any errors, return the error before anything else
    //       // if (err)
    //       //     return done(err);

    //       // if no user is found, return the message
    //       if (!user)
    //           return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

    //       // if the user is found but the password is wrong
    //       if (!user.validPassword(password))
    //           return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

    //       // all is well, return successful user
    //       return done(null, user);
    //   });

    // }));
};