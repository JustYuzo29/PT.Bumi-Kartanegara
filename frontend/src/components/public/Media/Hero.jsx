import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import BgImage from "../../../assets/company/Bg-Journey.png";

const Hero = ({ t }) => {
  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
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

      {/* Konten teks di kiri, sedikit naik, dengan animasi */}
      <div
        className="relative z-10 flex flex-col items-start justify-center h-full text-white text-left px-6 md:px-24 -translate-y-10"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="200"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-xl leading-tight min-h-[110px] md:min-h-[140px]">
          {t.heroTitleLine1} <br /> {t.heroTitleLine2}
        </h1>
        <p className="text-lg max-w-lg">{t.heroSubtitle}</p>
      </div>
    </section>
  );
};

export default Hero;