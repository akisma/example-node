/* Sample model */

// load the things we need
var Sequelize = require('sequelize');

//define model attributes
var attributes = {
  sample_id: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  client_id: {
    type: Sequelize.INTEGER(11),
    allowNull: true,
    references: {
      model: 'user',
      key: 'user_id'
    }
  },
  sample_storage_location_id: {
    type: Sequelize.INTEGER(11),
    allowNull: true,
    references: {
      model: 'sample_storage_location',
      key: 'sample_storage_location_id'
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
module.exports.options = 	options;