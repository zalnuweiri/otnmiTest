import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import Application from "../models/Application.js";
import Job from "../models/Job.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------- Multer Storage Config ----------
const storage = multer.diskStorage({
    destination: (_req, _file, cb) =>
        cb(null, path.join(__dirname, "../uploads")),
    filename: (_req, file, cb) => {
        const safe = file.originalname.replace(/\s+/g, "_");
        cb(null, `${Date.now()}_${safe}`);
    },
});

const upload = multer({
    storage,
    fileFilter: (_req, file, cb) => {
        const ok = /pdf|doc|docx/i.test(path.extname(file.originalname));
        cb(ok ? null : new Error("Only PDF/DOC/DOCX allowed"), ok);
    },
});

// ---------- POST /api/applications/:jobId ----------
router.post("/:jobId", upload.single("cv"), async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);
        if (!job) return res.status(404).json({ message: "Job not found" });
        if (!req.file) return res.status(400).json({ message: "CV is required" });

        const { name, email, applicantEmail } = req.body;
        if (!name || !(email || applicantEmail))
            return res.status(400).json({ message: "Name & email required" });

        // ✅ STEP ADDED HERE — Build a *true* absolute backend URL
        const baseUrl =
            process.env.BACKEND_URL || `${req.protocol}://${req.get("host")}`;

        // ✅ Save a fully qualified CV link to the database
        const appDoc = await Application.create({
            job: job._id,
            name,
            email: applicantEmail || email,
            cvPath: `${baseUrl}/uploads/${req.file.filename}`, // absolute URL now
        });

        res.status(201).json({
            ok: true,
            message: "Application received successfully.",
            application: appDoc,
        });
    } catch (e) {
        console.error("Apply error:", e);
        res.status(500).json({ message: e?.message || "Failed to apply" });
    }
});

// ---------- GET /api/applications ----------
router.get("/", async (req, res) => {
    try {
        const { jobId, publisherKey, applicantEmail } = req.query;
        const q = {};

        if (jobId) q.job = jobId;

        if (publisherKey) {
            const jobs = await Job.find({ publisherKey }).select("_id");
            q.job = { $in: jobs.map((j) => j._id) };
        }

        if (applicantEmail) q.email = applicantEmail;

        const apps = await Application.find(q)
            .populate("job", "title company")
            .sort({ createdAt: -1 });

        res.json(apps);
    } catch (e) {
        console.error("Fetch applications error:", e);
        res.status(500).json({
            message: "Failed to fetch applications",
            error: e?.message,
        });
    }
});

export default router;
