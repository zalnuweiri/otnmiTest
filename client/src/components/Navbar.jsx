import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <header className="bg-card border-b">
            <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-xl bg-primary" />
                    <span className="text-2xl font-semibold text-secondary">JobSphere</span>
                </Link>

                {/* Navigation links */}
                <div className="flex items-center gap-6">
                    <NavLink to="/" className="text-gray-700 hover:text-secondary">
                        Browse Jobs
                    </NavLink>

                    {isAuthenticated && (
                        <>
                            <NavLink to="/dashboard" className="text-gray-700 hover:text-secondary">
                                Dashboard
                            </NavLink>
                            <NavLink to="/post" className="text-gray-700 hover:text-secondary">
                                Post Job
                            </NavLink>
                        </>
                    )}

                    {!isAuthenticated ? (
                        <>
                            <NavLink
                                to="/login"
                                className="bg-primary px-4 py-2 rounded-xl font-medium text-black hover:opacity-90 transition"
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/signup"
                                className="border border-primary text-primary px-4 py-2 rounded-xl font-medium hover:bg-primary hover:text-black transition"
                            >
                                Sign Up
                            </NavLink>
                        </>
                    ) : (
                        <button
                            onClick={() => {
                                logout();
                                navigate("/");
                            }}
                            className="bg-secondary px-4 py-2 rounded-xl font-medium text-white hover:opacity-90 transition"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </nav>
        </header>
    );
}
