'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [
      {
        roleName: 'Master Admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleName: 'System Admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleName: 'Company Admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleName: 'CEO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleName: 'VP Customer Success',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleName: 'Account Manager',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleName: 'Account Executive',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
