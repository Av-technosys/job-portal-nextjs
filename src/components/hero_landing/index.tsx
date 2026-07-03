import React from "react";
import { Box } from "@mui/material";

function HeroLanding() {
  return (
    <Box
      component="section"
      className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32 text-center mb-10 md:mb-16"
      sx={{
        width: { xs: "100%", md: "calc(100% + 64px)" },
        mx: { xs: 0, md: "-32px" },
        mt: { xs: "-32px", md: "-64px" },
        // Hide gradient on mobile screens
        background: {
          xs: "none",
          md: "radial-gradient(circle at 50% -15%, rgba(99, 102, 241, 0.18) 0%, rgba(255, 255, 255, 0) 55%), linear-gradient(180deg, rgba(238, 242, 255, 0.9) 0%, rgba(255, 255, 255, 0) 65%)",
        },
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-16 flex flex-col items-center justify-center gap-8">
        {/* Top Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50/90 border border-indigo-200/70 text-indigo-700 text-xs md:text-sm font-semibold tracking-wider uppercase shadow-sm backdrop-blur-sm max-w-full text-center">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse flex-shrink-0" />
          <span>#1 Verified Career Advancement Platform</span>
        </div>

        {/* Main Gradient Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
          Discover Your Next
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600">
            Dream Career
          </span>
        </h1>

        {/* Supporting Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-slate-500 max-w-2xl font-normal leading-8">
          Explore thousands of top-tier job opportunities, prove your readiness with validated skill assessments, and connect directly with hiring teams at world-class enterprises.
        </p>
      </div>
    </Box>
  );
}

export default HeroLanding;
