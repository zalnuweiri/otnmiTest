import { useState } from "react";
import api from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function PostJob() {
    const { publisherKey } = useAuth();
    const [status, setStatus] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        setStatus("");
        const form = new FormData(e.currentTarget);
        const payload = Object.fromEntries(form.entries());
        payload.publisherKey = publisherKey;
        try {
            await api.post("/jobs", payload);
            setStatus("Job posted!");
            e.currentTarget.reset();
        } catch (e) {
            console.error("❌ Post job error:", err);
            setStatus(err?.response?.data?.message || "Failed to post job");
        }
    };

    return (
        <div className="bg-card rounded-2xl border p-6">
            <h2 className="text-2xl font-bold text-secondary">Post a Job</h2>
            <form className="mt-4 grid md:grid-cols-2 gap-4" onSubmit={submit}>
                <input name="title" placeholder="Job Title" required className="px-4 py-3 border rounded-xl" />
                <input name="company" placeholder="Company Name" required className="px-4 py-3 border rounded-xl" />
                <input name="location" placeholder="Location (optional)" className="px-4 py-3 border rounded-xl" />
                <input name="salary" placeholder="Salary (optional)" className="px-4 py-3 border rounded-xl" />
                <textarea name="description" placeholder="Job Description" required className="md:col-span-2 px-4 py-3 border rounded-xl min-h-[160px]" />
                <div className="md:col-span-2 flex items-center justify-between">
                    <span className="text-sm text-gray-600">Publisher Key: <b>{publisherKey}</b></span>
                    <button className="bg-secondary text-white px-4 py-3 rounded-xl">Create Job</button>
                </div>
            </form>
            {status && <p className="mt-3 text-sm text-gray-700">{status}</p>}
        </div>
    );
}
