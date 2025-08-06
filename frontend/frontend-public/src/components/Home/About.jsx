import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import About1 from "../../assets/company/About1.jpg";
import About2 from "../../assets/company/About2.png";

const About = ({ t }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 120,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section 
      style={{
        backgroundColor: "var(--color-background)",
        color: "var(--color-text)"
      }}
      className="relative pt-20 pb-20 px-4"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div
          className="flex flex-col lg:flex-row items-start justify-between mb-16"
          data-aos="fade-up"
        >
          <div className="lg:w-1/4 mb-6 lg:mb-0">
            <p 
              style={{ color: "var(--color-text)" }}
              className="text-base font-semibold uppercase tracking-wider"
            >
              {t.aboutLabel}
            </p>
          </div>
          <div className="lg:w-3/4">
            <h2 
              style={{ color: "var(--color-text)" }}
              className="text-3xl lg:text-4xl font-bold font-heading mb-4 leading-tight"
            >
              {t.aboutTitle}
            </h2>
            <p 
              style={{ color: "var(--color-text)" }}
              className="text-s font-semibold tracking-wide"
            >
              {t.aboutDesc1}
            </p>
          </div>
        </div>

        {/* Section 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
          {/* Image */}
          <div
            className="relative w-full h-[350px] lg:h-[400px] rounded-2xl shadow-lg overflow-hidden"
            data-aos="fade-right"
          >
            <img
              src={About1}
              alt="About Image 1"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Text */}
          <div
            className="space-y-4 pt-6 lg:pt-0 px-4 lg:px-0 lg:pl-12 max-w-xl break-words z-10"
            data-aos="fade-left"
          >
            <p 
              style={{ color: "var(--color-text)" }}
              className="text-base leading-relaxed"
            >
              {t.aboutDesc2}
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div
            className="space-y-4 pt-6 lg:pt-0 px-4 lg:px-0 lg:pr-12 max-w-xl break-words z-10 lg:order-1 order-2"
            data-aos="fade-right"
          >
            <p 
              style={{ color: "var(--color-text)" }}
              className="text-base leading-relaxed"
            >
              {t.aboutDesc3}
            </p>
          </div>

          {/* Image */}
          <div
            className="relative w-full h-[350px] lg:h-[400px] rounded-2xl shadow-lg overflow-hidden lg:order-2 order-1"
            data-aos="fade-left"
          >
            <img
              src={About2}
              alt="About Image 2"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;