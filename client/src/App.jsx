import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import JobList from "./pages/JobList.jsx";
import JobDetail from "./pages/JobDetail.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PostJob from "./pages/PostJob.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import NotFound from "./pages/NotFound.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import Footer from "./components/Footer.jsx";

// 👇 Replace old "EmployerRoute" with more flexible private route
function PrivateRoute({ children }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function App() {
    return (
        <AuthProvider>
            <div className="min-h-screen bg-background">
                <Navbar />
                <main className="max-w-6xl mx-auto px-4 py-8">
                    <Routes>
                        {/* Public pages */}
                        <Route path="/" element={<JobList />} />
                        <Route path="/jobs/:id" element={<JobDetail />} />
                        <Route path="/login" element={<Login />} />     {/* ✅ new */}
                        <Route path="/signup" element={<Signup />} />   {/* ✅ new */}

                        {/* Protected pages */}
                        <Route
                            path="/dashboard"
                            element={
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/post"
                            element={
                                <PrivateRoute>
                                    <PostJob />
                                </PrivateRoute>
                            }
                        />

                        {/* Catch-all 404 */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </AuthProvider>
    );
}
