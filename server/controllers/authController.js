const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if email already exists
        db.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            async (err, result) => {
                if (err) return res.status(500).json(err);

                if (result.length > 0) {
                    return res.status(400).json({
                        message: "User already exists"
                    });
                }

                // Hash password
                const hashedPassword = await bcrypt.hash(password, 10);

                // Insert new user
                db.query(
                    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
                    [name, email, hashedPassword],
                    (err, result) => {
                        if (err) return res.status(500).json(err);

                        res.status(201).json({
                            message: "User registered successfully"
                        });
                    }
                );
            }
        );
    } catch (error) {
        res.status(500).json(error);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        db.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            async (err, result) => {
                if (err) return res.status(500).json(err);

                if (result.length === 0) {
                    return res.status(400).json({
                        message: "Invalid email or password"
                    });
                }

                const user = result[0];

                // Compare password
                const isMatch = await bcrypt.compare(password, user.password);

                if (!isMatch) {
                    return res.status(400).json({
                        message: "Invalid email or password"
                    });
                }

                const token = jwt.sign(
                    { id: user.id },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "1d"
                    }
                );

                res.status(200).json({
                    message: "Login successful",
                    token: token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }
                });
            }
        );
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    register,
    login,
};