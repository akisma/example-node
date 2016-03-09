/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('facility', {
    facility_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    facility_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    facility_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address_line1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address_line2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: true
    },
    contact_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone_main: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone_fax: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email_address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true
    },
    parent_facility_location_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'facility',
        key: 'facility_id'
      }
    }
  });
};
