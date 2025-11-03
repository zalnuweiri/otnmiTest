import React from "react";
import { Briefcase } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-slate-200 bg-white py-10 px-6 mt-20">
            <div className="max-w-6xl mx-auto text-center md:text-left">
                {/* Logo + Text */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="flex flex-col items-center md:items-start">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 rounded-xl bg-gradient-to-r from-[#005072] to-[#00a1a7]">
                            </div>
                            <h2 className="text-xl font-semibold text-slate-800">JobSphere</h2>
                        </div>
                        <p className="text-slate-500 text-sm max-w-md">
                            Connect with Employers Today!
                        </p>
                    </div>

                    {/* Copyright */}
                    <div className="text-slate-500 text-sm text-center md:text-right">
                        © {currentYear} JobSphere™
                    </div>
                </div>
            </div>
        </footer>
    );
}
