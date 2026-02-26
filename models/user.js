'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcryptjs")
const nodemailer = require("nodemailer");
const Helper = require('../helpers');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Profile, { foreignKey: "UserId" })
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(instance, options) {
        const salt = bcrypt.genSaltSync(8);
        const hash = bcrypt.hashSync(instance.password, salt)
        instance.password = hash
        instance.role = "user"
      },
      afterCreate(instance, options) {
        let message = {
          from: `"MeowSpace" <MeowSpace@email.com>`,
          to: instance.email,
          subject: "Registration Successfull",
          text: "Welcome to MeowSpace!",
          html: "<p>Welcome to MeowSpace!</b>.</p>",
        }
        Helper.sendMail(message)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};