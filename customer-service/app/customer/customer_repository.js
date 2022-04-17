const Repository = require("../../Repository");
const { Customer } = require("../../models");

class CustomerRepository extends Repository {
    constructor() {
        super(Customer);
    };
}

module.exports = new CustomerRepository();