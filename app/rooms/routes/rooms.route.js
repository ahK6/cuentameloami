const express = require("express");
const router = express.Router();

const RoomsControllers = require("../controllers/rooms.controller");
const { verifyToken } = require("../../middlewares/auth/verify_jwt.middleware");

//router.post("/create-room", verifyToken, RoomsControllers.createRoom);

module.exports = router;
