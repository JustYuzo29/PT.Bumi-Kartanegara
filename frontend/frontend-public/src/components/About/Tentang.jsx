import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import AboutImage from "../../assets/company/About3.png";

const Tentang = ({ t }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    AOS.init({
      once: false,
      duration: 800,
      offset: 200,
    });
  }, []);

  return (
    <section className="relative z-10 bg-white dark:bg-[var(--color-background)] overflow-hidden min-h-screen flex items-center">
      {/* Background kuning bawah */}
      <div className="absolute bottom-0 left-0 w-full h-[450px] bg-[var(--color-warning)] z-0 rounded-t-[40px]" />

      <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto py-12 md:py-20 w-full">
        <div className="space-y-6 text-carbon dark:text-white text-center md:text-left">
          <h3
            className="font-semibold text-sm md:text-base tracking-wide"
            data-aos="fade-up"
            data-aos-delay="50"
          >
            {t.tentangLabel}
          </h3>
          <h1
            className="text-2xl md:text-4xl font-bold leading-snug"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {t.tentangTitle}
          </h1>
        </div>

        {/* Grid gambar dan card */}
        <div className="w-full flex justify-center">
          <div className="relative flex flex-col md:flex-row items-start gap-4 mt-16 w-full max-w-[90rem] px-4 md:px-8">
            {/* Gambar */}
            <img
              src={AboutImage}
              alt="Foto PT Bumi Kartanegara"
              className="rounded-[18px] shadow-lg w-full md:w-[70%] h-[520px] object-cover"
              data-aos="fade-right"
            />

            {/* Card biru */}
            <div
              className="bg-ocean text-white px-6 py-8 w-full md:w-[350px] h-[520px] 
              rounded-2xl shadow-lg overflow-hidden break-words text-wrap"
              data-aos="fade-left"
            >
              <h3 className="font-semibold text-sm md:text-base mb-2 leading-tight">
                {t.tentangTitle}
              </h3>
              <p className="text-sm leading-relaxed">{t.tentangDesc1}</p>
              <p className="text-sm leading-relaxed mt-2">{t.tentangDesc2}</p>
              <p className="text-sm leading-relaxed mt-2">{t.tentangDesc3}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tentang;