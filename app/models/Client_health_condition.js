/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('client_health_condition', {
    client_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    health_condition_name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    health_condition_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    health_condition_details: {
      type: DataTypes.STRING,
      allowNull: true
    },
    health_condition_value: {
      type: DataTypes.STRING,
      allowNull: true
    },
    health_condition_start_date: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true
    },
    health_condition_end_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  });
};
