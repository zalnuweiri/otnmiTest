import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        company: { type: String, required: true },
        description: { type: String, required: true },
        location: { type: String },
        salary: { type: String },
        publisherKey: { type: String, default: "default" }
    },
    { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
