/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('trainer_client_facility_assoc', {
    trainer_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    client_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    facility_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'facility',
        key: 'facility_id'
      }
    },
    trainer_client_facility_start_date: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true
    },
    trainer_client_facility_end_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  });
};
