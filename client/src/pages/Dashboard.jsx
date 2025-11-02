import React, { useEffect, useState } from "react";
import api from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";
import {
    Briefcase,
    Mail,
    User,
    Trash2,
    Download,
    SendHorizonal,
} from "lucide-react";

export default function Dashboard() {
    const { publisherKey, userEmail, isAuthenticated } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [receivedApps, setReceivedApps] = useState([]);
    const [sentApps, setSentApps] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // --- 1️⃣ Jobs posted by this employer ---
                const jobUrl = `/jobs?dashboard=true&publisherKey=${publisherKey}`;
                const jobRes = await api.get(jobUrl);
                setJobs(jobRes.data);

                // --- 2️⃣ Applications received for this employer's jobs ---
                const receivedRes = await api.get(`/applications?publisherKey=${publisherKey}`);
                setReceivedApps(receivedRes.data);

                // --- 3️⃣ Applications sent by this user as applicant ---
                if (userEmail) {
                    const sentRes = await api.get(`/applications?applicantEmail=${userEmail}`);
                    setSentApps(sentRes.data);
                }
            } catch (e) {
                console.error("Dashboard fetch error:", e);
            }
        };

        if (isAuthenticated && publisherKey) fetchData();
    }, [publisherKey, userEmail, isAuthenticated]);

    const remove = async (id) => {
        if (!confirm("Delete this job?")) return;
        try {
            await api.delete(`/jobs/${id}`);
            setJobs((prev) => prev.filter((j) => j._id !== id));
        } catch (err) {
            console.error("Delete job error:", err);
        }
    };

    return (
        <div className="min-h-screen bg-[#f9fafb] py-16 px-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-slate-900 mb-10">
                    Your <span className="bg-gradient-to-r from-[#005072] to-[#00a1a7] bg-clip-text text-transparent
                                           transition-all duration-500 hover:from-[#00a1a7] hover:to-[#005072]
                                           hover:scale-105 inline-block">
                                                                            Dashboard </span>
                </h1>

                {/* ---------- Stats Cards ---------- */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {/* Total Jobs */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-r from-[#005072] to-[#00a1a7] rounded-xl">
                            <Briefcase className="text-white w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Total Jobs</p>
                            <p className="text-2xl font-semibold text-slate-900">{jobs.length}</p>
                        </div>
                    </div>

                    {/* Total Applications */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-r from-[#00a1a7] to-[#0097b2] rounded-xl">
                            <User className="text-white w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Total Applications</p>
                            <p className="text-2xl font-semibold text-slate-900">
                                {receivedApps.length + sentApps.length}
                            </p>
                        </div>
                    </div>

                    {/* Recent Jobs */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] rounded-xl">
                            <SendHorizonal className="text-white w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Recent Jobs</p>
                            <p className="text-2xl font-semibold text-slate-900">
                                {
                                    jobs.filter(j => {
                                        const created = new Date(j.createdAt);
                                        const diffDays = (Date.now() - created) / (1000 * 60 * 60 * 24);
                                        return diffDays <= 7;
                                    }).length
                                }
                            </p>
                            <p className="text-xs text-slate-400">Last 7 days</p>
                        </div>
                    </div>

                    {/* Recent Applications */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-r from-[#f97316] to-[#fb923c] rounded-xl">
                            <Mail className="text-white w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Recent Applications</p>
                            <p className="text-2xl font-semibold text-slate-900">
                                {
                                    receivedApps.filter(a => {
                                        const created = new Date(a.createdAt);
                                        const diffDays = (Date.now() - created) / (1000 * 60 * 60 * 24);
                                        return diffDays <= 7;
                                    }).length
                                }
                            </p>
                            <p className="text-xs text-slate-400">Last 7 days</p>
                        </div>
                    </div>
                </div>


                <div className="grid lg:grid-cols-3 gap-8">
                    {/* ---------- My Jobs ---------- */}
                    <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Briefcase className="w-5 h-5 text-[#005072]"/>
                            <h2 className="text-xl font-semibold text-slate-900">My Jobs</h2>
                        </div>

                        <div className="space-y-4">
                            {jobs.map((j) => (
                                <div
                                    key={j._id}
                                    className="flex items-start justify-between border border-slate-200 rounded-xl p-4 hover:shadow transition-all"
                                >
                                    <div>
                                        <Link
                                            to={`/jobs/${j._id}`}
                                            className="font-medium text-[#005072] hover:underline"
                                        >
                                            {j.title}
                                        </Link>
                                        <p className="text-slate-500 text-sm">{j.company}</p>
                                    </div>
                                    <button
                                        onClick={() => remove(j._id)}
                                        className="text-red-600 hover:text-red-700"
                                        title="Delete job"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            {jobs.length === 0 && (
                                <p className="text-slate-500 text-sm">No jobs yet.</p>
                            )}
                        </div>
                    </section>

                    {/* ---------- Received Applications ---------- */}
                    <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Mail className="w-5 h-5 text-[#00a1a7]" />
                            <h2 className="text-xl font-semibold text-slate-900">
                                Received Applications
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {receivedApps.map((a) => (
                                <div
                                    key={a._id}
                                    className="border border-slate-200 rounded-xl p-4 hover:shadow transition-all"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-[#005072]">{a.name}</p>
                                            <p className="text-sm text-slate-500">{a.email}</p>
                                        </div>
                                        <a
                                            href={a.cvPath}
                                            download
                                            className="flex items-center gap-1 text-[#00a1a7] hover:underline text-sm"
                                        >
                                            <Download className="w-4 h-4" /> CV
                                        </a>
                                    </div>
                                    <p className="text-sm text-slate-600 mt-2">
                                        Applied for{" "}
                                        <b className="text-slate-800">{a.job?.title}</b> @{" "}
                                        {a.job?.company}
                                    </p>
                                </div>
                            ))}
                            {receivedApps.length === 0 && (
                                <p className="text-slate-500 text-sm">
                                    No applications received yet.
                                </p>
                            )}
                        </div>
                    </section>

                    {/* ---------- Sent Applications ---------- */}
                    <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <SendHorizonal className="w-5 h-5 text-[#005072]" />
                            <h2 className="text-xl font-semibold text-slate-900">
                                Sent Applications
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {sentApps.map((a) => (
                                <div
                                    key={a._id}
                                    className="border border-slate-200 rounded-xl p-4 hover:shadow transition-all"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-[#005072]">
                                                {a.job?.title}
                                            </p>
                                            <p className="text-sm text-slate-500">{a.job?.company}</p>
                                        </div>
                                        <a
                                            href={a.cvPath}
                                            download
                                            className="flex items-center gap-1 text-[#00a1a7] hover:underline text-sm"
                                        >
                                            <Download className="w-4 h-4" /> CV
                                        </a>
                                    </div>
                                    <p className="text-sm text-slate-600 mt-2">
                                        Status: <b className="text-slate-800">Submitted</b> — by{" "}
                                        {a.name} ({a.email})
                                    </p>
                                </div>
                            ))}
                            {sentApps.length === 0 && (
                                <p className="text-slate-500 text-sm">
                                    You haven’t applied to any jobs yet.
                                </p>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
