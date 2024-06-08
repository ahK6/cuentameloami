const express = require("express");
const router = express.Router();

const ReportsMessagesController = require("../controllers/reportsMessages.controller");
const ReportsPostsController = require("../controllers/reportsPosts.controller");
const ReportsCommentsController = require("../controllers/reportComments.controller");
const { verifyToken } = require("../../middlewares/auth/verify_jwt.middleware");
const {
  validateCreateReportMessage,
  validateCreateReportPost,
  validateCreateReportComment,
} = require("../validators/createReport.validator");

const {
  validateUpdateReport,
} = require("../validators/updateReport.validator");

router.post(
  "/send-message-report",
  verifyToken,
  validateCreateReportMessage,
  ReportsMessagesController.createMessageReport
);

router.put(
  "/update-message-report",
  verifyToken,
  validateUpdateReport,
  ReportsMessagesController.updateMessageReport
);

router.post(
  "/send-post-report",
  verifyToken,
  validateCreateReportPost,
  ReportsPostsController.createPostReport
);

router.put(
  "/update-post-report",
  verifyToken,
  validateUpdateReport,
  ReportsPostsController.updatePostReport
);

router.post(
  "/send-comment-report",
  verifyToken,
  validateCreateReportComment,
  ReportsCommentsController.createCommentReport
);

router.put(
  "/update-comment-report",
  verifyToken,
  validateUpdateReport,
  ReportsCommentsController.updateCommentReport
);

module.exports = router;
