"use strict";
const amqp = require("amqplib");
const { QUEUE, CUSTOMER_SERVICE_URL, STATUS } = require("../config/constants");
const axios = require("axios");
const transactionRepository = require("../app/transactions/transaction_repository");
const customerServiceWebhook = axios.create({
    baseURL: CUSTOMER_SERVICE_URL
});
let connection;
const init = async () => {
    try {
        connection = await amqp.connect(process.env.RABBITMQ_URL);
        console.info(`Queue connected ${connection}`);
        receiveMessage(connection);
    } catch (err) {
        console.log("Error connection to RabbitMQ", err);
        process.exit(1);
    }
    return connection;
}

const receiveMessage = async (connection) => {
    if (!connection) {
        connection = init();
    }
    try {
        const channel = await connection.createChannel();
        await channel.assertQueue(QUEUE.TRANSACTION_SUCCESS, { durable: true });
        channel.consume(QUEUE.TRANSACTION_SUCCESS, async message => {
            const data = JSON.parse(message.content.toString());
            console.log(`[X] Received ${message.content.toString()}`);
            await transactionRepository.update({ uuid: data.transactionId }, {
                status: STATUS.SUCCESS
            });

            customerServiceWebhook.post("api/v1/callback/fund", data);

        }, { noAck: true });
    } catch (err) {
        console.error("Error calling customer service webhook");
    }
}

exports.sendMessage = async (queueName, message) => {
    if (!connection) {
        connection = init();
    }

    const channel = await connection.createChannel();
    channel.assertQueue(queueName);
    const sent = await channel.sendToQueue(queueName, Buffer.from(message));
    console.log("Pushing to queue", sent);
    return sent;
}

// setTimeout(init, 20000);
init();