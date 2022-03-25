'use strict';
const {	Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Post extends Model {
		static associate(models) {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
			/* nos associations pour le model Post */
			Post.belongsTo(models.User, {
				onDelete: 'cascade',
				foreignKey: { name: 'userId', allowNull: false },
				hooks: true });
			Post.hasMany(models.Comment, {
				onDelete: 'cascade',
				foreignKey: { name: 'postId', allowNull: false },
				hooks: true });
			Post.hasMany(models.Like, {
				onDelete: 'cascade',
				foreignKey: { name: 'postId', allowNull: false },
				hooks: true });
		}
	};
	
	Post.init({
		/* Post : est de type texte et média */
		title: DataTypes.STRING,
		text: DataTypes.STRING,
		file: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'Post',
	});
	return Post;
};