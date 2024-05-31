const express = require("express");
const router = express.Router();

const {
  createLikeCommentValidation,
  createLikePostValidation,
} = require("../validators/likeComments.validator");
const { verifyToken } = require("../../middlewares/auth/verify_jwt.middleware");
const LikeCommentsController = require("../controllers/likeComments.controller");
const LikePostsController = require("../controllers/likePosts.controller");

router.post(
  "/create-comment-like",
  verifyToken,
  createLikeCommentValidation,
  LikeCommentsController.createLikeComment
);

router.post(
  "/create-post-like",
  verifyToken,
  createLikePostValidation,
  LikePostsController.createLikePost
);

module.exports = router;
