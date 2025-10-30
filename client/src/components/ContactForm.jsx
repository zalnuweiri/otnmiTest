// src/components/ContactForm.jsx
import emailjs from "emailjs-com";
import { useState } from "react";
/* need to switch email to NORA@silenth.ca */
export default function ContactForm({ onClose }) {
    const [status, setStatus] = useState("");

    const sendEmail = (e) => {
        e.preventDefault();
        setStatus("Sending...");

        emailjs
            .sendForm(
                "service_ukq7dnl",   // from EmailJS
                "template_d2dzthe",  // from EmailJS
                e.target,
                "ox0Oi8Y1w3KZi0b3P"  // EmailJS public key
            )
            .then(
                () => setStatus("Message sent!"),
                () => setStatus("Something went wrong, try again.")
            );
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            {/* Modal window */}
            <div className="relative bg-[#ECE1D4] p-8 rounded-lg shadow-lg w-full max-w-lg border border-black">

                {/* Close button (X in top right) */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4 text-2xl font-bold text-black hover:text-[#EB4660] focus:outline-none"
                >
                    ×
                </button>

                {/* Title */}
                <h2 className="font-['Mondwest'] text-2xl md:text-3xl font-bold text-[#0B0B0B] mb-6">
                    Start Planning
                </h2>

                {/* Form */}
                <form onSubmit={sendEmail} className="space-y-4 font-['NeueBit'] text-[#0B0B0B]">
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        required
                        className="w-full border-2 border-black px-4 py-2 text-sm md:text-base tracking-[0.07em] focus:outline-none focus:border-[#EB4660]"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        required
                        className="w-full border-2 border-black px-4 py-2 text-sm md:text-base tracking-[0.07em] focus:outline-none focus:border-[#EB4660]"
                    />
                    <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        className="w-full border-2 border-black px-4 py-2 text-sm md:text-base tracking-[0.07em] focus:outline-none focus:border-[#EB4660]"
                    />
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        required
                        rows="4"
                        className="w-full border-2 border-black px-4 py-2 text-sm md:text-base tracking-[0.07em] focus:outline-none focus:border-[#EB4660]"
                    />

                    {/* Hidden timestamp field */}
                    <input
                        type="hidden"
                        name="time"
                        value={new Date().toLocaleString()}
                    />

                    {/* Buttons */}
                    <div className="flex justify-start items-center mt-6">
                        <button
                            type="submit"
                            className="font-['NeueBit'] px-8 py-3 border-2 border-black text-black text-[16px] md:text-[18px] tracking-[0.25em] hover:bg-black hover:text-white transition font-bold"
                        >
                            SEND
                        </button>
                    </div>
                </form>

                {/* Status message */}
                {status && (
                    <p className="mt-4 text-sm font-['NeueBit'] text-[#0B0B0B] opacity-70">
                        {status}
                    </p>
                )}
            </div>
        </div>
    );
}
