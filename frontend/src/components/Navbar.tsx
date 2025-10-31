import { useState } from "react";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [search, setSearch] = useState("");

  return (
    <nav
      className="w-full bg-[#F9F9F9] flex items-center justify-between 
                 shadow-[0_2px_16px_0_rgba(0,0,0,0.1)] 
                 px-[124px] py-[16px]"
    >
      {/* Left Section — Logo */}
      <div className="flex items-center">
        <img
          src={logo}
          alt="HD Logo"
          className="w-[100px] h-[55px] object-contain"
        />
      </div>

      {/* Right Section — Search */}
      <div className="flex items-center gap-[16px]">
        <input
          type="text"
          placeholder="Search experiences"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            bg-[#EDEDED]
            rounded-[4px]
            px-[16px]
            py-[12px]
            text-[14px]
            leading-[18px]
            font-normal
            font-inter
            text-gray-700
            w-[340px]
            h-[42px]
            focus:outline-none
            focus:ring-2
            focus:ring-yellow-400
          "
        />
        <button
          className="
            bg-[#FFD643]
            text-[#161616]
            px-[20px]
            py-[12px]
            font-medium
            text-[14px]
            rounded-[8px]
            w-[87px]
            h-[42px]
            hover:bg-[#fcd535]
            transition
          "
        >
          Search
        </button>
      </div>
    </nav>
  );
}
