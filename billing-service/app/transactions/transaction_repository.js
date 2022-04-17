const Repository = require("../../Repository");
const { Transaction } = require("../../models");

class TransactionRepository extends Repository {
    constructor() {
        super(Transaction);
    };
}

module.exports = new TransactionRepository();