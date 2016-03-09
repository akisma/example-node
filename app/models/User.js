// app/models/user.js
// load the things we need
var bcrypt   = require('bcrypt-nodejs');
var Sequelize = require('sequelize');

var attributes = {
    login_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    login_password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    // this is a whole other process, don't want to go down this rabbithole for now
    // login_recovery_email_address: {
    //   type: Sequelize.STRING,
    //   allowNull: true
    // },
    login_email: {
      type: Sequelize.STRING,
      allowNull: true
    },
    address_line1: {
      type: Sequelize.STRING,
      allowNull: true
    },
    address_line2: {
      type: Sequelize.STRING,
      allowNull: true
    },
    city: {
      type: Sequelize.STRING,
      allowNull: true
    },
    state: {
      type: Sequelize.STRING,
      allowNull: true
    },
    zip: {
      type: Sequelize.STRING,
      allowNull: true
    },
    address_type: {
      type: Sequelize.STRING,
      allowNull: true
    },
    phone_primary: {
      type: Sequelize.STRING,
      allowNull: true
    },
    phone_type: {
      type: Sequelize.STRING,
      allowNull: true
    },
    email_address: {
      type: Sequelize.STRING,
      allowNull: true
    },
    is_client: {
      type: Sequelize.INTEGER(11),
      allowNull: true
    },
    is_trainer: {
      type: Sequelize.INTEGER(11),
      allowNull: true
    },
    user_type: {
      type: Sequelize.STRING,
      allowNull: true
    }
};

var options = {
  timestamps: false,

  // don't use camelcase for automatically added attributes but underscore style
  // so updatedAt will be updated_at
  underscored: true,

  // disable the modification of tablenames; By default, sequelize will automatically
  // transform all passed model names (first parameter of define) into plural.
  // if you don't want that, set the following
  freezeTableName: true,

  instanceMethods: {
    validPassword: function(password) {
        return bcrypt.compareSync(password, this.login_password);
    },
    generateHash: function(password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    },
    infoIsComplete: function(){
      return true;
    }
  }
};


module.exports.attributes = attributes;
module.exports.options = options;
