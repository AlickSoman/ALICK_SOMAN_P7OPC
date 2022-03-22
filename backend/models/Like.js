'use strict';
const {	Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Like extends Model {
		static associate(models) {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
			/* Associations pour le model Like */
			Like.belongsTo(models.User, {
				onDelete: 'cascade',
				foreignKey: { name: 'userId', allowNull: false },
				hooks: true });
			Like.belongsTo(models.Post, {
				onDelete: 'cascade',
				foreignKey: { name: 'postId', allowNull: false },
				hooks: true });
		}
	};
	Like.init({
		/* Like : est de type booléan */
		like: DataTypes.BOOLEAN
	}, {
		sequelize,
		modelName: 'Like',
	});
	return Like;
};