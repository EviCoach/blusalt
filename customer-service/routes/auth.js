const Router = require('express').Router;
const router = Router();
const authController = require("../app/auth/auth_controller");
const authValidator = require("../app/auth/auth_validator");

router.post("/login", authValidator.login, authController.login);
router.post("/signup", authValidator.signup, authController.signup);
// router.post("/reset", authController.reset);
// router.get("/code", authController.code);
router.put("/verify/:uuid", authController.verify);

module.exports = router;