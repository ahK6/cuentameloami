const express = require("express");
const router = express.Router();

const {
  createLikeCommentValidation,
} = require("../validators/likeComments.validator");
const { verifyToken } = require("../../middlewares/auth/verify_jwt.middleware");
const LikeCommentsController = require("../controllers/likeComments.controller");

router.post(
  "/create-like",
  verifyToken,
  createLikeCommentValidation,
  LikeCommentsController.createLikeComment
);

module.exports = router;
