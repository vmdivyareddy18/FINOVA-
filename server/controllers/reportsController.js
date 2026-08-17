const db = require("../db");

// Get monthly report
const getMonthlyReport = async (req, res) => {
    try {
        const userId = req.user.id;
        const { month } = req.query;

        if (!month) {
            return res.status(400).json({
                message: "Month parameter is required (format: YYYY-MM)"
            });
        }

        db.query(
            "SELECT SUM(CASE WHEN type = 'Income' THEN amount ELSE 0 END) as totalIncome, " +
            "SUM(CASE WHEN type = 'Expense' THEN amount ELSE 0 END) as totalExpense " +
            "FROM transactions WHERE user_id = ? AND DATE_FORMAT(date, '%Y-%m') = ?",
            [userId, month],
            (err, result) => {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({
                        message: "Error fetching monthly report",
                        error: err.message
                    });
                }

                const totalIncome = result[0].totalIncome || 0;
                const totalExpense = result[0].totalExpense || 0;
                const balance = totalIncome - totalExpense;

                res.status(200).json({
                    message: "Monthly report fetched successfully",
                    report: {
                        month,
                        totalIncome,
                        totalExpense,
                        balance
                    }
                });
            }
        );
    } catch (error) {
        res.status(500).json({
            message: "Error fetching monthly report",
            error: error.message
        });
    }
};

// Get category report
const getCategoryReport = async (req, res) => {
    try {
        const userId = req.user.id;
        const { month } = req.query;

        let query =
            "SELECT category, type, SUM(amount) as total, COUNT(*) as count " +
            "FROM transactions WHERE user_id = ?";
        const params = [userId];

        if (month) {
            query += " AND DATE_FORMAT(date, '%Y-%m') = ?";
            params.push(month);
        }

        query += " GROUP BY category, type ORDER BY total DESC";

        db.query(query, params, (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({
                    message: "Error fetching category report",
                    error: err.message
                });
            }

            res.status(200).json({
                message: "Category report fetched successfully",
                report: {
                    month: month || "all-time",
                    byCategory: result
                }
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching category report",
            error: error.message
        });
    }
};

module.exports = {
    getMonthlyReport,
    getCategoryReport
};
