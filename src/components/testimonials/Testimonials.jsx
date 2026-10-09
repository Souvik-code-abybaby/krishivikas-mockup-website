import React from "react";
import { useTranslation } from "react-i18next";
import { Fade } from "react-awesome-reveal";
// Put your testimonial icon here (or change this path)

import TestimonialSlider from "./TestimonialSlider";

const Testimonials = () => {
  const { t } = useTranslation();

  return (
    // Already inside HomePage's <main className="container">, so no extra
    // container/padding wrapper here (it would shrink the section).
    <section className="rounded-3xl    pb-5 sm:px-0">
      

      <div className="faq_right relative">
        <Fade triggerOnce>
          <TestimonialSlider />
        </Fade>
      </div>
    </section>
  );
};

export default Testimonials;