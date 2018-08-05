"use strict";
module.exports = (sequelize, DataTypes) => {
	var Product = sequelize.define(
		"Product",
		{
			id: {
				type: DataTypes.STRING,
				primaryKey: true,
				unique: true
			},
			name: DataTypes.STRING,
			description: DataTypes.STRING,
			quantity: DataTypes.INTEGER,
			category: DataTypes.STRING,
			reviews: DataTypes.ARRAY(DataTypes.TEXT)
		},
		{}
	);
	Product.associate = function(models) {
		// associations can be defined here
	};
	return Product;
};
