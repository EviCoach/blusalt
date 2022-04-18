const { sequelize } = require("../models");
async function authenticateDB() {
    try {
        await sequelize.authenticate();
    } catch (err) {
        console.error("Error connecting to database", err);
        process.exit(1);
    }
}
authenticateDB();