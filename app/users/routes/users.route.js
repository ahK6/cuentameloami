const express = require("express");
const router = express.Router();

const UsersControllers = require("../controllers/users.controller");
const { validateSignUp } = require("../validators/signup.validation");
const { validateLogin } = require("../validators/login.validation");

router.post("/sign-up", validateSignUp, UsersControllers.signup);
router.post("/login", validateLogin, UsersControllers.login);

module.exports = router;
