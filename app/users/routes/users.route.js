const express = require("express");
const router = express.Router();

const UsersControllers = require("../controllers/users.controller");
const { validateSignUp } = require("../validators/signup.validation");
const { validateLogin } = require("../validators/login.validation");
const { verifyToken } = require("../../middlewares/auth/verify_jwt.middleware");
const { validateBan } = require("../validators/userProfile.validation");

router.post("/sign-up", validateSignUp, UsersControllers.signup);
router.post("/login", validateLogin, UsersControllers.login);
router.get("/user-info", verifyToken, UsersControllers.getUserById);
router.put("/user-update", verifyToken, UsersControllers.updateUser);
router.put("/ban-user", verifyToken, validateBan, UsersControllers.banUser);

router.get("/validate-token", verifyToken, UsersControllers.validateToken);

module.exports = router;
