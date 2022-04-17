const { Http } = require("@status/codes");
const { transactionType } = require("../customer/customer_service");

exports.fund = (req, res, next) => {
    const transaction = req.body;
    console.log("Transaction callback ", transaction);
    transactionType[transaction.type].execute(transaction);
    res.status(Http.Ok).end();
}