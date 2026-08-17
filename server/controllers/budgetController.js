const db = require("../db");

// Create a budget
const createBudget = async (req, res) => {
    try {
        const { amount, month } = req.body;
        const userId = req.user.id;

        // Validation
        if (!amount || !month) {
            return res.status(400).json({
                message: "Missing required fields: amount, month"
            });
        }

        if (amount <= 0) {
            return res.status(400).json({
                message: "Amount must be greater than 0"
            });
        }

        // Check if budget already exists for this month
        db.query(
            "SELECT * FROM budgets WHERE user_id = ? AND month = ?",
            [userId, month],
            (err, result) => {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({
                        message: "Error creating budget",
                        error: err.message
                    });
                }

                if (result.length > 0) {
                    return res.status(400).json({
                        message: "Budget already exists for this month"
                    });
                }

                db.query(
                    "INSERT INTO budgets (user_id, amount, month) VALUES (?, ?, ?)",
                    [userId, amount, month],
                    (err, result) => {
                        if (err) {
                            console.error("Database error:", err);
                            return res.status(500).json({
                                message: "Error creating budget",
                                error: err.message
                            });
                        }

                        res.status(201).json({
                            message: "Budget created successfully",
                            budgetId: result.insertId
                        });
                    }
                );
            }
        );
    } catch (error) {
        res.status(500).json({
            message: "Error creating budget",
            error: error.message
        });
    }
};

// Get all budgets for a user
const getBudgets = async (req, res) => {
    try {
        const userId = req.user.id;

        db.query(
            "SELECT * FROM budgets WHERE user_id = ? ORDER BY month DESC",
            [userId],
            (err, result) => {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({
                        message: "Error fetching budgets",
                        error: err.message
                    });
                }

                res.status(200).json({
                    message: "Budgets fetched successfully",
                    budgets: result
                });
            }
        );
    } catch (error) {
        res.status(500).json({
            message: "Error fetching budgets",
            error: error.message
        });
    }
};

// Update a budget
const updateBudget = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, month } = req.body;
        const userId = req.user.id;

        // Check if budget exists and belongs to user
        db.query(
            "SELECT * FROM budgets WHERE id = ? AND user_id = ?",
            [id, userId],
            (err, result) => {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({
                        message: "Error updating budget",
                        error: err.message
                    });
                }

                if (result.length === 0) {
                    return res.status(404).json({
                        message: "Budget not found or unauthorized"
                    });
                }

                // Validate amount
                if (amount && amount <= 0) {
                    return res.status(400).json({
                        message: "Amount must be greater than 0"
                    });
                }

                db.query(
                    "UPDATE budgets SET amount = ?, month = ? WHERE id = ? AND user_id = ?",
                    [
                        amount || result[0].amount,
                        month || result[0].month,
                        id,
                        userId
                    ],
                    (err) => {
                        if (err) {
                            console.error("Database error:", err);
                            return res.status(500).json({
                                message: "Error updating budget",
                                error: err.message
                            });
                        }

                        res.status(200).json({
                            message: "Budget updated successfully"
                        });
                    }
                );
            }
        );
    } catch (error) {
        res.status(500).json({
            message: "Error updating budget",
            error: error.message
        });
    }
};

module.exports = {
    createBudget,
    getBudgets,
    updateBudget
};
