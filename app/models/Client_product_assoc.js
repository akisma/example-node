/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('client_product_assoc', {
    client_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    client_product_assoc_start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    client_product_assoc_end_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  });
};
