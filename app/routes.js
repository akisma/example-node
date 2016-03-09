// app/routes.js
var jwt        = require('jsonwebtoken');

// var bioprintAnalysis = require('./bioprint-analysis.js');
var Models = require('./models/models');

module.exports = function(app){

  app.get('/', function(req,res){
    res.render('client/index.ejs', {
      user : req.user //get user from session and pass to template
    });
  });

  app.get('/login', function(req, res){
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  app.post('/login',
    function(req, res) {
      Models.User.findOne({
        where: {
          'login_email' :  req.body.login_email
        }
      }).then(function(user) {
        // if no user is found, return the message
        if (!user)
          return res.json({ 'loginMessage': 'No user found.'});

        // if the user is found but the password is wrong
        if (!user.validPassword(req.body.login_password))
          return res.json({ 'loginMessage': 'Wrong password.'});  // create the loginMessage and save it to session as flashdata

        // all is well, return successful user
        // if user is found and password is right
        // create a token
        var token = jwt.sign(user.dataValues, app.configs.secret, {
          expiresIn: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          user : user.dataValues, //get user from session and pass to template
          token: token
        });
      });
    }
  );

  app.get('/signup', function(req, res){
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  app.post('/signup',
    function(req, res) {
      //check for existing user
      Models.User.findOne({
        where: {
          'login_email' :  req.body.login_email
        }
      }).then(function(user) {
        // check to see if theres already a user with that email
        if (user) {
            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        } else {
        // if not, create a user
          Models.User.create({
            login_email: req.body.login_email,
            login_password: Models.User.options.instanceMethods.generateHash(req.body.login_password)
          }).then(function(user){
            // all is well, return successful user
            // if user is found and password is right
            // create a token
            var token = jwt.sign(user.dataValues, app.configs.secret, {
              expiresIn: 1440 // expires in 24 hours
            });

            // return the information including token as JSON
            res.json({
              user : user.dataValues, //get user from session and pass to template
              token: token
            });
          });
        }
      });
    }
  );

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  //API ROUTES BELOW - THERE IS NO HTML, ONLY ZOOL (JSON)

  app.post('/client/info', isLoggedIn, function(req, res){
    //TODO: this feels like it should probably be broken out into a Client app, but we'll get there later

    //note: sequelize stupidly does not throw an error if given a NULL where clause, so, do the validation beforehand
      Models.Client.findOne({
        where: {
          'login_id' :  req.decoded.login_id
        }
      }).then(function(client){
        //update the found model
        client.update({
          first_name: req.body.first_name,
          middle_name: req.body.middle_name,
          last_name: req.body.last_name,
          consent_data_internal_analysis: req.body.consent_data_internal_analysis,
          consent_data_study_usage: req.body.consent_data_study_usage,
          birthdate: req.body.birthdate,
          gender: req.body.gender,
          height: req.body.height
        }).then(function(client){
          res.json(client.dataValues);
        }).catch(function(error){
          res.status(500).json(error);
        });
      }).catch(function(error){
        //create a new model for the requested id
        Models.Client.create({
          first_name: req.body.first_name,
          middle_name: req.body.middle_name,
          last_name: req.body.last_name,
          consent_data_internal_analysis: req.body.consent_data_internal_analysis,
          consent_data_study_usage: req.body.consent_data_study_usage,
          birthdate: req.body.birthdate,
          gender: req.body.gender,
          height: req.body.height,
          login_id: req.decoded.login_id
        }).then(function(client){
          res.json(client.dataValues);
        }).catch(function(error){
          res.status(500).json(error);
        });
      });

  });

  app.get('/client/info', isLoggedIn, function(req, res){
    Models.Client.findOne({
      where: {
        'login_id' :  req.decoded.login_id
      }
    }).then(function(client){
      res.json(client.dataValues);
    }).catch(function(error){
      res.json({ error: error });
    });
  });

  // SETTINGS URLS

  app.get('/user/settings', isLoggedIn, function(req, res){
    res.json(req.decoded);
  });

  app.post('/user/settings', isLoggedIn, function(req, res){
    req.user.update({
      login_email: req.body.login_email,
      address_line1: req.body.address_line1,
      address_line2: req.body.address_line2,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      address_type: req.body.address_type,
      phone_primary: req.body.phone_primary,
      phone_type: req.body.phone_type,
      email_address: req.body.email_address,
      is_client: req.body.is_client,
      is_trainer: req.body.is_trainer,
      user_type: req.body.user_type
    }).then(function(client){
      res.json(client.dataValues);
    }).catch(function(error){
      res.status(500).json(error);
    });
  });

  // WORKOUTS URLS

  //A GOOD START, NOT COMPLETE
  //receive and save pre workout details, this creates a health and fitness workout
  app.post('/workout/hf', isLoggedIn, function(req, res){
    var date = Date.now(); //TODO this actually needs to come from the client to get correct local time... or i'm not sure
        // trainer_id = '',//not sure where this comes from yet since trainers won't be imp'd yet


    //we need the client id - is it better to pass it from the client side? more expedient, but less secure or does it matter?
    // req.user.getClient()
    // .then(function(client){
    //   //now that we have the client, create a workout session
    //   client.createWorkoutSession({
    //     session_timestamp: date,
    //     client_id: client.dataValues.user_id
    //     //not imp'd yet:
    //     //trainer_id
    //     //location_id
    //     //sample_storage_location
    //   }).then(function(workoutSession){
    //     // workoutSession.createSessionProductSample({
    //     //   product_name: 'Health and Fitness',
    //     //   timestamp: date,
    //     //   //timepoint_label - if there is one
    //     //   //timepoint_sort_order i think this auto incrememnts by 10, handy way of sorting instead of sorting actual time
    //     // })
    //     //create ProductSample
    //       //session_id: session.dataValues.session_id,
    //       //

    //       res.json(workoutSession.dataValues);
    //   }).catch(function(error){
    //     res.status(500).json(error);
    //   });
    // }).catch(function(error){
    //   res.status(500).json(error);
    //   //todo: best course of action would be to redirect to login or signup, every login must have a user/client
    // });

    res.json({ 'succcess': 'yeah' });
  });

//   THIS IS A GOOD START ON THE ENDPOINT FOR RECEIVING THE EXTRA 'PERFORMANCE' PRODUCT SAMPLES
//   IT IS BY NO MEANS COMPLETE OR POSSIBLY EVEN FUNCTIONAL

//   app.post('/workouts/', isLoggedIn, function(req, res){
//     Models.Session.findOne({
//       where: {
//         session_id: req.params.id
//       }
//     }).then(function(session){
//       session.update({
//         //add samples]
//       }).then(function(result){
//         res.json(result.dataValues);
//       }).catch(function(error){
//         res.status(500).json(error);
//       });
//     }).catch(function(error){
//       res.status(500).json(error);
//     });
//   });


 //return pre and post results
  app.get('/workout/:id', isLoggedIn, function(req, res){
    Models.Session.findOne({
      where: {
        session_id: req.params.id
      }
    }).then(function(session){
      //TBD TBD TBD TBD
      //lookup additional associated objects and return them
    }).catch(function(error){
      res.status(500).json(error);
    });
  });


  function isLoggedIn(req, res, next){
  // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

      // verifies secret and checks exp
      jwt.verify(token, app.configs.secret, function(err, decoded) {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next();
        }
      });

    } else {

      // if there is no token
      // return an error
      return res.status(403).send({
          success: false,
          message: 'No token provided.'
      });
    }
  }
};