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
      className="relative w-full min-h-screen px-4 md:px-8 lg:px-20 py-12 md:py-16 lg:py-20 overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${BgPartner})` }}
    >
      {/* Overlay gelap agar teks terbaca */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      <div className="relative z-10">
        {/* Title */}
        <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">
          {t.partnerTitle}
        </h2>
        <p className="text-white text-center max-w-2xl mx-auto mb-8 md:mb-12 text-xs md:text-sm lg:text-base px-4">
          {t.partnerDesc}
        </p>

        {/* Card 1 */}
        <div
          data-aos="fade-up"
          className="flex flex-col md:flex-row items-center card-light backdrop-blur-lg rounded-2xl md:rounded-3xl overflow-hidden shadow-lg mb-6 md:mb-8 max-w-6xl mx-auto"
        >
          <div className="w-full md:w-1/2 h-[180px] md:h-[230px]">
            <img
              src={Img1}
              alt={t.partner1Name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 p-4 md:p-6">
            <h3 className="text-base md:text-lg lg:text-xl font-bold mb-2">
              {t.partner1Name}
            </h3>
            <p className="text-xs md:text-sm lg:text-base leading-relaxed">
              {t.partner1Desc}
            </p>
          </div>
        </div>

        {/* Card 2 - Coming Soon */}
        <div
          data-aos="fade-up"
          className="flex flex-col md:flex-row items-center card-partner backdrop-blur-md rounded-2xl md:rounded-3xl overflow-hidden shadow-inner border-2 border-dashed border-white max-w-6xl mx-auto"
        >
          <div className="relative w-full md:w-1/2 h-[180px] md:h-[230px]">
            <img
              src={ImgComingSoon}
              alt={t.partnerComingSoonTitle}
              className="w-full h-full object-cover"
            />
            {/* Overlay agar teks terlihat */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4 text-center">
              <span className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
                {t.partnerComingSoon}
              </span>
              <p className="text-xs md:text-sm lg:text-base italic opacity-90">
                {t.partnerComingSoonDesc}
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-4 md:p-6 text-center text-gray-100">
            <h3 className="text-base md:text-lg lg:text-xl font-bold mb-2">
              {t.partnerComingSoonTitle}
            </h3>
            <p className="text-xs md:text-sm lg:text-base italic">
              {t.partnerComingSoonText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partner;