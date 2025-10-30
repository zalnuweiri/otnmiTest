import React, { useEffect, useState } from "react";
import api from "../services/api.js";
import JobCard from "../components/JobCard.jsx";

export default function JobList() {
    const [jobs, setJobs] = useState([]);
    const [q, setQ] = useState("");

    useEffect(() => {
        api.get("/jobs").then(res => setJobs(res.data)).catch(() => setJobs([]));
    }, []);

    const filtered = jobs.filter(j =>
        [j.title, j.company, j.location].join(" ").toLowerCase().includes(q.toLowerCase())
    );

    return (
        <>
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-secondary">Find Your Next Role</h1>
                <p className="text-gray-600 mt-1">Explore opportunities posted by employers.</p>
                <input
                    value={q}
                    onChange={e => setQ(e.target.value)}
                    placeholder="Search title, company, or location…"
                    className="mt-4 w-full sm:w-1/2 px-4 py-3 rounded-xl border bg-white"
                />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(job => <JobCard key={job._id} job={job} />)}
            </div>

            {filtered.length === 0 && (
                <p className="text-gray-600 mt-8">No jobs found.</p>
            )}
        </>
    );
}
