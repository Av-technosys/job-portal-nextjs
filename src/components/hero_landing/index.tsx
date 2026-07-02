import React from "react";
import { Box } from "@mui/material";

function HeroLanding() {
  return (
    <Box
      component="section"
      className="relative overflow-visible pt-12 pb-16 md:pt-16 md:pb-24 text-center mb-8 md:mb-12"
      sx={{
        width: "calc(100% + 64px)",
        mx: "-32px",
        mt: { xs: "-54px", md: "-64px" },
        background:
          "radial-gradient(circle at 50% -15%, rgba(99, 102, 241, 0.18) 0%, rgba(255, 255, 255, 0) 50%), linear-gradient(180deg, rgba(238, 242, 255, 0.8) 0%, rgba(255, 255, 255, 0) 60%)",
      }}
    >

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        {/* Top Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50/80 border border-indigo-200/60 text-indigo-700 text-xs md:text-sm font-semibold tracking-wide uppercase mb-6 shadow-xs backdrop-blur-sm animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
          <span>#1 Verified Career Advancement Platform</span>
        </div>

        {/* Main Gradient Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
          Discover Your Next{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600">
            Dream Career
          </span>
        </h1>

        {/* Supporting Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl font-medium leading-relaxed">
          Explore thousands of top-tier job opportunities, prove your readiness with validated skill assessments, and connect directly with hiring teams at world-class enterprises.
        </p>
      </div>
    </Box>
  );
}

export default HeroLanding;
