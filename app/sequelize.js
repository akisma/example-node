// app/sequelize.js
var Sequelize = require('sequelize'),
	config 	  = require('../config/database'),
    sequelize;

    //this is what it should be, but NODE_ENV is only defined during build time, so i need to write a script to include an env json that holds this value depending on environment

    // if (NODE_ENV && NODE_ENV == 'production'){
    // 	sequelize = new Sequelize('mysql://b55457013dcd1d:593b146b@us-cdbr-iron-east-03.cleardb.net/heroku_1d6c7737e1613bf');
    // } else {
    // 	sequelize = new Sequelize(config.test.database, config.test.username, config.test.password, config.test);
    // }

    sequelize = new Sequelize('mysql://eoneopgl5e8wv9ht:bvzxvu7geu9jtsjv@tviw6wn55xwxejwj.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/e8nshs4wxv69t2vv');


module.exports = sequelize;