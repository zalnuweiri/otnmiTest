import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import {
    MapPin,
    DollarSign,
    CalendarDays,
    ArrowLeft,
    SendHorizonal,
    Building2,
} from "lucide-react";

export default function JobDetail() {
    const {id} = useParams();
    const {userEmail} = useAuth();
    const [job, setJob] = useState(null);
    const [status, setStatus] = useState("");

    // Helper: calculate "days ago"
    const daysAgo = (dateString) => {
        if (!dateString) return "N/A";
        const posted = new Date(dateString);
        const now = new Date();
        const diff = Math.floor((now - posted) / (1000 * 60 * 60 * 24));
        return diff === 0 ? "Today" : `${diff} day${diff > 1 ? "s" : ""} ago`;
    };

    useEffect(() => {
        api
            .get(`/jobs/${id}`)
            .then((res) => setJob(res.data))
            .catch(() => setJob(null));
    }, [id]);

    const submit = async (e) => {
        e.preventDefault();
        setStatus("");
        const formEl = e.currentTarget;
        const form = new FormData(formEl);
        if (userEmail) form.append("applicantEmail", userEmail);
        try {
            const res = await api.post(`/applications/${id}`, form, {
                headers: {"Content-Type": "multipart/form-data"},
            });
            if (res.data?.ok || res.data?._id || res.status === 201) {
                setStatus("✅ Application submitted successfully!");
                formEl.reset();
            } else {
                setStatus("⚠️ Unexpected response received.");
            }
        } catch (err) {
            console.error("❌ Application submit error:", err);
            setStatus(err?.response?.data?.message || "❌ Failed to submit application");
        }
    };

    if (!job)
        return <p className="text-gray-600 text-center mt-20">Loading job details…</p>;

    return (
        <div className="min-h-screen bg-[#f9fafb] text-slate-800 pb-20">
            {/* ---------- Header Section ---------- */}
            <div
                className="bg-gradient-to-r from-[#005072] to-[#00a1a7] text-white py-12 px-6 rounded-b-3xl shadow-md job-detail-header">
                <div className="max-w-5xl mx-auto">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6"
                    >
                        <ArrowLeft className="w-4 h-4"/> Back to Jobs
                    </Link>

                    <h1 className="text-4xl font-bold mb-2">{job.title}</h1>
                    <div className="flex items-center gap-2 text-white/80">
                        <Building2 className="w-4 h-4"/>
                        <span>{job.company}</span>
                    </div>
                </div>
            </div>

            {/* ---------- Main Info Cards ---------- */}
            <div className="max-w-5xl mx-auto mt-8 px-6 grid sm:grid-cols-3 gap-4 job-detail-cards">
                {job.location && (
                    <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 shadow-sm">
                        <MapPin className="w-5 h-5 text-[#005072]"/>
                        <div>
                            <p className="text-xs uppercase text-slate-400">Location</p>
                            <p className="font-medium text-slate-800">{job.location}</p>
                        </div>
                    </div>
                )}
                {job.salary && (
                    <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 shadow-sm">
                        <DollarSign className="w-5 h-5 text-[#00a1a7]"/>
                        <div>
                            <p className="text-xs uppercase text-slate-400">Salary</p>
                            <p className="font-medium text-slate-800">{job.salary}</p>
                        </div>
                    </div>
                )}
                <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 shadow-sm">
                    <CalendarDays className="w-5 h-5 text-[#005072]"/>
                    <div>
                        <p className="text-xs uppercase text-slate-400">Posted</p>
                        <p className="font-medium text-slate-800">
                            {daysAgo(job.createdAt)}
                        </p>
                    </div>
                </div>
            </div>

            {/* ---------- Description Section ---------- */}
            <div className="max-w-5xl mx-auto mt-10 px-6">
                <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                    Job Description
                </h2>
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {job.description}
                </p>

                <p className="text-sm text-slate-400 mt-6 border-t pt-3">
                    Posted on {new Date(job.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}
                </p>
            </div>

            {/* ---------- Application Form ---------- */}
            <div className="max-w-5xl mx-auto mt-12 px-6 job-detail-apply">
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">
                        Apply for this Position
                    </h3>

                    <form className="grid md:grid-cols-2 gap-4" onSubmit={submit}>
                        <input
                            name="name"
                            placeholder="Your Name"
                            required
                            className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#00a1a7] focus:border-transparent transition-all"
                        />
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            required
                            className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#00a1a7] focus:border-transparent transition-all"
                        />
                        <div className="md:col-span-2 relative group">
                            <label
                                htmlFor="cv"
                                className="flex items-center justify-between w-full border border-slate-300 rounded-xl px-4 py-3 bg-white cursor-pointer text-slate-500 hover:text-[#005072] hover:border-[#00a1a7] transition-all"
                            >
    <span id="fileLabel" className="truncate">
      Choose file to upload (PDF, DOC, DOCX)
    </span>
                                <span className="text-[#00a1a7] font-medium group-hover:text-[#005072]">
      Browse
    </span>
                            </label>

                            <input
                                id="cv"
                                name="cv"
                                type="file"
                                accept=".pdf,.doc,.docx"
                                required
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={(e) => {
                                    const fileName = e.target.files?.[0]?.name || "Choose file to upload (PDF, DOC, DOCX)";
                                    document.getElementById("fileLabel").textContent = fileName;
                                }}
                            />
                        </div>

                        <button
                            className="md:col-span-2 mt-2 flex justify-center items-center gap-2 bg-gradient-to-r from-[#005072] to-[#00a1a7] text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
                        >
                            <SendHorizonal className="w-4 h-4"/>
                            Submit Application
                        </button>
                    </form>

                    {status && (
                        <p
                            className={`mt-4 text-sm ${
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
                </div>
            </div>
        </div>
    );
}