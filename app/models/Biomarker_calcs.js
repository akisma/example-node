/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('biomarker_calcs', {
    biomarker_calcs_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    session_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'session',
        key: 'session_id'
      }
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    biomarker_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'biomarker',
        key: 'biomarker_id'
      }
    },
    calc_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    calc_value: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
};
