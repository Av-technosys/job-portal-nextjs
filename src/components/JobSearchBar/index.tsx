import React, { useState } from "react";
import { Stack, Typography } from "@/components/common";
import { SearchIcon } from "@/assets/icons";
import { EXPERIENCE_OPTIONS } from "@/constants";

const JobSearchBar = ({ onSearch }: { onSearch: (searchObj: any) => void }) => {
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    onSearch({ skills, experience, location });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Stack
      stackProps={{
        alignItems: "center",
        className: "w-full py-16 bg-[#F8F9FB] relative overflow-hidden",
      }}
    >
      {/* Background radial effects */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[900px] h-[300px] bg-white rounded-[50%] blur-3xl opacity-60 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[150px] bg-white rounded-[50%] blur-2xl opacity-80 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center w-full px-4">
        <h1 className="text-[#1B1F2E] font-extrabold mb-3 text-4xl md:text-5xl text-center">
          Find your dream job now
        </h1>
        <p className="text-[#4A4E5A] mb-10 text-lg md:text-xl text-center">
          5 lakh+ jobs for you to explore
        </p>

        <div className="flex flex-col md:flex-row items-center bg-white rounded-3xl md:rounded-full p-2 md:p-3 w-full max-w-5xl shadow-[0px_8px_24px_rgba(0,0,0,0.04)]">
          <div className="flex flex-1 items-center px-4 py-2 w-full md:w-auto">
            <SearchIcon className="text-[#848A9C] mr-3" />
            <input
              type="text"
              className="w-full bg-transparent outline-none text-[#1B1F2E] placeholder-[#848A9C] text-base"
              placeholder="Enter skills / designations / companies"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="hidden md:block w-[1px] h-8 bg-[#E5E7EB] mx-1"></div>

          <div className="flex flex-1 items-center px-4 py-2 w-full md:w-auto border-t md:border-t-0 border-[#E5E7EB]">
            <select
              className={`w-full bg-transparent outline-none text-base cursor-pointer appearance-none ${experience ? 'text-[#1B1F2E]' : 'text-[#848A9C]'}`}
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              onKeyDown={handleKeyDown}
            >
              <option value="" disabled className="hidden">Select experience</option>
              <option value="" className="text-[#1B1F2E]">Any</option>
              {EXPERIENCE_OPTIONS.map((opt) => (
                <option key={opt.key} value={opt.value} className="text-[#1B1F2E]">
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none ml-2">
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1.5L6 6.5L11 1.5" stroke="#848A9C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          <div className="hidden md:block w-[1px] h-8 bg-[#E5E7EB] mx-1"></div>

          <div className="flex flex-1 items-center px-4 py-2 w-full md:w-auto border-t md:border-t-0 border-[#E5E7EB]">
            <input
              type="text"
              className="w-full bg-transparent outline-none text-[#1B1F2E] placeholder-[#848A9C] text-base"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <button
            className="bg-[#2D5BFF] hover:bg-blue-700 text-white font-medium rounded-full px-10 py-3.5 w-full md:w-auto transition-colors ml-0 md:ml-2 mt-4 md:mt-0 text-base"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </Stack>
  );
};

export default JobSearchBar;

