import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import jobRoutes from "./src/routes/jobs.js";
import applicationRoutes from "./src/routes/applications.js";
import userRoutes from "./src/routes/users.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

// ✅ CORS setup
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "http://localhost:5174",
            "https://ottonomi.netlify.app"
        ],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);

app.use(express.json());

// ✅ Health check
app.get("/health", (_req, res) =>
    res.json({ ok: true, service: "api", port: PORT })
);
app.get("/api/ping", (_req, res) => res.json({ pong: true }));

// ✅ Static file serving (MUST be above routes)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve files from /src/uploads as /uploads
app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));
console.log("📂 Serving uploads from:", path.join(__dirname, "src/uploads"));

// ✅ MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((e) => {
        console.error("❌ MongoDB connection error:", e.message);
        process.exit(1);
    });

// ✅ Routes
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/users", userRoutes);

// ✅ Start server
app.listen(PORT, () => console.log(`🚀 API running on :${PORT}`));
