const express = require("express");
const router = express.Router();

const MessagesControllers = require("../../messages/controllers/messages.controller");
const { verifyToken } = require("../../middlewares/auth/verify_jwt.middleware");

router.post("/create-chat", verifyToken, MessagesControllers.createRoom);

module.exports = router;
