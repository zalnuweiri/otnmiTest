import { useState } from "react";
import api from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Signup() {
    const { loginUser } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await api.post("/users", form);
            loginUser(res.data.user.email, res.data.user.publisherKey);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 bg-card p-8 rounded-2xl border shadow-md">
            <h2 className="text-2xl font-bold text-secondary mb-6 text-center">Create an Account</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Full Name */}
                <input
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="border px-4 py-3 rounded-xl w-full"
                />

                {/* Email */}
                <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="border px-4 py-3 rounded-xl w-full"
                />

                {/* Password with toggle */}
                <div className="relative">
                    <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="border px-4 py-3 rounded-xl w-full pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-secondary text-white px-4 py-3 rounded-xl hover:opacity-90 transition"
                >
                    Sign Up
                </button>
            </form>

            {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
        </div>
    );
}
