import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import {
    Briefcase,
    LayoutDashboard,
    PlusCircle,
    LogIn,
    UserPlus,
    LogOut
} from "lucide-react";

export default function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <header className="bg-white border-b">
            <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                {/* ---------- Logo ---------- */}
                <Link to="/" className="flex items-center gap-2">
                    <div
                        className="h-8 w-8 rounded-xl bg-gradient-to-r from-[#005072] to-[#00a1a7]
              transition-all duration-500 hover:from-[#00a1a7] hover:to-[#005072]
              hover:scale-105 shadow-md hover:shadow-lg"
                    ></div>
                    <span className="text-2xl font-semibold text-[#005072]">
            JobSphere
          </span>
                </Link>

                {/* ---------- Navigation Links ---------- */}
                <div className="flex items-center gap-6 text-[15px]">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `flex items-center gap-1 ${
                                isActive ? "text-[#00a1a7]" : "text-gray-700"
                            } hover:text-[#00a1a7] transition`
                        }
                    >
                        <Briefcase className="w-4 h-4" />
                        Browse Jobs
                    </NavLink>

                    {isAuthenticated && (
                        <>
                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) =>
                                    `flex items-center gap-1 ${
                                        isActive ? "text-[#00a1a7]" : "text-gray-700"
                                    } hover:text-[#00a1a7] transition`
                                }
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                Dashboard
                            </NavLink>

                            <NavLink
                                to="/post"
                                className={({ isActive }) =>
                                    `flex items-center gap-1 ${
                                        isActive ? "text-[#00a1a7]" : "text-gray-700"
                                    } hover:text-[#00a1a7] transition`
                                }
                            >
                                <PlusCircle className="w-4 h-4" />
                                Post Job
                            </NavLink>
                        </>
                    )}

                    {!isAuthenticated ? (
                        <>
                            <NavLink
                                to="/login"
                                className="flex items-center gap-2 bg-[#00a1a7] text-white px-4 py-2 rounded-xl font-medium hover:opacity-90 transition"
                            >
                                <LogIn className="w-4 h-4" />
                                Login
                            </NavLink>
                            <NavLink
                                to="/signup"
                                className="flex items-center gap-2 border border-[#00a1a7] text-[#00a1a7] px-4 py-2 rounded-xl font-medium hover:bg-[#00a1a7] hover:text-white transition"
                            >
                                <UserPlus className="w-4 h-4" />
                                Sign Up
                            </NavLink>
                        </>
                    ) : (
                        <button
                            onClick={() => {
                                logout();
                                navigate("/");
                            }}
                            className="flex items-center gap-2 bg-[#005072] text-white px-4 py-2 rounded-xl font-medium hover:opacity-90 transition"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    )}
                </div>
            </nav>
        </header>
    );
}
