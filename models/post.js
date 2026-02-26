'use strict';
const {
  Model
} = require('sequelize');
const Helper = require('../helpers');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    get publishedTime(){
      return Helper.postTime(this.createdAt)
    }
    static associate(models) {
      Post.belongsTo(models.Profile, {foreignKey: "ProfileId"})

      Post.belongsToMany(models.Tag, {through: models.PostTag, foreignKey: "PostId"})

      Post.belongsToMany(models.User, {through: models.Like, foreignKey: "PostId"})
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
      type: DataTypes.STRING,
      allowNull: true
    },
    imageUrl: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    ProfileId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  Post.beforeCreate((instance) => {
    instance.isFlagged = false
  })
  return Post;
};