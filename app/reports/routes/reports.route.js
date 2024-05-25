const express = require("express");
const router = express.Router();

const ReportsController = require("../controllers/reports.controller");
const { verifyToken } = require("../../middlewares/auth/verify_jwt.middleware");
const { validateCreateReport } = require("../validators/reports.validator");

router.post(
  "/send-report",
  verifyToken,
  validateCreateReport,
  ReportsController.createReport
);

module.exports = router;
