import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
    {
        job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        cvPath: { type: String, required: true }
    },
    { timestamps: true }
);

export default mongoose.model("Application", ApplicationSchema);
