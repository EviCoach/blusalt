module.exports = {
    PORT: process.env.PORT,
    CUSTOMER_SERVICE_URL: process.env.CUSTOMER_SERVICE_URL,
    QUEUE: {
        TRANSACTION_QUEUE: "transaction_queue",
        TRANSACTION_SUCCESS: "transaction_success"
    },
    TRANSACTION: {
        CREDIT: "credit",
        DEBIT: "debit"
    },
    STATUS: {
        SUCCESS: "success",
        PENDING: "pending",
        FAILED: "failed"
    }
}