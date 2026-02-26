'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Profiles', [{
      name: 'admin123',
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'user123',
      UserId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }],
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Profiles', null, {});
  }
};;
