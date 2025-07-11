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
      <Stack
        stackProps={{ gap: 4, marginLeft: 2, width: "90vw", marginTop: 2 }}
      >
        <Stack
          stackProps={{
            direction: "row",
          }}
        >
          <Stack
            stackProps={{
              width: { xs: "100%", md: "50%" },
              gap: 2,
            }}
          >
            <Typography {...HEADER_TEXT()} />
            <Typography {...TESTIMONIAL_DESC_TEXT()} />
          </Stack>
        </Stack>
        {/* cards */}

        <Stack
          stackProps={{
            className: "mt-6 ",
            direction: { xs: "column", md: "row" },
            width: "100%",
            gap: 1,
            justifyContent: "center",
          }}
        >
          {card.map((card) => (
            <TestimonialCard key={card.id} card={card} />
          ))}
        </Stack>
      </Stack>
    </>
  );
}
export default Testimonial;
