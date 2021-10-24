'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('followTables', [
      {
        starId: 1,
        followerId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        starId: 1,
        followerId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        starId: 2,
        followerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        starId: 4,
        followerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('followtable', null, {});
  }
};
