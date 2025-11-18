import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  WrenchScrewdriverIcon,
  TruckIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/solid";

import Img1 from "../../../assets/company/HeroAbout.png";
import Img2 from "../../../assets/company/Gallery.png";
import Img3 from "../../../assets/company/Oj2.png";

const OurService = ({ t }) => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  const services = [
    {
      title: t.serviceCard1Title,
      image: Img1,
      description: t.serviceCard1Desc,
      icon: (
        <WrenchScrewdriverIcon className="w-8 h-8 text-[var(--color-icon)]" />
      ),
    },
    {
      title: t.serviceCard2Title,
      image: Img2,
      description: t.serviceCard2Desc,
      icon: <TruckIcon className="w-8 h-8 text-[var(--color-icon)]" />,
    },
    {
      title: t.serviceCard3Title,
      image: Img3,
      description: t.serviceCard3Desc,
      icon: (
        <BuildingOffice2Icon className="w-8 h-8 text-[var(--color-icon)]" />
      ),
    },
  ];

  return (
    <section
      id="our-service"
      className="min-h-[115vh] w-full pt-40 pb-32 px-6 md:px-12 flex flex-col items-center transition-colors duration-300"
      style={{
        backgroundColor: "var(--color-pages)",
        color: "var(--color-text)",
      }}
    >
      {/* TEKS SECTION */}
      <div className="text-center" data-aos="fade-down">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          {t.ourServiceTitle}
        </h2>
        <p className="text-sm md:text-base mb-2">{t.ourServiceSubtitle}</p>
        <p className="text-sm max-w-3xl mx-auto">{t.ourServiceDescription}</p>
      </div>

      {/* CARD SECTION */}
      <div className="flex flex-wrap justify-center gap-6 mt-40 px-4">
        {services.map((item, i) => (
          <div
            key={i}
            className="w-full max-w-[360px] rounded-xl shadow-md overflow-hidden flex flex-col transition-colors duration-300"
            style={{
              backgroundColor: "var(--color-card-bg)",
            }}
            data-aos="zoom-in"
            data-aos-delay={i * 200}
          >
            {/* Gambar + Icon */}
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[200px] md:h-[240px] object-cover object-center"
              />

              <div className="absolute left-1/2 bottom-[-32px] transform -translate-x-1/2 z-10">
                <div
                  className="w-16 h-16 rounded-full border-4 flex items-center justify-center shadow-md transition-colors duration-300"
                  style={{
                    backgroundColor: "var(--color-icon-bg)",
                    borderColor: "var(--color-icon-bg)",
                  }}
                >
                  {item.icon}
                </div>
              </div>
            </div>

            {/* Isi Kartu */}
            <div
              className="px-6 pt-16 pb-10 text-center rounded-b-xl grow min-h-[190px] flex flex-col justify-center transition-colors duration-300"
              style={{ color: "var(--color-card-text)" }}
            >
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurService;