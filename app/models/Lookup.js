/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('lookup', {
    lookup_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    lookup_source: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sequence_value: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    attribute: {
      type: DataTypes.STRING,
      allowNull: true
    },
    value: {
      type: DataTypes.STRING,
      allowNull: true
    },
    parent_lookup_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  });
};
