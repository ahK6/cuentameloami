const express = require("express");
const router = express.Router();

const ReportsController = require("../controllers/reports.controller");
const { verifyToken } = require("../../middlewares/auth/verify_jwt.middleware");
const {
  validateCreateReportMessage,
} = require("../validators/createReport.validator");

const {
  validateUpdateReportMessage,
} = require("../validators/updateReport.validator");

router.post(
  "/send-report",
  verifyToken,
  validateCreateReportMessage,
  ReportsController.createMessageReport
);

router.put(
  "/update-report",
  verifyToken,
  validateUpdateReportMessage,
  ReportsController.updateMessageReport
);

module.exports = router;
