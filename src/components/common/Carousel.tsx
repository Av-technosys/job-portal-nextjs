import { ElementRenderType, TypographyProps } from "@/types";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Stack from "./Stack";
import IconButton from "./IconButton";
import { ChevronLeftIcon, ChevronRightIcon } from "@/assets";
import Typography from "./Typography";
import { useRef } from "react";
import When from "./When";

export const CarouselCard = SwiperSlide;

function Carousel({
  titleProps,
  children,
  width = "90vw",
  sliderRef,
}: {
  titleProps?: TypographyProps;
  children: ElementRenderType;
  width?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sliderRef?: any;
}) {
  const swiperRef = useRef<SwiperClass | null>(null);

  const handleNext = () => {
    if (swiperRef?.current) {
      swiperRef.current?.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef?.current) {
      swiperRef.current?.slidePrev();
    }
  };

  return (
    <>
      <Stack>
        <When condition={titleProps !== undefined}>
          <Stack
            stackProps={{
              direction: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography {...(titleProps as TypographyProps)} />
            <Stack
              stackProps={{
                direction: "row",
              }}
            >
              <IconButton onClick={handlePrev}>
                <ChevronLeftIcon />
              </IconButton>
              <IconButton onClick={handleNext}>
                <ChevronRightIcon />
              </IconButton>
            </Stack>
          </Stack>
        </When>
        <div
          style={{
            width,
          }}
        >
          <Swiper
            onSwiper={(swiper) => {
              if (sliderRef) {
                sliderRef.current = swiper;
              } else {
                swiperRef.current = swiper;
              }
            }}
            slidesPerView={3}
            spaceBetween={5}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
            modules={[Navigation]}
            navigation
          >
            {children}
          </Swiper>
        </div>
      </Stack>
    </>
  );
}

export default Carousel;
