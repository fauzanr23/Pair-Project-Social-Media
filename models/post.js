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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Title required to post!",
        },
        notEmpty: {
          msg: "Title required to post!",
        },
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Content required to post!",
        },
        notEmpty: {
          msg: "Content required to post!",
        },
      },
    },
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    like: DataTypes.INTEGER,
    ProfileId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  Post.beforeCreate((instance) => {
    instance.like = 0
  })
  return Post;
};