const { Http } = require("@status/codes");
const { v4: uuidV4 } = require("uuid");
const {STATUS, QUEUE, TRANSACTION } = require("../../config/constants");
const { sendMessage } = require("../../startups/queue");
const { handleAxiosError } = require("../../utilities/helper");
const transactionRepository = require("./transaction_repository");

exports.fund = async (req, res, next) => {
    try {
        console.log("Processing...");
        // Create the transaction with status pending
        // Publish the request to the worker service
        // wait for response in webhook
        const transactionId = uuidV4()
        const transaction = {
            uuid: transactionId,
            transactionId,
            type: TRANSACTION.CREDIT,
            status: STATUS.PENDING,
            ...req.body,
        };
        console.log("Transaction: ", transaction);
        await transactionRepository.create(transaction);
        sendMessage(QUEUE.TRANSACTION_QUEUE, JSON.stringify(transaction));
        res.status(Http.Ok).json({ data: "processing..." });
    } catch (err) {
        next(handleAxiosError(err))
    }
}