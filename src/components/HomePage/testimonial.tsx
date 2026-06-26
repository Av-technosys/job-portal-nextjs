import React, { useMemo } from "react";
import { Stack, Typography } from "../common";
import { TESTIMONIAL_PAGE_CONFIG } from "@/constants";
import { testimonial_1, testimonial_2, testimonial_3 } from "@/assets";
import TestimonialCard from "../TestimonialCard";

function Testimonial() {
  const { HEADER_TEXT, TESTIMONIAL_DESC_TEXT } = TESTIMONIAL_PAGE_CONFIG;
  const card = useMemo(() => {
    return [
      {
        id: 1,
        profile_image: testimonial_1.src,
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. ",
        name: "Allison Adam",
        designation: "Founder & CEO",
      },
      {
        id: 2,
        profile_image: testimonial_2.src,
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. ",
        name: "Alex Jesse",
        designation: "Head Of Design",
      },
      {
        id: 3,
        profile_image: testimonial_3.src,
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. ",
        name: "Rahman Smith",
        designation: "senior developer",
      },
    ];
  }, []);

  return (
    <>
      {/* Plain div wrapper so mx-auto centering works correctly */}
      <div
        style={{
          maxWidth: "1152px",
          margin: "0 auto",
          width: "100%",
          minWidth: 0,
          padding: "0 12px",
          marginTop: 16,
          marginBottom: 16,
        }}
      >
        <Stack
          stackProps={{
            gap: 4,
            width: "100%",
          }}
        >
          {/* Header */}
          <Stack
            stackProps={{
              direction: "row",
            }}
          >
            <Stack
              stackProps={{
                width: { xs: "100%", md: "50%" },
                gap: 2,
                className: "p-3",
              }}
            >
              <Typography {...HEADER_TEXT()} />
              <Typography {...TESTIMONIAL_DESC_TEXT()} />
            </Stack>
          </Stack>

          {/* Cards — vertically stacked on mobile, wrap on desktop */}
          <Stack
            stackProps={{
              className: "mt-6",
              direction: { xs: "column", md: "row" },
              flexWrap: "wrap",
              width: "100%",
              gap: 4,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {card.map((item) => (
              <TestimonialCard key={item.id} card={item} />
            ))}
          </Stack>
        </Stack>
      </div>
    </>
  );
}

export default Testimonial;
