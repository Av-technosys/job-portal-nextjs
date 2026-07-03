import React from "react";
import { Avatar, Stack, Typography } from "../common";
import { TESTIMONIAL_PAGE_CONFIG } from "@/constants";
import { FormatQuoteIcon } from "@/assets";
import { colorStyles } from "@/styles";
import { getInitials } from "@/helper";

interface TestimonialCardProps {
  card: {
    id: number;
    name: string;
    content: string;
    designation: string;
  };
}

function TestimonialCard({ card }: TestimonialCardProps) {
  const { CONTENT, NAME, DESIGNATION, IMAGE } = TESTIMONIAL_PAGE_CONFIG;
  return (
    <Stack
      key={card.id}
      stackProps={{
        gap: 3,
        className: "w-full sm:w-80 h-auto sm:h-80 rounded-2xl p-6 bg-white shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-200/70 group cursor-pointer",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        sx: {
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-6px)",
            borderColor: "#818CF8",
            boxShadow: "0 20px 25px -5px rgba(79, 70, 229, 0.1), 0 10px 10px -5px rgba(79, 70, 229, 0.04)",
          },
        },
      }}
    >
      <Stack stackProps={{ className: "relative p-1 rounded-full ring-4 ring-indigo-50 group-hover:ring-indigo-100 transition-all duration-300" }}>
        <Stack
          stackProps={{
            className:
              "h-6 w-6 rounded-full border-2 absolute right-0 bottom-0 z-10 flex items-center justify-center shadow-sm",
            sx: {
              backgroundColor: "#10B981",
              borderColor: colorStyles.white,
            },
          }}
        >
          <FormatQuoteIcon
            sx={{ fontSize: "larger", color: colorStyles.white }}
          />
        </Stack>
        <Avatar {...IMAGE(card).avatarProps}>
          {getInitials({ name: String(card?.name || "") })}
        </Avatar>
      </Stack>
      <Typography {...CONTENT(card)} />

      <Stack
        stackProps={{
          gap: 1,
          alignItems: "center",
        }}
      >
        <Stack
          stackProps={{
            className: "h-2 w-2 rounded-full",
            sx: {
              backgroundColor: "#10B981",
              boxShadow: "0 0 8px rgba(16, 185, 129, 0.6)",
            },
          }}
        />
        <Stack>
          <Typography {...NAME(card)} />
          <Typography {...DESIGNATION(card)} />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default TestimonialCard;
