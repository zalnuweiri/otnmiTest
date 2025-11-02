import { useState, useEffect } from "react";
import api from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import {
    Briefcase,
    Building2,
    MapPin,
    DollarSign,
    FileText,
    SendHorizonal,
} from "lucide-react";

export default function PostJob() {
    const { publisherKey } = useAuth();
    const [status, setStatus] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

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
        <div className="min-h-screen bg-[#f9fafb] text-slate-800 overflow-hidden">
            {/* ---------- Header Banner ---------- */}
            <div className="bg-gradient-to-r from-[#005072] to-[#00a1a7] text-white py-12 px-6 rounded-b-3xl shadow-md">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-2">Post a Job</h1>
                    <p className="text-white/80">
                        Share new opportunities with candidates on JobSphere.
                    </p>
                </div>
            </div>

            {/* ---------- Form Section ---------- */}
            <div
                className={`max-w-4xl mx-auto mt-10 px-6 transform transition-all duration-700 ease-out ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
            >
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
                    <form className="grid md:grid-cols-2 gap-6" onSubmit={submit}>
                        {/* Job Title */}
                        <div className="relative">
                            <Briefcase className="w-4 h-4 absolute left-4 top-4 text-slate-400" />
                            <input
                                name="title"
                                placeholder="Job Title"
                                required
                                className="pl-10 w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#00a1a7] focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Company Name */}
                        <div className="relative">
                            <Building2 className="w-4 h-4 absolute left-4 top-4 text-slate-400" />
                            <input
                                name="company"
                                placeholder="Company Name"
                                required
                                className="pl-10 w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#00a1a7] focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Location */}
                        <div className="relative">
                            <MapPin className="w-4 h-4 absolute left-4 top-4 text-slate-400" />
                            <input
                                name="location"
                                placeholder="Location (optional)"
                                className="pl-10 w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#00a1a7] focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Salary */}
                        <div className="relative">
                            <DollarSign className="w-4 h-4 absolute left-4 top-4 text-slate-400" />
                            <input
                                name="salary"
                                placeholder="Salary (optional)"
                                className="pl-10 w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#00a1a7] focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Job Description */}
                        <div className="relative md:col-span-2">
                            <FileText className="w-4 h-4 absolute left-4 top-4 text-slate-400" />
                            <textarea
                                name="description"
                                placeholder="Job Description"
                                required
                                className="pl-10 w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#00a1a7] focus:border-transparent transition-all min-h-[160px]"
                            />
                        </div>

                        {/* Footer */}
                        <div className="md:col-span-2 flex items-center justify-end mt-2">
                            <button className="flex items-center gap-2 bg-gradient-to-r from-[#005072] to-[#00a1a7] text-white px-5 py-3 rounded-xl font-medium hover:opacity-90 transition">
                                <SendHorizonal className="w-4 h-4" />
                                Create Job
                            </button>
                        </div>
                    </form>

                    {status && (
                        <p className="mt-4 text-sm text-slate-700">{status}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
