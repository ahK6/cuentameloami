const express = require("express");
const router = express.Router();

const ReportsMessagesController = require("../controllers/reportsMessages.controller");
const { verifyToken } = require("../../middlewares/auth/verify_jwt.middleware");
const {
  validateCreateReportMessage,
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

module.exports = router;
