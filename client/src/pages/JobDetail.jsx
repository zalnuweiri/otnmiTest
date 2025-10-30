import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api.js";
import {useAuth} from "../context/AuthContext.jsx";

export default function JobDetail() {
    const { id } = useParams();
    const { userEmail } = useAuth(); // ✅ pull userEmail from context
    const [job, setJob] = useState(null);
    const [status, setStatus] = useState("");

    // Fetch job details on mount
    useEffect(() => {
        api.get(`/jobs/${id}`)
            .then((res) => setJob(res.data))
            .catch(() => setJob(null));
    }, [id]);

    // Handle application submission
    const submit = async (e) => {
        e.preventDefault();
        setStatus("");

        // ✅ Cache form before the await (critical!)
        const formEl = e.currentTarget;
        const form = new FormData(formEl);
        if (userEmail) form.append("applicantEmail", userEmail); // ✅ auto-tag

        try {
            const res = await api.post(`/applications/${id}`, form, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (res.data?.ok || res.data?._id || res.status === 201) {
                setStatus("✅ Application submitted successfully!");
                formEl.reset(); // ✅ Safe now — no async reference issue
            } else {
                setStatus("⚠️ Submission succeeded but unexpected response.");
            }
        } catch (err) {
            console.error("❌ Application submit error:", err);
            setStatus(err?.response?.data?.message || "❌ Failed to submit application");
        }
    };


    if (!job) return <p className="text-gray-600">Loading…</p>;

    return (
        <div className="grid lg:grid-cols-3 gap-8">
            {/* ---------- Left: Job Details ---------- */}
            <div className="lg:col-span-2 bg-card rounded-2xl border p-6">
                <h2 className="text-2xl font-bold text-secondary">{job.title}</h2>
                <p className="text-gray-700">{job.company}</p>
                <div className="mt-3 text-gray-800 whitespace-pre-wrap">{job.description}</div>
                <div className="mt-4 flex gap-3 text-sm">
                    {job.location && (
                        <span className="px-3 py-1 bg-gray-100 rounded-lg">{job.location}</span>
                    )}
                    {job.salary && (
                        <span className="px-3 py-1 bg-gray-100 rounded-lg">{job.salary}</span>
                    )}
                </div>
            </div>

            {/* ---------- Right: Application Form ---------- */}
            <div className="bg-card rounded-2xl border p-6">
                <h3 className="text-xl font-semibold text-secondary">Apply Now</h3>

                <form className="mt-4 flex flex-col gap-3" onSubmit={submit}>
                    <input
                        name="name"
                        placeholder="Your Name"
                        required
                        className="px-4 py-3 border rounded-xl"
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                        className="px-4 py-3 border rounded-xl"
                    />
                    <input
                        name="cv"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        required
                        className="px-4 py-3 border rounded-xl bg-white"
                    />
                    <button
                        className="mt-2 bg-secondary text-white px-4 py-3 rounded-xl hover:opacity-90 transition"
                    >
                        Submit Application
                    </button>

                    {/* ---------- Status Message ---------- */}
                    {status && (
                        <p
                            className={`text-sm mt-2 ${
                                status.includes("✅")
                                    ? "text-green-600"
                                    : status.includes("⚠️")
                                        ? "text-yellow-600"
                                        : "text-red-600"
                            }`}
                        >
                            {status}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
