import React from "react";

import BgContact from "../../../assets/company/Contact.png";
import MapOverlay from "../../../assets/company/Indonesia.png";

const Hero = ({ t }) => {
  return (
    <section
      className="relative w-full h-screen pt-20"
      aria-label="Contact Hero Section"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${BgContact})` }}
      ></div>

      {/* Overlay gelap */}
      <div className="absolute inset-0 bg-black/80 z-[1]" />

      {/* Konten teks dan peta */}
      <div className="relative z-[2] flex flex-col items-center justify-start h-full pt-28 md:pt-36 text-white text-center px-4">
        <div data-aos="fade-up" className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{t.heroTitle}</h1>
          <p className="text-sm md:text-base font-light">{t.heroSubtitle}</p>
        </div>

        {/* Peta Indonesia */}
        <img
          src={MapOverlay}
          alt="Peta Indonesia"
          className="w-[90%] md:w-[60%] mt-30 object-contain pointer-events-none"
          data-aos="fade-up"
        />
      </div>
    </section>
  );
};

export default Hero;