const express = require("express");
const router = express.Router();

const ReportsController = require("../controllers/reports.controller");
const { verifyToken } = require("../../middlewares/auth/verify_jwt.middleware");
const {
  validateCreateReport,
} = require("../validators/createReport.validator");

const {
  validateUpdateReport,
} = require("../validators/updateReport.validator");

router.post(
  "/send-report",
  verifyToken,
  validateCreateReport,
  ReportsController.createReport
);

router.put(
  "/update-report",
  verifyToken,
  validateUpdateReport,
  ReportsController.updateReport
);

module.exports = router;
