const { TRANSACTION } = require("../../config/constants");
const customerRepository = require("./customer_repository");
exports.transactionType = {
    [TRANSACTION.CREDIT]: {
        execute: async (transaction) => {
            const customer = await customerRepository.findOne({ uuid: transaction.customerId });
            customerRepository.update({ uuid: transaction.customerId }, {
                ubalance: +customer.ubalance + transaction.amount,
                balance: +customer.ubalance + transaction.amount,
            });
        }
    },
    [TRANSACTION.DEBIT]: {
        execute: async (transaction) => {
            const customer = await customerRepository.findOne({ uuid: transaction.customerId });
            customerRepository.update({ uuid: transaction.customerId }, {
                ubalance: +customer.ubalance - transaction.amount,
                balance: +customer.ubalance - transaction.amount,
            });
        }
    }
}