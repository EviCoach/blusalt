const express = require("express");
const { sequelize } = require("./models");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const { PORT } = require("./config/constants");
const { Http } = require("@status/codes");
require("./startups");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", require("./routes"));
app.use((req, res, next) => {
    console.error("Route not found");
    res.status(Http.NotFound).json({ error: "Route Not found" });
});
app.use((err, req, res, next) => {
    if (err) {
        console.error("An error occurred ", err)
        res.status(err.status || Http.InternalServerError).json({ error: err.message || "Internal server error" });
    }
});
app.listen(PORT, async () => {
    await authenticateDB();
    console.log(`Server listening on port ${PORT}`);
});

async function authenticateDB() {
    await sequelize.authenticate();
}