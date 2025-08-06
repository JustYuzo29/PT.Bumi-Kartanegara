import React from "react";
import { Link } from "react-router-dom";
import HeroImage from "../../assets/company/Hero.png";

const Hero = ({ t }) => (
  <section className="relative w-full h-screen pt-20">
    <img
      src={HeroImage}
      alt="hero background"
      className="absolute inset-0 w-full h-full object-cover z-0"
    />
    <div className="absolute inset-0 bg-black/70 z-10"></div>
    <div
      className="relative z-20 flex items-center h-full px-6 md:px-20"
      data-aos="fade-up"
    >
      <div className="max-w-xl text-white">
        <h1 className="text-xl md:text-4xl font-bold mb-4 leading-tight min-h-[110px] md:min-h-[140px]">
          {t.heroTitleLine1} <br /> {t.heroTitleLine2}
        </h1>
        <p className="text-base md:text-lg mb-6">{t.heroSubtitle}</p>
        <Link to="/about">
          <button 
            style={{
              backgroundColor: "var(--color-ocean)",
              transition: "all 0.3s"
            }}
            className="px-6 py-3 hover:bg-warning rounded-full text-white font-semibold cursor-pointer"
          >
            {t.heroButton} →
          </button>
        </Link>
      </div>
    </div>
  </section>
);

export default Hero;