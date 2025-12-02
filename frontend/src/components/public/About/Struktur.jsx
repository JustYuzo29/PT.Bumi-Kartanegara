import React, { useEffect, useContext } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { LanguageContext } from "../../../locales/language";
import { aboutTranslations } from "../../../locales/about";

import Struktur0 from "../../../assets/company/Struktur0.webp";
import Struktur1 from "../../../assets/company/Struktur1.webp";
import Struktur2 from "../../../assets/company/Struktur2.webp";
import Struktur3 from "../../../assets/company/Struktur3.webp";

const Struktur = () => {
  const { language } = useContext(LanguageContext);
  const t = aboutTranslations[language];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    AOS.init({ once: false, duration: 800, offset: 200 });
  }, []);

  return (
    <section className="relative z-20 bg-struktur text-white pb-20 md:pb-40 overflow-hidden rounded-t-[40px] -mt-[80px]">
      <div className="absolute inset-0 bg-struktur" />
      <div className="absolute top-0 left-0 w-1/2 h-[120px] bg-struktur rounded-b-full -translate-x-1/4 z-0" />
      <div className="absolute top-0 right-0 w-1/2 h-[120px] bg-struktur rounded-b-full translate-x-1/4 z-0" />

      <div className="relative z-10 pt-12 md:pt-16">
        {/* Title */}
        <div
          className="text-center text-white space-y-3 md:space-y-4 mb-12 md:mb-16 px-4"
          data-aos="fade-down"
        >
          <h3 className="font-semibold text-sm md:text-base tracking-wide">
            {t.strukturTitle}
          </h3>
          <p className="text-xs md:text-sm max-w-2xl mx-auto">
            {t.strukturDesc}
          </p>
        </div>

        {/* Container semua node */}
        <div className="flex flex-col items-center relative space-y-8 md:space-y-14">
          <div className="absolute top-[100px] md:top-[120px] h-[300px] md:h-[400px] w-[2px] struktur-line z-0" />

          {/* Direktur Utama */}
          <div data-aos="zoom-in" className="relative z-10">
            <div className="struktur-card rounded-lg md:rounded-xl p-3 md:p-4 shadow-md w-[120px] md:w-[150px] text-center">
              <img
                src={Struktur0}
                alt={t.strukturNodes.direkturUtama.nama}
                className="w-full h-[120px] md:h-[150px] object-cover rounded-md mb-2"
              />
              <h3 className="font-semibold text-xs md:text-sm">
                {t.strukturNodes.direkturUtama.jabatan}
              </h3>
              <p className="text-[10px] md:text-xs">{t.strukturNodes.direkturUtama.nama}</p>
            </div>
          </div>

          {/* Garis horizontal */}
          <div className="flex justify-center items-center relative z-0">
            <div className="w-[200px] md:w-[300px] h-[2px] struktur-line" />
          </div>

          {/* Komisaris & Operasional */}
          <div className="flex justify-center items-start gap-8 md:gap-32 z-10">
            <div data-aos="fade-right">
              <div className="struktur-card rounded-lg md:rounded-xl p-3 md:p-4 shadow-md w-[120px] md:w-[150px] text-center">
                <img
                  src={Struktur2}
                  alt={t.strukturNodes.direktur.nama}
                  className="w-full h-[120px] md:h-[150px] object-cover rounded-md mb-2"
                />
                <h3 className="font-semibold text-xs md:text-sm">
                  {t.strukturNodes.direktur.jabatan}
                </h3>
                <p className="text-[10px] md:text-xs">{t.strukturNodes.direktur.nama}</p>
              </div>
            </div>

            <div data-aos="fade-left">
              <div className="struktur-card rounded-lg md:rounded-xl p-3 md:p-4 shadow-md w-[120px] md:w-[150px] text-center">
                <img
                  src={Struktur1}
                  alt={t.strukturNodes.operasional.nama}
                  className="w-full h-[120px] md:h-[150px] object-cover rounded-md mb-2"
                />
                <h3 className="font-semibold text-xs md:text-sm">
                  {t.strukturNodes.operasional.jabatan}
                </h3>
                <p className="text-[10px] md:text-xs">{t.strukturNodes.operasional.nama}</p>
              </div>
            </div>
          </div>

          <div className="w-[280px] md:w-[500px] h-[2px] struktur-line mx-auto mt-6 md:mt-10 z-0" />

          {/* Divisi */}
          <div
            className="flex flex-wrap justify-center gap-3 md:gap-6 max-w-4xl z-10 px-4"
            data-aos="fade-up"
          >
            {t.strukturNodes.divisi.map((item, idx) => (
              <div
                key={idx}
                className="struktur-card rounded-lg md:rounded-xl p-3 md:p-4 shadow-md w-[100px] md:w-[130px] text-center"
              >
                <img
                  src={Struktur3}
                  alt={item.nama}
                  className="w-full h-[100px] md:h-[120px] object-cover rounded-md mb-2"
                />
                <h3 className="font-semibold text-xs md:text-sm">{item.bagian}</h3>
                <p className="text-[10px] md:text-xs">{item.nama}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Struktur;