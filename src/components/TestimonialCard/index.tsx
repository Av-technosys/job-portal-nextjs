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
        gap: 2,
        className: "h-80 w-80 rounded-xl border-2",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        sx: {
          borderColor: colorStyles.borderGreyColor,
          transition: "border-color 0.4s ease-in-out",
          "&:hover": {
            borderColor: colorStyles.cardHoverBorderColor,
          },
        },
      }}
    >
      <Stack stackProps={{ className: "relative" }}>
        <Stack
          stackProps={{
            className:
              "h-5 w-5 rounded-full border absolute right-1 bottom-1 z-10",
            sx: {
              backgroundColor: colorStyles.green,
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
            className: "h-2 w-2 border rounded-full",
            sx: {
              backgroundColor: colorStyles.green,
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
