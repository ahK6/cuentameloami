const express = require("express");
const router = express.Router();

const ReportsMessagesController = require("../controllers/reportsMessages.controller");
const ReportsPostsController = require("../controllers/reportsPosts.controller");
const { verifyToken } = require("../../middlewares/auth/verify_jwt.middleware");
const {
  validateCreateReportMessage,
  validateCreateReportPost,
} = require("../validators/createReport.validator");

const {
  validateUpdateReportMessage,
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
  validateUpdateReportMessage,
  ReportsMessagesController.updateMessageReport
);

router.post(
  "/send-post-report",
  verifyToken,
  validateCreateReportPost,
  ReportsPostsController.createPostReport
);

module.exports = router;
