import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { videoLinks } from "../testimonials/CustomerReview";

// Start the slider from a random video each time the page loads
const randomStartIndex = Math.floor(Math.random() * videoLinks.length);

const TestimonialSlider = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="slider-container overflow-hidden relative lg:px-0 ">
      {/* Custom Navigation Buttons */}
      <div
        ref={prevRef}
        className="custom-prev absolute top-1/2 z-20 -translate-y-1/2 left-3 cursor-pointer"
      >
        <MdChevronLeft size={30} />
      </div>
      <div
        ref={nextRef}
        className="custom-next absolute top-1/2 z-20 -translate-y-1/2 right-3 cursor-pointer"
      >
        <MdChevronRight size={30} />
      </div>

      <Swiper
        spaceBetween={20}
        slidesPerView={5}
        modules={[Navigation]}
        freeMode={true}
        grabCursor={true}
        initialSlide={randomStartIndex}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 20 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
          1280: { slidesPerView: 4, spaceBetween: 20 },
        }}
      >
        {videoLinks.map((id, index) => (
          <SwiperSlide key={index}>
            <iframe
              width="100%"
              height="450"
              src={`https://www.youtube.com/embed/${id}`}
              title={`YouTube video ${index + 1}`}
              frameBorder="0"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialSlider;