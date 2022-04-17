module.exports = {
    PORT: process.env.PORT,
    TOKEN_KEY: "blusalt",
    BILLING_SERVICE_URL: process.env.BILLING_SERVICE_URL,
    EMIT: {
        CUSTOMER: {
            CREATED: "customer_created"
        }
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