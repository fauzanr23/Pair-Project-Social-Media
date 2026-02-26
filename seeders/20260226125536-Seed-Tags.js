'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Tags', [
    {
      name: 'Cute',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Angry',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Tired',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Sleep',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Eat',
      createdAt: new Date(),
      updatedAt: new Date()
    }],
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tags', null, {});
  }
};
