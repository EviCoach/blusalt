const Router = require('express').Router;
const router = Router();
const transactionController = require("../app/transactions/transaction_controller");
const transactionValidator = require("../app/transactions/transaction_validator");

router.post("/", transactionValidator.fund, transactionController.fund);

module.exports = router;