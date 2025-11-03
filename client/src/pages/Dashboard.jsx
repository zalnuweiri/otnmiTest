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
    Loader2,
} from "lucide-react";

/* ============================================================
   UNIVERSAL PAGINATED SECTION COMPONENT
   ============================================================ */
function PaginatedSection({ title, icon: Icon, items, renderItem }) {
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 5;

    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

    return (
        <section className="shrink-0 min-w-[90%] md:min-w-0 bg-white border border-slate-200 rounded-2xl shadow-sm p-6 snap-start">
            <div className="flex items-center gap-2 mb-4">
                <Icon className="w-5 h-5 text-[#005072]" />
                <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
            </div>

            <div className="space-y-4">
                {currentItems.length > 0 ? (
                    currentItems.map((item, i) => <React.Fragment key={i}>{renderItem(item)}</React.Fragment>)
                ) : (
                    <p className="text-slate-500 text-sm">No entries yet.</p>
                )}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded-lg text-sm font-medium ${
                            currentPage === 1
                                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                                : "bg-[#00a1a7] text-white hover:opacity-90"
                        } transition`}
                    >
                        Prev
                    </button>

                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-1 rounded-lg text-sm font-medium ${
                                currentPage === i + 1
                                    ? "bg-[#005072] text-white"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            } transition`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded-lg text-sm font-medium ${
                            currentPage === totalPages
                                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                                : "bg-[#00a1a7] text-white hover:opacity-90"
                        } transition`}
                    >
                        Next
                    </button>
                </div>
            )}
        </section>
    );
}

/* ============================================================
   MAIN DASHBOARD COMPONENT
   ============================================================ */
export default function Dashboard() {
    const { publisherKey, userEmail, isAuthenticated } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [receivedApps, setReceivedApps] = useState([]);
    const [sentApps, setSentApps] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch dashboard data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const jobUrl = `/jobs?dashboard=true&publisherKey=${publisherKey}`;
                const jobRes = await api.get(jobUrl);
                setJobs(jobRes.data);

                const receivedRes = await api.get(
                    `/applications?publisherKey=${publisherKey}`
                );
                setReceivedApps(receivedRes.data);

                if (userEmail) {
                    const sentRes = await api.get(
                        `/applications?applicantEmail=${userEmail}`
                    );
                    setSentApps(sentRes.data);
                }
            } catch (e) {
                console.error("Dashboard fetch error:", e);
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated && publisherKey) fetchData();
        else setLoading(false);
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

    // ---------- LOADING STATE ----------
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#f9fafb] text-slate-600">
                <Loader2 className="animate-spin w-10 h-10 text-[#00a1a7] mb-4" />
                <p className="text-sm">Loading your dashboard…</p>
            </div>
        );
    }

    // ---------- MAIN DASHBOARD ----------
    return (
        <div className="min-h-screen bg-[#f9fafb] py-16 px-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-slate-900 mb-10">
                    Your{" "}
                    <span
                        className="bg-gradient-to-r from-[#005072] to-[#00a1a7] bg-clip-text text-transparent
                       transition-all duration-500 hover:from-[#00a1a7] hover:to-[#005072]
                       hover:scale-105 inline-block"
                    >
            Dashboard
          </span>
                </h1>

                {/* ---------- Stats Cards ---------- */}
                <div
                    className="
            flex flex-nowrap gap-4 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory scroll-smooth
            md:grid md:grid-cols-4 md:gap-6 mb-10 dashboard-stats
          "
                >
                    {/* Total Jobs */}
                    <div className="shrink-0 min-w-[85%] md:min-w-0 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 snap-start">
                        <div className="p-3 bg-gradient-to-r from-[#005072] to-[#00a1a7] rounded-xl">
                            <Briefcase className="text-white w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Total Jobs</p>
                            <p className="text-2xl font-semibold text-slate-900">
                                {jobs.length}
                            </p>
                        </div>
                    </div>

                    {/* Total Applications */}
                    <div className="shrink-0 min-w-[85%] md:min-w-0 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 snap-start">
                        <div className="p-3 bg-gradient-to-r from-[#00a1a7] to-[#0097b2] rounded-xl">
                            <User className="text-white w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">
                                Total Applications
                            </p>
                            <p className="text-2xl font-semibold text-slate-900">
                                {receivedApps.length + sentApps.length}
                            </p>
                        </div>
                    </div>

                    {/* Recent Jobs */}
                    <div className="shrink-0 min-w-[85%] md:min-w-0 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 snap-start">
                        <div className="p-3 bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] rounded-xl">
                            <SendHorizonal className="text-white w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Recent Jobs</p>
                            <p className="text-2xl font-semibold text-slate-900">
                                {
                                    jobs.filter(
                                        (j) =>
                                            (Date.now() - new Date(j.createdAt)) / 86400000 <= 7
                                    ).length
                                }
                            </p>
                            <p className="text-xs text-slate-400">Last 7 days</p>
                        </div>
                    </div>

                    {/* Recent Applications */}
                    <div className="shrink-0 min-w-[85%] md:min-w-0 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 snap-start">
                        <div className="p-3 bg-gradient-to-r from-[#f97316] to-[#fb923c] rounded-xl">
                            <Mail className="text-white w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">
                                Recent Applications
                            </p>
                            <p className="text-2xl font-semibold text-slate-900">
                                {
                                    receivedApps.filter(
                                        (a) =>
                                            (Date.now() - new Date(a.createdAt)) / 86400000 <= 7
                                    ).length
                                }
                            </p>
                            <p className="text-xs text-slate-400">Last 7 days</p>
                        </div>
                    </div>
                </div>

                {/* ---------- Data Sections (All Paginated) ---------- */}
                <div
                    className="
            flex flex-nowrap gap-6 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory scroll-smooth
            md:grid md:gap-8 md:grid-cols-3 dashboard-sections
          "
                >
                    {/* ---------- My Jobs ---------- */}
                    <PaginatedSection
                        title="My Jobs"
                        icon={Briefcase}
                        items={jobs}
                        renderItem={(j) => (
                            <div className="flex items-start justify-between border border-slate-200 rounded-xl p-4 hover:shadow transition-all h-29">
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
                        )}
                    />

                    {/* ---------- Received Applications ---------- */}
                    <PaginatedSection
                        title="Received Applications"
                        icon={Mail}
                        items={receivedApps}
                        renderItem={(a) => (
                            <div className="border border-slate-200 rounded-xl p-4 hover:shadow transition-all">
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
                        )}
                    />

                    {/* ---------- Sent Applications ---------- */}
                    <PaginatedSection
                        title="Sent Applications"
                        icon={SendHorizonal}
                        items={sentApps}
                        renderItem={(a) => (
                            <div className="border border-slate-200 rounded-xl p-4 hover:shadow transition-all">
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
                        )}
                    />
                </div>
            </div>
        </div>
    );
}
