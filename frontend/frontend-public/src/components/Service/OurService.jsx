import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  WrenchScrewdriverIcon,
  TruckIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/solid";

import Img1 from "../../assets/company/HeroAbout.png";
import Img2 from "../../assets/company/Gallery.png";
import Img3 from "../../assets/company/Oj2.png";

const services = [
  {
    title: "Jasa Konstruksi Komprehensif",
    image: Img1,
    description:
      "Meliputi pembangunan berbagai jenis gedung hunian, perkantoran, industri, serta infrastruktur sipil seperti jalan dan jembatan, didukung instalasi teknikal yang presisi. ",
    icon: <WrenchScrewdriverIcon className="w-8 h-8 text-black" />,
  },
  {
    title: "Pengadaan Material & Industri Pengolahan",
    image: Img2,
    description:
      "Kami menyediakan suplai material konstruksi beragam, melakukan perdagangan besar berbagai produk, serta memproduksi mortar dan beton siap pakai berkualitas tinggi.",
    icon: <TruckIcon className="w-8 h-8 text-black" />,
  },
  {
    title: "Layanan Penunjang & Sewa Peralatan ",
    image: Img3,
    description:
      "Menawarkan aktivitas penyewaan alat transportasi darat dan berat, penyediaan sumber daya manusia, serta berbagai jasa penunjang lainnya untuk optimalisasi proyek Anda",
    icon: <BuildingOffice2Icon className="w-8 h-8 text-black" />,
  },
];

const OurService = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <section
      id="our-service"
      className="min-h-[115vh] w-full bg-white pt-40 pb-32 px-6 md:px-12 flex flex-col items-center"
    >
      {/* TEKS SECTION */}
      <div className="text-center" data-aos="fade-down">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">OUR SERVICES</h2>
        <p className="text-sm md:text-base text-gray-600 mb-2">
          Solusi Konstruksi dan Pasokan Terintegrasi untuk Kebutuhan Pembangunan
          Anda
        </p>
        <p className="text-sm text-gray-500 max-w-3xl mx-auto">
          PT. Bumi Kartanegara menawarkan layanan ahli di bidang konstruksi,
          rekayasa sipil, serta pengadaan material dan peralatan. <br />
          Kami berkomitmen untuk memberikan kualitas terbaik dan inovasi dalam
          setiap aspek pekerjaan kami, mendukung terwujudnya infrastruktur yang
          kuat dan berkelanjutan di Indonesia.
        </p>
      </div>

      {/* CARD SECTION */}
      <div className="flex flex-wrap justify-center gap-6 mt-40">
        {services.map((item, i) => (
          <div
            key={i}
            className="w-[360px] rounded-xl shadow-md bg-white overflow-hidden flex flex-col"
            data-aos="zoom-in"
            data-aos-delay={i * 200}
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-52 object-cover"
              />

              {/* ICON CENTER */}
              <div className="absolute left-1/2 bottom-[-32px] transform -translate-x-1/2 z-10">
                <div className="w-16 h-16 bg-white rounded-full border-4 border-white flex items-center justify-center shadow-md">
                  <div className="text-black text-2xl">{item.icon}</div>
                </div>
              </div>
            </div>

            {/* ISI CARD */}
            <div className="bg-[#0b192c] text-white px-6 pt-16 pb-10 text-center rounded-b-xl grow min-h-[190px] flex flex-col justify-center">
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
