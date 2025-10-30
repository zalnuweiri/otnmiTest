// src/components/MailingListForm.jsx
import { useState } from "react";

import emailjs from "emailjs-com";

export default function MailingForm({ onClose }) {
    const [form, setForm] = useState({ name: "", email: "" });
    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Submitting...");

        try {
            /* localhost/test code: const res = await fetch("http://localhost:5050/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: form.name, email: form.email }),
            });*/
            const res = await fetch("https://silenth.onrender.com/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: form.name, email: form.email }),
            });


            const data = await res.json();

            if (data.status === "success") {
                emailjs.send(
                    "service_ukq7dnl",       // service ID
                    "template_lwzl3o2",      // template ID
                    { name: form.name, email: form.email },
                    "ox0Oi8Y1w3KZi0b3P"      // public key
                );
                setStatus("Thank you for joining our mailing list!");
                setForm({ name: "", email: "" });
                setTimeout(() => onClose(), 2000);
            } else {
                setStatus("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error(error);
            setStatus("Failed to submit. Please try again.");
        }
    };


    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="relative bg-[#ECE1D4] p-8 rounded-lg shadow-lg w-full max-w-lg border border-black">
                {/* Close Button */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4 text-2xl font-bold text-black hover:text-[#EB4660] focus:outline-none"
                >
                    ×
                </button>

                {/* Title */}
                <h2 className="font-['Mondwest'] text-2xl md:text-3xl font-bold text-[#0B0B0B] mb-6">
                    Join Our Mailing List
                </h2>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 font-['NeueBit'] text-[#0B0B0B]"
                >
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                        className="w-full border-2 border-black px-4 py-2 text-sm md:text-base tracking-[0.07em] focus:outline-none focus:border-[#EB4660]"
                    />
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        required
                        className="w-full border-2 border-black px-4 py-2 text-sm md:text-base tracking-[0.07em] focus:outline-none focus:border-[#EB4660]"
                    />

                    {/* Buttons */}
                    <div className="flex justify-start items-center mt-6">
                        <button
                            type="submit"
                            className="font-['NeueBit'] px-8 py-3 border-2 border-black text-black text-[16px] md:text-[18px] tracking-[0.25em] hover:bg-black hover:text-white transition font-bold"
                        >
                            JOIN
                        </button>
                    </div>
                </form>

                {/* Status Message */}
                {status && (
                    <p className="mt-4 text-sm font-['NeueBit'] text-[#0B0B0B] opacity-70">
                        {status}
                    </p>
                )}
            </div>
        </div>
    );
}
