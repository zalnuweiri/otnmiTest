import { useState } from "react";
import api from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
    const {loginUser} = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({email: "", password: ""});
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await api.post("/users", form);
            loginUser(res.data.user.email, res.data.user.publisherKey);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] px-4">
            <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-[#005072] text-center mb-6">Login</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Email */}
                    <input
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#00a1a7] focus:border-transparent transition-all"
                    />

                    {/* Password */}
                    <div className="relative">
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="border border-slate-300 rounded-xl px-4 py-3 w-full pr-10 focus:ring-2 focus:ring-[#00a1a7] focus:border-transparent transition-all"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-[#005072]"
                        >
                            {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                        </button>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-[#005072] to-[#00a1a7] text-white py-3 rounded-xl font-medium hover:opacity-90 transition-all"
                    >
                        Login
                    </button>
                </form>

                {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

                <p className="text-center text-sm text-slate-500 mt-6">
                    Don’t have an account?{" "}
                    <a href="/signup" className="text-[#00a1a7] font-medium hover:underline">
                        Sign up here
                    </a>
                </p>
            </div>
        </div>
    );
}