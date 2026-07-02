import React, { useState } from "react";
import { Stack, Typography } from "@/components/common";
import { SearchIcon } from "@/assets/icons";
import { EXPERIENCE_OPTIONS } from "@/constants";
import { Select, MenuItem } from "@mui/material";

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
        className: "py-24 md:py-28 bg-gradient-to-b from-slate-50 via-slate-50/60 to-white relative overflow-hidden",
        sx: {
          width: "calc(100% + 64px)",
          mx: "-32px",
          mt: { xs: "-54px", md: "-64px" },
        },
      }}
    >
      <div className="relative z-10 flex flex-col items-center w-full px-4">
        <h1 className="font-extrabold mb-4 pb-3 pt-1 overflow-visible text-4xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-indigo-900 to-blue-700 tracking-tight leading-[1.25]">
          Find your dream job now
        </h1>
        <p className="text-slate-600 mb-12 text-lg md:text-xl text-center font-medium max-w-2xl">
          Explore top-tier opportunities tailored to your skills, experience, and career aspirations.
        </p>

        <div className="flex flex-col md:flex-row items-center bg-white/90 backdrop-blur-md rounded-3xl md:rounded-full p-2 md:p-3 w-full max-w-5xl border border-slate-200/80 shadow-[0_20px_50px_rgba(30,58,138,0.08)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.14)] transition-all duration-300">
          <div className="flex flex-1 items-center px-4 py-2 w-full md:w-auto group rounded-2xl md:rounded-full transition-all duration-200">
            <SearchIcon className="text-indigo-500 mr-3 transition-colors group-focus-within:text-indigo-600" />
            <input
              type="text"
              className="w-full bg-transparent outline-none text-slate-800 placeholder-slate-400 text-base font-medium"
              placeholder="Enter skills / designations / companies"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="hidden md:block w-[1px] h-8 bg-slate-200/80 mx-1"></div>

          <div className="flex flex-1 items-center px-4 py-2 w-full md:w-auto border-t md:border-t-0 border-slate-200/80 group rounded-2xl md:rounded-full transition-all duration-200">
            <Select
              value={experience}
              onChange={(e) => setExperience(e.target.value as string)}
              displayEmpty
              variant="standard"
              disableUnderline
              IconComponent={() => (
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2 pointer-events-none">
                  <path d="M1 1.5L6 6.5L11 1.5" stroke="#848A9C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              sx={{
                width: '100%',
                color: experience ? '#1B1F2E' : '#848A9C',
                fontSize: '1rem',
                '.MuiSelect-select': {
                  padding: 0,
                  backgroundColor: 'transparent',
                }
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    borderRadius: '12px',
                    boxShadow: '0px 8px 24px rgba(0,0,0,0.08)',
                    mt: 1,
                  }
                }
              }}
            >
              <MenuItem value="" disabled sx={{ display: 'none' }}>Select experience</MenuItem>
              <MenuItem value="">Any</MenuItem>
              {EXPERIENCE_OPTIONS.map((opt) => (
                <MenuItem key={opt.key} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </div>

          <div className="hidden md:block w-[1px] h-8 bg-slate-200/80 mx-1"></div>

          <div className="flex flex-1 items-center px-4 py-2 w-full md:w-auto border-t md:border-t-0 border-slate-200/80 group rounded-2xl md:rounded-full transition-all duration-200">
            <input
              type="text"
              className="w-full bg-transparent outline-none text-slate-800 placeholder-slate-400 text-base font-medium"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <button
            className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold rounded-full px-10 py-3.5 w-full md:w-auto shadow-lg shadow-blue-500/25 hover:shadow-indigo-500/35 active:scale-[0.98] transition-all duration-200 ml-0 md:ml-2 mt-4 md:mt-0 text-base"
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
