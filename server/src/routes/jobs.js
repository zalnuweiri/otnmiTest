import express from "express";
import Job from "../models/Job.js";

const router = express.Router();

/**
 * GET /api/jobs
 * - Visitors: see all jobs
 * - Logged-in users: see all jobs (same endpoint)
 * - If ?dashboard=true&publisherKey=abc123 → return only that user’s jobs
 */
router.get("/", async (req, res) => {
    try {
        const { dashboard, publisherKey } = req.query;

        // If it's a dashboard request, filter by publisherKey
        const query = dashboard && publisherKey ? { publisherKey } : {};

        const jobs = await Job.find(query).sort({ createdAt: -1 });
        res.json(jobs);
    } catch (e) {
        console.error("Fetch jobs error:", e);
        res.status(500).json({ message: "Failed to fetch jobs", error: e?.message });
    }
});

/**
 * GET /api/jobs/:id
 * - Fetch a single job by ID
 */
router.get("/:id", async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: "Not found" });
        res.json(job);
    } catch {
        res.status(400).json({ message: "Invalid ID" });
    }
});

/**
 * POST /api/jobs
 * - Create a new job posting
 * - Requires title, company, and description
 */
router.post("/", async (req, res) => {
    try {
        const { title, company, description, location, salary, publisherKey } = req.body;

        if (!title || !company || !description) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const job = await Job.create({
            title,
            company,
            description,
            location,
            salary,
            publisherKey: publisherKey || "default",
        });

        res.status(201).json(job);
    } catch (e) {
        console.error("Create job error:", e);
        res.status(500).json({ message: "Failed to create job", error: e?.message });
    }
});

/**
 * DELETE /api/jobs/:id
 * - Delete a job posting by ID
 */
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Job.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Not found" });
        res.json({ ok: true });
    } catch {
        res.status(400).json({ message: "Invalid ID" });
    }
});

export default router;
