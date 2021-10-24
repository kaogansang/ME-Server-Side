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
    await queryInterface.bulkInsert('Articles', [
      {
        title: '一篇神奇的文章',
        content: "因为这是胡艺写的。啊哈哈哈哈哈",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: '第二篇神奇的文章',
        content: "因为这依旧是胡艺写的。哦吼吼吼吼吼",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add commands to revert seed here.
     
      Example:
      await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Articles', null, {});
  }
};
