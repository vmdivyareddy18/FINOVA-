const db = require("../db");

// Get dashboard stats
const getDashboard = async (req, res) => {
    try {
        const userId = req.user.id;

        // Get total income
        db.query(
            "SELECT SUM(amount) as total FROM transactions WHERE user_id = ? AND type = 'Income'",
            [userId],
            (err, incomeResult) => {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({
                        message: "Error fetching dashboard",
                        error: err.message
                    });
                }

                const totalIncome = incomeResult[0].total || 0;

                // Get total expense
                db.query(
                    "SELECT SUM(amount) as total FROM transactions WHERE user_id = ? AND type = 'Expense'",
                    [userId],
                    (err, expenseResult) => {
                        if (err) {
                            console.error("Database error:", err);
                            return res.status(500).json({
                                message: "Error fetching dashboard",
                                error: err.message
                            });
                        }

                        const totalExpense = expenseResult[0].total || 0;
                        const balance = totalIncome - totalExpense;

                        // Get latest 5 transactions
                        db.query(
                            "SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC LIMIT 5",
                            [userId],
                            (err, transactionsResult) => {
                                if (err) {
                                    console.error("Database error:", err);
                                    return res.status(500).json({
                                        message: "Error fetching dashboard",
                                        error: err.message
                                    });
                                }

                                res.status(200).json({
                                    message: "Dashboard data fetched successfully",
                                    dashboard: {
                                        totalIncome,
                                        totalExpense,
                                        balance,
                                        latestTransactions: transactionsResult
                                    }
                                });
                            }
                        );
                    }
                );
            }
        );
    } catch (error) {
        res.status(500).json({
            message: "Error fetching dashboard",
            error: error.message
        });
    }
};

module.exports = {
    getDashboard
};
