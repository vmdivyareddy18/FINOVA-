const db = require("../db");

// Create a goal
const createGoal = async (req, res) => {
    try {
        const { title, target_amount, saved_amount } = req.body;
        const userId = req.user.id;

        // Validation
        if (!title || !target_amount) {
            return res.status(400).json({
                message: "Missing required fields: title, target_amount"
            });
        }

        if (target_amount <= 0) {
            return res.status(400).json({
                message: "Target amount must be greater than 0"
            });
        }

        const saved = saved_amount || 0;

        if (saved < 0 || saved > target_amount) {
            return res.status(400).json({
                message: "Saved amount must be between 0 and target amount"
            });
        }

        db.query(
            "INSERT INTO goals (user_id, title, target_amount, saved_amount) VALUES (?, ?, ?, ?)",
            [userId, title, target_amount, saved],
            (err, result) => {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({
                        message: "Error creating goal",
                        error: err.message
                    });
                }

                res.status(201).json({
                    message: "Goal created successfully",
                    goalId: result.insertId
                });
            }
        );
    } catch (error) {
        res.status(500).json({
            message: "Error creating goal",
            error: error.message
        });
    }
};

// Get all goals for a user
const getGoals = async (req, res) => {
    try {
        const userId = req.user.id;

        db.query(
            "SELECT * FROM goals WHERE user_id = ? ORDER BY id DESC",
            [userId],
            (err, result) => {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({
                        message: "Error fetching goals",
                        error: err.message
                    });
                }

                res.status(200).json({
                    message: "Goals fetched successfully",
                    goals: result
                });
            }
        );
    } catch (error) {
        res.status(500).json({
            message: "Error fetching goals",
            error: error.message
        });
    }
};

// Update a goal
const updateGoal = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, target_amount, saved_amount } = req.body;
        const userId = req.user.id;

        // Check if goal exists and belongs to user
        db.query(
            "SELECT * FROM goals WHERE id = ? AND user_id = ?",
            [id, userId],
            (err, result) => {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({
                        message: "Error updating goal",
                        error: err.message
                    });
                }

                if (result.length === 0) {
                    return res.status(404).json({
                        message: "Goal not found or unauthorized"
                    });
                }

                // Validate amounts
                if (target_amount && target_amount <= 0) {
                    return res.status(400).json({
                        message: "Target amount must be greater than 0"
                    });
                }

                if (saved_amount !== undefined) {
                    const finalTargetAmount = target_amount || result[0].target_amount;
                    if (saved_amount < 0 || saved_amount > finalTargetAmount) {
                        return res.status(400).json({
                            message: "Saved amount must be between 0 and target amount"
                        });
                    }
                }

                db.query(
                    "UPDATE goals SET title = ?, target_amount = ?, saved_amount = ? WHERE id = ? AND user_id = ?",
                    [
                        title || result[0].title,
                        target_amount || result[0].target_amount,
                        saved_amount !== undefined ? saved_amount : result[0].saved_amount,
                        id,
                        userId
                    ],
                    (err) => {
                        if (err) {
                            console.error("Database error:", err);
                            return res.status(500).json({
                                message: "Error updating goal",
                                error: err.message
                            });
                        }

                        res.status(200).json({
                            message: "Goal updated successfully"
                        });
                    }
                );
            }
        );
    } catch (error) {
        res.status(500).json({
            message: "Error updating goal",
            error: error.message
        });
    }
};

// Delete a goal
const deleteGoal = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Check if goal exists and belongs to user
        db.query(
            "SELECT * FROM goals WHERE id = ? AND user_id = ?",
            [id, userId],
            (err, result) => {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({
                        message: "Error deleting goal",
                        error: err.message
                    });
                }

                if (result.length === 0) {
                    return res.status(404).json({
                        message: "Goal not found or unauthorized"
                    });
                }

                db.query(
                    "DELETE FROM goals WHERE id = ? AND user_id = ?",
                    [id, userId],
                    (err) => {
                        if (err) {
                            console.error("Database error:", err);
                            return res.status(500).json({
                                message: "Error deleting goal",
                                error: err.message
                            });
                        }

                        res.status(200).json({
                            message: "Goal deleted successfully"
                        });
                    }
                );
            }
        );
    } catch (error) {
        res.status(500).json({
            message: "Error deleting goal",
            error: error.message
        });
    }
};

module.exports = {
    createGoal,
    getGoals,
    updateGoal,
    deleteGoal
};
