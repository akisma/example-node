/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('client_fitness_status_assoc', {
    session_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'session',
        key: 'session_id'
      }
    },
    fitness_status_condition: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fitness_status_value: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fitness_status_details: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
};
