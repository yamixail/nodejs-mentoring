"use strict";
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("Products", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.STRING,
				unique: true
			},
			name: {
				type: Sequelize.STRING
			},
			description: {
				type: Sequelize.TEXT
			},
			quantity: {
				type: Sequelize.INTEGER
			},
			reviews: {
				type: Sequelize.TEXT
			},
			category: {
				type: Sequelize.STRING
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable("Products");
	}
};
