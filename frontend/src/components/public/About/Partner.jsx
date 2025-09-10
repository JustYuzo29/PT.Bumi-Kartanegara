import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import BgPartner from "../../../assets/company/Oj2.png";
import Img1 from "../../../assets/company/Partner.jpg";
import ImgComingSoon from "../../../assets/company/HeroAbout.png";

const Partner = ({ t }) => {
  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  return (
    <section
      className="relative w-full min-h-screen px-4 md:px-12 lg:px-20 py-20 overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${BgPartner})` }}
    >
      {/* Overlay gelap agar teks terbaca */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      <div className="relative z-10">
        {/* Title */}
        <h2 className="text-white text-2xl md:text-3xl font-bold text-center mb-6">
          {t.partnerTitle}
        </h2>
        <p className="text-white text-center max-w-2xl mx-auto mb-12 text-sm md:text-base">
          {t.partnerDesc}
        </p>

        {/* Card 1 */}
        <div
          data-aos="fade-up"
          className="flex flex-col md:flex-row items-center rounded-3xl overflow-hidden shadow-lg mb-8 max-w-6xl mx-auto"
          style={{
            backgroundColor: "var(--color-partner-card)",
            color: "var(--color-text)",
          }}
        >
          <div className="w-full md:w-1/2 h-[230px]">
            <img
              src={Img1}
              alt={t.partner1Name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 p-6">
            <h3 className="text-lg md:text-xl font-bold mb-2">
              {t.partner1Name}
            </h3>
            <p className="text-sm md:text-base leading-relaxed">
              {t.partner1Desc}
            </p>
          </div>
        </div>

        {/* Card 2 - Coming Soon */}
        <div
          data-aos="fade-up"
          className="flex flex-col md:flex-row items-center bg-white/30 backdrop-blur-md rounded-3xl overflow-hidden shadow-inner border-2 border-dashed border-white max-w-6xl mx-auto"
        >
          <div className="relative w-full md:w-1/2 h-[230px]">
            <img
              src={ImgComingSoon}
              alt={t.partnerComingSoonTitle}
              className="w-full h-full object-cover"
            />
            {/* Overlay agar teks terlihat */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4 text-center">
              <span className="text-2xl md:text-3xl font-bold mb-2">
                {t.partnerComingSoon}
              </span>
              <p className="text-sm md:text-base italic opacity-90">
                {t.partnerComingSoonDesc}
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-6 text-center text-gray-100">
            <h3 className="text-lg md:text-xl font-bold mb-2">
              {t.partnerComingSoonTitle}
            </h3>
            <p className="text-sm md:text-base italic">
              {t.partnerComingSoonText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partner;