import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import BgPartner from "../../assets/company/Oj2.png";
import Img1 from "../../assets/company/Partner.jpg";
import ImgComingSoon from "../../assets/company/HeroAbout.png";

const Partner = () => {
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
          PARTNER
        </h2>
        <p className="text-white text-center max-w-2xl mx-auto mb-12 text-sm md:text-base">
          Berikut adalah mitra strategis kami dalam mendukung berbagai proyek
          konstruksi dan infrastruktur.
        </p>

        {/* Card 1 */}
        <div
          data-aos="fade-up"
          className="flex flex-col md:flex-row items-center bg-white/90 backdrop-blur-lg rounded-3xl overflow-hidden shadow-lg mb-8 max-w-6xl mx-auto"
        >
          <div className="w-full md:w-1/2 h-[230px]">
            <img
              src={Img1}
              alt="PT. LOREM IPSUM"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 p-6 text-carbon">
            <h3 className="text-lg md:text-xl font-bold mb-2">
              PT.NATIPA MITRA LOGISTIK
            </h3>
            <p className="text-sm md:text-base leading-relaxed">
              PT. Natipa Mitra Logistik adalah Perusahaan Bongkar Muat (PBM)
              yang menjadi mitra strategis kami dalam memastikan kelancaran
              rantai pasok dan efisiensi operasional. Kolaborasi ini memperkuat
              kemampuan logistik kami untuk mendukung proyek-proyek besar di
              berbagai sektor.
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
              alt="Coming Soon"
              className="w-full h-full object-cover"
            />
            {/* Overlay agar teks terlihat */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4 text-center">
              <span className="text-2xl md:text-3xl font-bold mb-2">
                🚧 Coming Soon
              </span>
              <p className="text-sm md:text-base italic opacity-90">
                Partner strategis baru sedang kami persiapkan!
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-6 text-center text-gray-100">
            <h3 className="text-lg md:text-xl font-bold mb-2">
              Partner Baru Segera Hadir
            </h3>
            <p className="text-sm md:text-base italic">
              Kami sedang dalam proses kerja sama dengan mitra strategis baru.
              Stay tuned!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partner;
