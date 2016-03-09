/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('calculated_results', {
    calc_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    test_datestamp: {
      type: DataTypes.DATE,
      allowNull: true
    },
    test_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    result_value: {
      type: 'DOUBLE',
      allowNull: true
    },
    test_detail: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
};
