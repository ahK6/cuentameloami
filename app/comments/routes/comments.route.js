const express = require("express");
const router = express.Router();

const { createCommentValidation } = require("../validators/comments.validator");
const CommentController = require("../controllers/comments.controller");

const { verifyToken } = require("../../middlewares/auth/verify_jwt.middleware");

router.post(
  "/create-comment",
  verifyToken,
  createCommentValidation,
  CommentController.createComment
);

router.get("/get-comments", CommentController.getCommentsByPostId);

module.exports = router;
