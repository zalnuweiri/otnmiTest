import { Link } from "react-router-dom";

export default function JobCard({ job }) {
    return (
        <div className="bg-card rounded-2xl shadow-sm border p-5 flex flex-col justify-between">
            <div>
                <h3 className="text-lg font-semibold text-secondary">{job.title}</h3>
                <p className="text-gray-600">{job.company}</p>
                <p className="mt-3 text-sm text-gray-700 line-clamp-3">{job.description}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-sm">
                    {job.location && <span className="px-2 py-1 rounded-lg bg-gray-100">{job.location}</span>}
                    {job.salary && <span className="px-2 py-1 rounded-lg bg-gray-100">{job.salary}</span>}
                </div>
            </div>
            <div className="mt-5">
                <Link
                    to={`/jobs/${job._id}`}
                    className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-secondary text-white"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}
