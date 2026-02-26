'use strict';
const bcrypt = require('bcryptjs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      username: 'admin123',
      email: 'admin@email.com',
      password: bcrypt.hashSync('admin123', 8),
      role: 'admin',
      dateOfBirth: new Date('03/03/1990'),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'user123',
      email: 'user123@email.com',
      password: bcrypt.hashSync('user123', 8),
      role: 'user',
      dateOfBirth: new Date('03/03/1997'),
      createdAt: new Date(),
      updatedAt: new Date()
    }],
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
