'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('transactions', [{
      id: 1,
      customerId: "9540f090-ca80-44ce-9bf5-4b5ef5016cbd",
      uuid: "60b10a5a-58e0-42fa-8072-15ad7ab5659f",
      status: "success",
      type: "credit",
      amount: 10,
      createdAt: "2022-04-18 08:29:37.395+01",
      updatedAt: "2022-04-18 08:29:37.983+01"
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('transactions', null, {});
  }
};
