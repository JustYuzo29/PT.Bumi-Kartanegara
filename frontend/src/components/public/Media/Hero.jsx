import React from "react";
import BgImage from "../../../assets/company/Bg-Journey.png";

const Hero = ({ t }) => {
  return (
    <section className="relative w-full h-screen pt-20">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${BgImage})`,
          clipPath: "polygon(0 0, 100% 0, 100% 65%, 35% 100%, 0 65%)",
        }}
      >
        <div className="w-full h-full bg-black/70" />
      </div>

      {/* Content */}
      <div
        className="absolute left-0 w-full z-10 flex flex-col items-start justify-center text-white text-left px-6 md:px-24"
        style={{
          top: "50%",
          transform: "translateY(calc(-50% - 2.5rem))",
        }}
        data-aos="fade-up"
      >
        {/* FIX: Typo text-4x1 diubah menjadi text-4xl */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-xl leading-tight min-h-[110px] md:min-h-[140px]">
          {t.heroTitleLine1} <br /> {t.heroTitleLine2}
        </h1>
        <p className="text-lg max-w-lg">{t.heroSubtitle}</p>
      </div>
    </section>
  );
};

export default Hero;