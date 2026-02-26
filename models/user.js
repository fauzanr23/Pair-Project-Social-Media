'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcryptjs")
const nodemailer = require("nodemailer");
const Helper = require('../helpers');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static age(dateOfBirth) {
      let birthYear = new Date(dateOfBirth)
      let today = new Date()
      let age = today.getFullYear() - birthYear.getFullYear()

      if (today.getMonth() < birthYear.getMonth()) {
        age--
      } else if (today.getMonth() === birthYear.getMonth()) {
        if (today.getDate() < birthYear.getDate()) {
          age--
        }
      }

      return age
    }
    static associate(models) {
      User.hasOne(models.Profile, { foreignKey: "UserId" })

      User.belongsToMany(models.Post, {through: models.Like, foreignKey: "UserId"})
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Username must be filled!"
        },
        notNull: {
          msg: "Username must be filled!"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Email invalid!"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password required!"
        },
        notNull: {
          msg: "Password required!"
        },
        passwordLength(password){
          if (password && password.trim().length < 7) {
            throw new Error("Password must be at least 7 characters")
          }
        }
      }
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Date of birth required!"
        },
        notNull: {
          msg: "Date of birth required!"
        },
        ageVerif(dateOfBirth){
          if(User.age(dateOfBirth) < 13){
            throw new Error("You must be at least 13 years old!")
          }
        }
      }
    },
    role: DataTypes.STRING,
  }, {
    hooks: {
      beforeCreate(user, options) {
        const salt = bcrypt.genSaltSync(8);
        const hash = bcrypt.hashSync(user.password, salt)
        user.password = hash
        user.role = "user"
      },
      afterCreate(user, options) {
        let message = {
          from: `"MeowSpace" <MeowSpace@email.com>`,
          to: user.email,
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