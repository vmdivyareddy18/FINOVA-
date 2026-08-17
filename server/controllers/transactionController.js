const db = require("../db");

// Create a transaction
const createTransaction = async (req, res) => {
    try {
        const { type, amount, category, description, date } = req.body;
        const userId = req.user.id;

        // Validation
        if (!type || !amount || !category) {
            return res.status(400).json({
                message: "Missing required fields: type, amount, category"
            });
        }

        if (!["Income", "Expense"].includes(type)) {
            return res.status(400).json({
                message: "Type must be 'Income' or 'Expense'"
            });
        }

        if (amount <= 0) {
            return res.status(400).json({
                message: "Amount must be greater than 0"
            });
        }

        db.query(
            "INSERT INTO transactions (user_id, type, amount, category, description, date) VALUES (?, ?, ?, ?, ?, ?)",
            [userId, type, amount, category, description || null, date || new Date()],
            (err, result) => {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({
                        message: "Error creating transaction",
                        error: err.message
                    });
                }

                res.status(201).json({
                    message: "Transaction created successfully",
                    transactionId: result.insertId
                });
            }
        );
    } catch (error) {
        res.status(500).json({
            message: "Error creating transaction",
            error: error.message
        });
    }
};

// Get all transactions for a user
const getTransactions = async (req, res) => {
    try {
        const userId = req.user.id;

        db.query(
            "SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC",
            [userId],
            (err, result) => {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({
                        message: "Error fetching transactions",
                        error: err.message
                    });
                }

                res.status(200).json({
                    message: "Transactions fetched successfully",
                    transactions: result
                });
            }
        );
    } catch (error) {
        res.status(500).json({
            message: "Error fetching transactions",
            error: error.message
        });
    }
};

// Update a transaction
const updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, amount, category, description, date } = req.body;
        const userId = req.user.id;

        // Check if transaction exists and belongs to user
        db.query(
            "SELECT * FROM transactions WHERE id = ? AND user_id = ?",
            [id, userId],
            (err, result) => {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({
                        message: "Error updating transaction",
                        error: err.message
                    });
                }

                if (result.length === 0) {
                    return res.status(404).json({
                        message: "Transaction not found or unauthorized"
                    });
                }

                // Validate fields
                if (type && !["Income", "Expense"].includes(type)) {
                    return res.status(400).json({
                        message: "Type must be 'Income' or 'Expense'"
                    });
                }

                if (amount && amount <= 0) {
                    return res.status(400).json({
                        message: "Amount must be greater than 0"
                    });
                }

                db.query(
                    "UPDATE transactions SET type = ?, amount = ?, category = ?, description = ?, date = ? WHERE id = ? AND user_id = ?",
                    [
                        type || result[0].type,
                        amount || result[0].amount,
                        category || result[0].category,
                        description !== undefined ? description : result[0].description,
                        date || result[0].date,
                        id,
                        userId
                    ],
                    (err) => {
                        if (err) {
                            console.error("Database error:", err);
                            return res.status(500).json({
                                message: "Error updating transaction",
                                error: err.message
                            });
                        }

                        res.status(200).json({
                            message: "Transaction updated successfully"
                        });
                    }
                );
            }
        );
    } catch (error) {
        res.status(500).json({
            message: "Error updating transaction",
            error: error.message
        });
    }
};

// Delete a transaction
const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Check if transaction exists and belongs to user
        db.query(
            "SELECT * FROM transactions WHERE id = ? AND user_id = ?",
            [id, userId],
            (err, result) => {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({
                        message: "Error deleting transaction",
                        error: err.message
                    });
                }

                if (result.length === 0) {
                    return res.status(404).json({
                        message: "Transaction not found or unauthorized"
                    });
                }

                db.query(
                    "DELETE FROM transactions WHERE id = ? AND user_id = ?",
                    [id, userId],
                    (err) => {
                        if (err) {
                            console.error("Database error:", err);
                            return res.status(500).json({
                                message: "Error deleting transaction",
                                error: err.message
                            });
                        }

                        res.status(200).json({
                            message: "Transaction deleted successfully"
                        });
                    }
                );
            }
        );
    } catch (error) {
        res.status(500).json({
            message: "Error deleting transaction",
            error: error.message
        });
    }
};

module.exports = {
    createTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction
};
