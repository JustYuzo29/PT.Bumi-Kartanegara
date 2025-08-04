import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Bg from "../../assets/company/Oj1.jpg";
import Visi from "../../assets/company/About1.jpg";
import Misi from "../../assets/company/Bg-Journey.png";

const VM = ({ t }) => {
  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  return (
    <section className="relative w-full min-h-[130vh] px-4 md:px-12 lg:px-20 py-20 md:py-28 z-10 overflow-hidden">
      {/* Background Foto */}
      <div className="absolute inset-0 -z-10">
        <img src={Bg} alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="flex flex-col justify-center gap-10 md:gap-16 max-w-7xl mx-auto h-full">
        {/* VISI */}
        <div
          className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-10 flex flex-col md:flex-row gap-6 items-center"
          data-aos="fade-up"
        >
          <div className="w-full md:w-1/2">
            <img
              src={Visi}
              alt="Foto Visi"
              className="rounded-2xl object-cover w-full h-[300px]"
            />
          </div>
          <div className="w-full md:w-1/2 text-carbon dark:text-white">
            <h3 className="text-lg md:text-xl font-bold mb-3">{t.visiTitle}</h3>
            <p className="text-sm md:text-base leading-relaxed">{t.visiDesc}</p>
          </div>
        </div>

        {/* MISI */}
        <div
          className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-10 flex flex-col md:flex-row-reverse gap-6 items-center"
          data-aos="fade-up"
        >
          <div className="w-full md:w-1/2">
            <img
              src={Misi}
              alt="Foto Misi"
              className="rounded-2xl object-cover w-full h-[300px]"
            />
          </div>
          <div className="w-full md:w-1/2 text-carbon dark:text-white">
            <h3 className="text-lg md:text-xl font-bold mb-3">{t.misiTitle}</h3>
            <p className="text-sm md:text-base leading-relaxed">{t.misiDesc}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VM;