'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.Profile, {foreignKey: "ProfileId"})

      Post.belongsToMany(models.Tag, {through: models.PostTag, foreignKey: "PostId"})
    }
  }
  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    imageUrl: DataTypes.STRING,
    like: DataTypes.INTEGER,
    ProfileId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};