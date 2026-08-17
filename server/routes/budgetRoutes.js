const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
    createBudget,
    getBudgets,
    updateBudget
} = require("../controllers/budgetController");

router.post("/", authMiddleware, createBudget);
router.get("/", authMiddleware, getBudgets);
router.put("/:id", authMiddleware, updateBudget);

module.exports = router;
