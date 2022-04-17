"use strict";
const amqp = require("amqplib");
const { QUEUE, STATUS, RABBITMQ_URL } = require("../config/constants");
let connection;
const init = async () => {
    try {
        console.log("Rabbitmq url: ", RABBITMQ_URL);
        connection = await amqp.connect(RABBITMQ_URL);
        console.info("Queue connected");
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
    console.log("Consume message...");
    const channel = await connection.createChannel();
    channel.assertQueue(QUEUE.TRANSACTION_QUEUE, { durable: true });
    channel.consume(QUEUE.TRANSACTION_QUEUE, message => {
        console.log(`[X] Received ${message.content.toString()}`);
        setTimeout(() => {
            const data = JSON.parse(message.content.toString());
            data.status = STATUS.SUCCESS;
            console.log("The data is ", data);
            sendMessage(QUEUE.TRANSACTION_SUCCESS, JSON.stringify(data))
        }, 100);
    }, { noAck: true });
}

const sendMessage = async (queueName, message) => {
    if (!connection) {
        connection = init();
    }
    const channel = await connection.createChannel();
    channel.assertQueue(queueName);
    channel.sendToQueue(queueName, Buffer.from(message))
}
init();
