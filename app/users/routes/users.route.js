const express = require("express");
const router = express.Router();

const UsersControllers = require("../controllers/users.controller");
const { validateSignUp } = require("../validators/signup.validation");

router.post("/sign-up", validateSignUp, UsersControllers.signup);

module.exports = router;
