import React, { useEffect, useState } from "react";
import api from "../services/api.js";
import {
    Briefcase,
    MapPin,
    DollarSign,
    CalendarDays,
    Loader2,
} from "lucide-react";

export default function JobList() {
    const [jobs, setJobs] = useState([]);
    const [q, setQ] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true); // 👈 NEW
    const jobsPerPage = 6;

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await api.get("/jobs");
                setJobs(res.data);
            } catch (err) {
                console.error("❌ Job fetch error:", err);
                setJobs([]);
            } finally {
                setLoading(false); // 👈 spinner disappears even on error
            }
        };
        fetchJobs();
    }, []);

    // 🔍 Filter jobs
    const filtered = jobs.filter((j) =>
        [j.title, j.company, j.location]
            .join(" ")
            .toLowerCase()
            .includes(q.toLowerCase())
    );

    // 📄 Pagination logic
    const totalJobs = filtered.length;
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = filtered.slice(indexOfFirstJob, indexOfLastJob);
    const totalPages = Math.ceil(totalJobs / jobsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // ⏱️ Helper for "days ago"
    const daysAgo = (dateString) => {
        if (!dateString) return "N/A";
        const posted = new Date(dateString);
        const now = new Date();
        const diff = Math.floor((now - posted) / (1000 * 60 * 60 * 24));
        return diff === 0 ? "Today" : `${diff} day${diff > 1 ? "s" : ""} ago`;
    };

    // ---------- LOADING SPINNER ----------
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#f9fafb] text-slate-600">
                <Loader2 className="animate-spin w-10 h-10 text-[#00a1a7] mb-4"/>
                <p className="text-sm">Loading job listings…</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f9fafb] text-slate-800">
            <div className="max-w-6xl mx-auto px-6 py-16">
                {/* ---------- Header ---------- */}
                <div className="flex justify-between items-center mb-8 job-list-header">
                    <div>
                        <h1 className="text-4xl font-bold text-slate-900 mb-1">
                            Find Your Next{" "}
                            <span
                                className="bg-gradient-to-r from-[#005072] to-[#00a1a7] bg-clip-text text-transparent
               transition-all duration-500 hover:from-[#00a1a7] hover:to-[#005072]
               hover:scale-105 inline-block"
                            >
              Role
            </span>
                        </h1>
                        <p className="text-slate-500">
                            Explore opportunities posted by employers.
                        </p>
                    </div>
                    <p className="text-sm text-slate-500 mt-4 lg:mt-0">
                        Showing{" "}
                        <span className="font-semibold text-slate-700">
            {indexOfFirstJob + 1}–{Math.min(indexOfLastJob, totalJobs) || 0}
          </span>{" "}
                        of <span className="font-semibold">{totalJobs}</span> jobs
                    </p>
                </div>

                {/* ---------- Search Bar ---------- */}
                <div className="mb-10">
                    <input
                        value={q}
                        onChange={(e) => {
                            setCurrentPage(1);
                            setQ(e.target.value);
                        }}
                        placeholder="Search title, company, or location…"
                        className="w-full sm:w-1/2 px-5 py-3 rounded-xl border border-slate-300 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#005072] focus:border-transparent transition-all duration-200"
                    />
                </div>

                {/* ---------- Job Cards ---------- */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 job-list-grid">
                    {currentJobs.map((job) => (
                        <div
                            key={job._id}
                            className="group bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 job-list-card"
                        >
                            <div className="flex justify-between items-start">
                                <h2 className="text-xl font-semibold text-slate-800 group-hover:text-[#005072] transition">
                                    {job.title}
                                </h2>
                                <Briefcase className="w-5 h-5 text-[#005072] opacity-70"/>
                            </div>

                            <p className="text-slate-500 mt-1">{job.company}</p>
                            <p className="text-slate-600 mt-3 line-clamp-3">
                                {job.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-4 text-sm">
                                {job.location && (
                                    <span
                                        className="flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-full">
                  <MapPin className="w-4 h-4"/> {job.location}
                </span>
                                )}
                                {job.salary && (
                                    <span
                                        className="flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-full">
                  <DollarSign className="w-4 h-4"/> {job.salary}
                </span>
                                )}
                            </div>

                            <div className="flex items-center justify-between mt-5">
                                <div className="flex items-center gap-1 text-xs text-slate-400">
                                    <CalendarDays className="w-4 h-4"/>
                                    <span>{daysAgo(job.createdAt)}</span>
                                </div>

                                <a
                                    href={`/jobs/${job._id}`}
                                    className="text-[#005072] font-medium hover:underline"
                                >
                                    View Details →
                                </a>
                            </div>
                        </div>
                    ))}

                    {currentJobs.length === 0 && (
                        <p className="text-slate-500 text-center col-span-full">
                            No jobs found.
                        </p>
                    )}
                </div>

                {/* ---------- Pagination ---------- */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-12 gap-2">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => paginate(i + 1)}
                                className={`px-4 py-2 rounded-lg border transition-all ${
                                    currentPage === i + 1
                                        ? "bg-[#005072] text-white border-transparent"
                                        : "border-slate-300 text-slate-600 hover:bg-slate-100"
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
