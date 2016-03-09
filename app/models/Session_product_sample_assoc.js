/* jshint indent: 2 */

var Sequelize = require('sequelize');

var attributes = {
  session_id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    references: {
      model: 'session',
      key: 'session_id'
    }
  },
  product_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  sample_id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'sample',
      key: 'sample_id'
    }
  },
  timestamp: {
    type: Sequelize.DATE,
    allowNull: true
  },
  timepoint_label: {
    type: Sequelize.STRING,
    allowNull: true
  },
  timepoint_sort_order: {
    type: Sequelize.INTEGER(11),
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
