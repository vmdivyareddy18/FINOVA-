const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getMonthlyReport, getCategoryReport } = require("../controllers/reportsController");

router.get("/monthly", authMiddleware, getMonthlyReport);
router.get("/category", authMiddleware, getCategoryReport);

module.exports = router;
