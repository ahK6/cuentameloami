const express = require("express");
const router = express.Router();

const { createpostValidation } = require("../validators/posts.validator");
const PostController = require("../controllers/posts.controller");

const { verifyToken } = require("../../middlewares/auth/verify_jwt.middleware");

router.post(
  "/create-post",
  verifyToken,
  createpostValidation,
  PostController.createPost
);

module.exports = router;
