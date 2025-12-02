import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Bg from "../../../assets/company/Oj1.webp";
import Visi from "../../../assets/company/About1.webp";
import Misi from "../../../assets/company/Bg-Journey.webp";

const VM = ({ t }) => {
  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  return (
    <section className="relative w-full min-h-screen md:min-h-[130vh] px-4 md:px-12 lg:px-20 py-12 md:py-20 lg:py-28 z-10 overflow-hidden">
      {/* Background Foto */}
      <div className="absolute inset-0 -z-10">
        <img src={Bg} alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="flex flex-col justify-center gap-6 md:gap-10 lg:gap-16 max-w-7xl mx-auto h-full">
        {/* VISI */}
        <div
          className="card-light backdrop-blur-lg rounded-2xl md:rounded-3xl shadow-2xl p-4 md:p-6 lg:p-10 flex flex-col md:flex-row gap-4 md:gap-6 items-center"
          data-aos="fade-up"
        >
          <div className="w-full md:w-1/2">
            <img
              src={Visi}
              alt="Foto Visi"
              className="rounded-xl md:rounded-2xl object-cover w-full h-[200px] md:h-[250px] lg:h-[300px]"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-base md:text-lg lg:text-xl font-bold mb-2 md:mb-3">{t.visiTitle}</h3>
            <p className="text-xs md:text-sm lg:text-base leading-relaxed">{t.visiDesc}</p>
          </div>
        </div>

        {/* MISI */}
        <div
          className="card-light backdrop-blur-lg rounded-2xl md:rounded-3xl shadow-2xl p-4 md:p-6 lg:p-10 flex flex-col md:flex-row-reverse gap-4 md:gap-6 items-center"
          data-aos="fade-up"
        >
          <div className="w-full md:w-1/2">
            <img
              src={Misi}
              alt="Foto Misi"
              className="rounded-xl md:rounded-2xl object-cover w-full h-[200px] md:h-[250px] lg:h-[300px]"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-base md:text-lg lg:text-xl font-bold mb-2 md:mb-3">{t.misiTitle}</h3>
            <p className="text-xs md:text-sm lg:text-base leading-relaxed">{t.misiDesc}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VM;