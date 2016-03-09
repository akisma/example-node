/* jshint indent: 2 */

/* Sample model */

// load the things we need
var Sequelize = require('sequelize');

//define model attributes
var attributes = {
  biomarker_id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true
  },
  biomarker_name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  biomarker_description: {
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

  instanceMethods: {}
};

module.exports.attributes = attributes;
module.exports.options = options;