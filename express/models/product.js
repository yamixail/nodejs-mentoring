'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    id: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    quantity: DataTypes.NUMBER,
    category: DataTypes.STRING
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};