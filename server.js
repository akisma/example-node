//from a tutorial at: https://scotch.io/tutorials/easy-node-authentication-setup-and-local
//sequlization from here: http://stribny.name/blog/2015/09/authentication-quickstart-with-express-passport-and-sequelize


// set up ======================================================================
// get all the tools we need
var express  	 = require('express');
var app      	 = express();
var port     	 = process.env.PORT || 8080;
var flash    	 = require('connect-flash');
var jwt    		 = require('jsonwebtoken'); // used to create, sign, and verify tokens
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

app.configs = { secret: 'ilovescotchscotchyscotchscotch' };

// require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(express.static('./views/client'));
app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session(app.configs)); // session secret
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);