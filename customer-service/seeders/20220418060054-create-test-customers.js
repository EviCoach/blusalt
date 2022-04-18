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
    await queryInterface.bulkInsert('customers', [{
      id: 1,
      uuid: "9540f090-ca80-44ce-9bf5-4b5ef5016cbd",
      firstName: "Test",
      lastName: "Test",
      balance: 0,
      ubalance: 0,
      email: "test@email.com",
      phonenumber: "08123456789",
      createdAt: "2022-04-18T06:19:40.011Z",
      updatedAt: "2022-04-18T06:19:40.011Z"
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('customers', null, {});
  }
};
