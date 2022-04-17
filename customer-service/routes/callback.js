const Router = require('express').Router;
const router = Router();
const webhookController = require("../app/webhooks/webhook_controller");

router.post("/fund", webhookController.fund);

module.exports = router;