import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RedirectHome() {
    const navigate = useNavigate();

    useEffect(() => {
        // Wait 1.5 seconds before redirecting
        const timer = setTimeout(() => navigate("/"), 1500);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-slate-700">
            <p>Job posted! Redirecting you to the homepage...</p>
        </div>
    );
}
