// 'use strict';
// const logger = require("debug")("db:logger");
// const mongoose = require("mongoose");
// mongoose.set('debug', true);

// const mongodbUrl = `${process.env.MONGODB_URL}?retryWrites=true`;
// logger("DB_URL", mongodbUrl);
// mongoose.connect(mongodbUrl, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// mongoose.Promise = global.Promise;
// let db = mongoose.connection;
// db.on("connected", () => {
//     console.log("DATABASE CONNECTED");
//     logger("Database connected")
// });

// db.on('error', (error) => {
//     console.log("Error", error);
//     console.error("An error occurred", JSON.stringify(error));
//     logger(error.message, new Error(error.message).stack, { mongodbUrl }, true);
//     process.exit(1);
// });

// process.on('SIGINT', function () {
//     db.close();
//     console.log("DATABASE DISCONNECTED");
//     process.exit(1);
// });

// global.db = db;