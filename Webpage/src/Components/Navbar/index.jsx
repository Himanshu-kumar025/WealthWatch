import "./style.css"
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { DASHBOARD_URL } from "../../../../../Dashboard/backend/axiosConfig";

export default function Navbar() {

    const navigate = useNavigate();
      const [isMobileOpen, setIsMobileOpen] = useState(false);

    const handleclick = () => {
        window.location.href = `${DASHBOARD_URL}/signup`;
    };

    const handleAction = () => {
        navigate("/")
    }

    return (
        <>
 
    <nav className="sticky top-0 px-4 py-2 shadow-md z-50 bg-[#a2d2ff]  ">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div id="logo" className="px-2 flex items-center cursor-pointer" onClick={handleAction}>
          <img src="/logo.png" alt="logo Image" className="h-10 w-auto" />
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden py-[4px] md:flex items-center gap-6">
          <a
            href="/aboutus"
            className="hover:bg-sky-200 hover:font-bold font-semibold px-4 py-2 rounded-md"
          >
            About US
          </a>
          <a
            href="/support"
            className="hover:bg-sky-200 hover:font-bold font-semibold px-4 py-2 rounded-md"
          >
            Support
          </a>
          <button className="bg-[#023e8a] text-white font-bold px-5 py-2 rounded-md hover:scale-105 transition-transform cursor-pointer" onClick={handleclick}>
            Sign up
          </button>
        </div>

        {/* Hamburger Menu (Mobile only) */}
        <div className="md:hidden flex items-center">
          <button
            className="text-2xl border border-[#023e8a] rounded-md px-3 hover:bg-[#023e8a] hover:text-white transition-colors"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Dropdown below menu icon, right-aligned) */}
      {isMobileOpen && (
        <div className="md:hidden py-[4px] flex flex-col items-end pr-4 gap-2 mt-2">
          <a
            href="/aboutus"
            className="hover:bg-sky-200 hover:font-bold font-semibold px-4 py-2 rounded-md w-fit text-right"
          >
            About US
          </a>
          <a
            href="/support"
            className="hover:bg-sky-200 hover:font-bold font-semibold px-4 py-2 rounded-md w-fit text-right"
          >
            Support
          </a>
          <button className="bg-[#023e8a] text-white font-bold px-5 py-2 rounded-md hover:scale-105 w-fit text-right cursor-pointer" onClick={handleclick}>
            Sign up
          </button>
        </div>
      )}
    </nav>
        </>
    )
}