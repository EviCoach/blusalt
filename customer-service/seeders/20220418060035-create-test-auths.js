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


    await queryInterface.bulkInsert('auths', [{
      id: 1,
      uuid: "f4a24a09-8156-4cf3-b832-24fa9811f915",
      password: "$2a$10$RiMIFXp7T8Qm.oTowKDIquEu5s4kS8CKEdTZMFu9pdQBIVz9MwMMm",
      verified: true,
      email: "test@email.com",
      phonenumber: "08123456789",
      updatedAt: "2022-04-18T06:19:39.985Z",
      createdAt: "2022-04-18T06:19:39.985Z"
    }], {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('auths', null, {});
  }
};
