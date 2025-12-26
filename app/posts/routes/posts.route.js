const express = require("express");
const router = express.Router();

const {
    createpostValidation,
    getPostByIdValidation,
    searchPostsValidation,
} = require("../validators/posts.validator");
const PostController = require("../controllers/posts.controller");

const { verifyToken } = require("../../middlewares/auth/verify_jwt.middleware");

router.post(
    "/create-post",
    verifyToken,
    createpostValidation,
    PostController.createPost
);

router.get("/get-all", PostController.getAllPost);

router.get("/get-post", PostController.getPostById);

router.get("/get-keywords", PostController.getKeyWords);

router.get("/search", searchPostsValidation, PostController.searchPosts);

module.exports = router;
