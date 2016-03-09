/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('session_exercise_assoc', {
    session_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    exercise_attribute: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    exercise_value: {
      type: DataTypes.STRING,
      allowNull: true
    },
    exercise_parent_attribute: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  });
};
