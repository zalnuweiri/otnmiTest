import { FaTiktok, FaInstagram, FaFacebookF } from "react-icons/fa";
import {useState} from "react";

export default function Footer() {
    const [showForm, setShowForm] = useState(false);
    return (
        <footer className="bg-[#DFA867] py-[13vh] px-8 md:px-16">
            <div
                className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-8 text-center md:text-left">

                {/* Left - Mailing List */}
                <div className="font-['NeueBit'] font-bold flex justify-center md:justify-start z-10">
                    <button
                        onClick={() => setShowForm(true)}
                        className="px-8 py-3 border-1 border-black text-black text-lg tracking-[0.3em] uppercase
              transition-colors duration-500 ease-in-out
              hover:bg-[#ECE1D4] hover:border-transparent
              active:bg-black active:text-[#EB4660]"
                    >
                        Join Our Mailing List
                    </button>
                </div>


                {/* Center - Social */}
                <div className="text-center">
                    <p className="font-bold text-lg mb-4 tracking-[0.16em] ">Let's get social</p>
                    <div className="flex justify-center space-x-6 text-2xl">
                        <a href="https://www.tiktok.com/@silenth.to?lang=en" aria-label="TikTok"
                           className="hover:text-gray-700">
                            <FaTiktok/>
                        </a>
                        <a href="https://www.instagram.com/silenth.to/?hl=en" aria-label="Instagram"
                           className="hover:text-gray-700">
                            <FaInstagram/>
                        </a>
                        <a href="https://www.facebook.com/silenth.tor/" aria-label="Facebook"
                           className="hover:text-gray-700">
                            <FaFacebookF/>
                        </a>
                    </div>
                </div>

                {/* Right - Contact Info */}
                <div className="font-['NeueBit'] text-center md:text-right text-sm md:text-base tracking-[0.20em]">
                    <p className="font-bold">461 KING ST. W</p>
                    <p className="mt-2 font-bold">
                        416 900 3535 | <a href="mailto:info@silenth.ca">INFO@SILENTH.CA</a>
                    </p>
                    <p className="mt-2 font-bold">
                        Open 7 days a week, 5 p.m. - 12 a.m
                    </p>
                </div>
            </div>
            {/* Render Modal if triggered */}
            {showForm && <MailingForm onClose={() => setShowForm(false)} />}
        </footer>
    );
}
