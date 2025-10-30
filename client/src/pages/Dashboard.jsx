import { useEffect, useState } from "react";
import api from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";

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

        if (isAuthenticated && publisherKey) {
            fetchData();
        }
    }, [publisherKey, userEmail, isAuthenticated]);

    const remove = async (id) => {
        if (!confirm("Delete this job?")) return;
        try {
            await api.delete(`/jobs/${id}`);
            setJobs(prev => prev.filter(j => j._id !== id));
        } catch (err) {
            console.error("Delete job error:", err);
        }
    };

    return (
        <div className="grid lg:grid-cols-3 gap-8">
            {/* ---------- My Jobs ---------- */}
            <section className="bg-card rounded-2xl border p-6">
                <h2 className="text-2xl font-bold text-secondary">My Jobs</h2>
                <div className="mt-4 space-y-4">
                    {jobs.map(j => (
                        <div key={j._id} className="flex items-start justify-between border rounded-xl p-4">
                            <div>
                                <Link to={`/jobs/${j._id}`} className="font-semibold text-secondary">
                                    {j.title}
                                </Link>
                                <p className="text-gray-600 text-sm">{j.company}</p>
                            </div>
                            <button onClick={() => remove(j._id)} className="text-red-600 hover:underline">
                                Delete
                            </button>
                        </div>
                    ))}
                    {jobs.length === 0 && <p className="text-gray-600">No jobs yet.</p>}
                </div>
            </section>

            {/* ---------- Received Applications ---------- */}
            <section className="bg-card rounded-2xl border p-6">
                <h2 className="text-2xl font-bold text-secondary">Received Applications</h2>
                <div className="mt-4 space-y-4">
                    {receivedApps.map(a => (
                        <div key={a._id} className="border rounded-xl p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-secondary">{a.name}</p>
                                    <p className="text-sm text-gray-600">{a.email}</p>
                                </div>
                                <a href={a.cvPath} download className="text-primary underline">
                                    Download CV
                                </a>
                            </div>
                            <p className="text-sm text-gray-700 mt-2">
                                Applied for <b>{a.job?.title}</b> @ {a.job?.company}
                            </p>
                        </div>
                    ))}
                    {receivedApps.length === 0 && <p className="text-gray-600">No applications received.</p>}
                </div>
            </section>

            {/* ---------- Sent Applications ---------- */}
            <section className="bg-card rounded-2xl border p-6">
                <h2 className="text-2xl font-bold text-secondary">Sent Applications</h2>
                <div className="mt-4 space-y-4">
                    {sentApps.map(a => (
                        <div key={a._id} className="border rounded-xl p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-secondary">{a.job?.title}</p>
                                    <p className="text-sm text-gray-600">{a.job?.company}</p>
                                </div>
                                <a href={a.cvPath} download className="text-primary underline">
                                    Download CV
                                </a>
                            </div>
                            <p className="text-sm text-gray-700 mt-2">
                                Status: <b>Submitted</b> — by {a.name} ({a.email})
                            </p>
                        </div>
                    ))}
                    {sentApps.length === 0 && <p className="text-gray-600">You haven’t applied to any jobs yet.</p>}
                </div>
            </section>
        </div>
    );
}
