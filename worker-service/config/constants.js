module.exports = {
    RABBITMQ_URL: process.env.RABBITMQ_URL,
    EMIT: {
        PAYMENT_COMPLETED: "payment_completed"
    },
    QUEUE: {
        TRANSACTION_QUEUE: "transaction_queue",
        TRANSACTION_SUCCESS: "transaction_success",
        TRANSACTION_FAILED: "transaction_failed"
    },
    STATUS: {
        SUCCESS: "success",
        PENDING: "pending",
        FAILED: "failed"
    }
}