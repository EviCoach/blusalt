const Router = require('express').Router;
const router = Router();
const customerController = require("../app/customer/customer_controller");
const customerValidator = require("../app/customer/customer_validator");
const { authenticate } = require("../app/auth/auth_validator");

router.post("/funds", authenticate, customerValidator.fund, customerController.fund);
router.get("/", authenticate, customerController.getCustomer);
router.get("/:id", authenticate, customerController.getCustomer);

module.exports = router;