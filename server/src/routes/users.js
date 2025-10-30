import express from "express";
import crypto from "crypto";
import User from "../models/User.js";

const router = express.Router();

/**
 * POST /api/users
 * Unified Signup + Login (demo)
 * body: { name?, email, password? }
 * returns: { message, user }
 */
router.post("/", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 🔹 Require email for both login and signup
        if (!email) {
            return res.status(400).json({ message: "Email is required." });
        }

        // 🔹 Look up user
        const existing = await User.findOne({ email });

        // ✅ LOGIN CASE: user already exists
        if (existing) {
            // If password is stored and does not match — reject
            if (existing.password && password && existing.password !== password) {
                return res.status(401).json({ message: "Invalid password." });
            }

            // Otherwise treat it as successful login
            return res.status(200).json({
                message: "User logged in.",
                user: {
                    id: existing._id,
                    name: existing.name,
                    email: existing.email,
                    publisherKey: existing.publisherKey,
                },
            });
        }

        // ✅ SIGNUP CASE: user does not exist
        if (!name) {
            return res
                .status(400)
                .json({ message: "Name required for new user signup." });
        }

        // Generate a demo publisherKey
        const publisherKey = crypto.randomBytes(8).toString("hex");

        const user = await User.create({
            name,
            email,
            password: password || "",
            publisherKey,
        });

        return res.status(201).json({
            message: "User created successfully.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                publisherKey: user.publisherKey,
            },
        });
    } catch (err) {
        console.error("User create/login error:", err);
        return res.status(500).json({ message: "Failed to create or log in user." });
    }
});

/**
 * GET /api/users
 * For demo only: list users so frontend can let you pick one as 'login'
 */
router.get("/", async (_req, res) => {
    try {
        const users = await User.find()
            .select("name email publisherKey createdAt")
            .sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Failed to list users." });
    }
});

export default router;
