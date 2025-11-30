import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Alat1 from "../../../assets/company/Bg-Journey.png";
import Alat2 from "../../../assets/company/Oj2.png";

const Tools = ({ t }) => {
  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  return (
    <section
      className="w-full px-4 md:px-12 lg:px-16 pt-12 pb-12 flex flex-col items-center transition-colors duration-300"
      style={{
        backgroundColor: "var(--color-pages)",
        color: "var(--color-text)",
      }}
    >
      {/* HEADER */}
      <div className="w-full max-w-[1100px] mb-10" data-aos="fade-up">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">{t.toolsTitle}</h2>
        <p className="text-base leading-relaxed">{t.toolsDescription}</p>
      </div>

      {/* CARD CONTAINER */}
      <div className="w-full max-w-[1100px] space-y-6">
        {/* CARD 1 */}
        <div
          className="rounded-xl shadow-md p-4 md:p-6 flex flex-col md:flex-row items-start gap-6 transition-colors duration-300"
          style={{
            backgroundColor: "var(--color-card-ser)",
            color: "var(--color-card-text)",
          }}
          data-aos="fade-right"
        >
          <img
            src={Alat1}
            alt="Alat Berat 1"
            className="w-full max-w-[220px] md:max-w-[420px] h-auto object-cover rounded-xl"
          />
          <div className="md:w-1/2">
            <h3 className="text-lg font-extrabold mb-3 font-heading">
              {t.toolsCard1Title}
            </h3>
            <p className="text-sm leading-relaxed break-words">
              {t.toolsCard1Desc}
            </p>
          </div>
        </div>

        {/* CARD 2 */}
        <div
          className="rounded-xl shadow-md p-4 md:p-6 flex flex-col md:flex-row-reverse items-start gap-6 transition-colors duration-300"
          style={{
            backgroundColor: "var(--color-card-ser)",
            color: "var(--color-card-text)",
          }}
          data-aos="fade-left"
        >
          <img
            src={Alat2}
            alt="Alat Berat 2"
            className="w-full max-w-[220px] md:max-w-[420px] h-auto object-cover rounded-xl"
          />
          <div className="md:w-1/2">
            <h3 className="text-lg font-extrabold mb-3 font-heading">
              {t.toolsCard2Title}
            </h3>
            <p className="text-sm leading-relaxed break-words">
              {t.toolsCard2Desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tools;