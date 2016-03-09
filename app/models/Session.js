// app/models/Session.js
// this model is the central point of defining a workout ("session")

// load the things we need
var Sequelize = require('sequelize');

//define model attributes
var attributes = {
  session_id: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  //maps to user_id
  client_id: {
    type: Sequelize.INTEGER(11),
    allowNull: true,
    references: {
      model: 'user',
      key: 'user_id'
    }
  },
  //maps to user_id
  trainer_id: {
    type: Sequelize.INTEGER(11),
    allowNull: true,
    references: {
      model: 'user',
      key: 'user_id'
    }
  },
  session_timestamp: {
    type: Sequelize.DATE,
    allowNull: true
  },
  //maps to facility_id
  location_id: {
    type: Sequelize.INTEGER(11),
    allowNull: true,
    references: {
      model: 'facility',
      key: 'facility_id'
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

  instanceMethods: {}
};

module.exports.attributes = attributes;
module.exports.options = options;
