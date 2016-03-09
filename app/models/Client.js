// app/models/Client.js
// load the things we need
var bcrypt  = require('bcrypt-nodejs');
var Sequelize  = require('sequelize');

var attributes = {
    user_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    middle_name: {
      type: Sequelize.STRING,
      allowNull: true
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: true
    },
    consent_data_internal_analysis: {
      type: Sequelize.STRING,
      allowNull: true
    },
    consent_data_study_usage: {
      type: Sequelize.STRING,
      allowNull: true
    },
    //saliva storage, i'm assuming, is opting in/out for freezer storage of saliva samples
    saliva_storage: {
      type: Sequelize.STRING,
      allowNull: true
    },
    birthdate: {
      type: Sequelize.DATE,
      allowNull: true
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: true
    },
    height: {
      type: Sequelize.DECIMAL,
      allowNull: true
    },
    //no clue what the below field does
    contact_info_id: {
      type: Sequelize.INTEGER(11),
      allowNull: true
    },
    //foreign key tied to a login
    login_id: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      references: {
        model: 'login',
        key: 'login_id'
      }
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
    isComplete: function(){
      //check the model for completion, and validate, there must be functionality for this already within the library otherwise find some micro to do the heavy lifting
    }
  }
};


module.exports.attributes = attributes;
module.exports.options = options;
