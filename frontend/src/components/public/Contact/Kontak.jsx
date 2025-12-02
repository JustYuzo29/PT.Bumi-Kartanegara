import React from "react";
import Wa from "../../../assets/company/Whatsapp.webp";
import Gmail from "../../../assets/company/Gmail.webp";

const Kontak = ({ t }) => {
  return (
    <section className="bg-theme font-body text-theme">
      {/* Marquee Header */}
      <div className="w-full bg-ocean marquee py-3">
        <div className="marquee-content text-white font-bold text-base md:text-lg tracking-wider">
          {(t.contactMarquee + " | ").repeat(20)}
        </div>
      </div>

      {/* Section Title */}
      <div className="text-center mt-20 md:mt-28 px-4" data-aos="fade-up">
        <h2 className="text-sm font-medium">{t.contactHeading}</h2>
        <h1 className="text-3xl md:text-4xl font-heading font-bold mt-1">
          {t.contactTitle}
        </h1>
        <p className="text-sm md:text-base mt-2">{t.contactIntro}</p>
      </div>

      {/* Kontak Cards */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mt-16 px-4">
        {/* WhatsApp Card */}
        <a
          href="https://wa.me/6282226677207?text=Halo%20saya%20ingin%20bertanya"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full max-w-[300px] rounded-default overflow-hidden shadow-elevated hover:shadow-xl smooth-render"
          data-aos="fade-up"
        >
          <div className="bg-navy h-44 flex items-center justify-center">
            <img src={Wa} alt="WhatsApp" className="h-16 w-16 object-contain" />
          </div>

          <div className="relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-warning px-6 py-2 rounded-full shadow text-base font-bold text-carbon z-10">
              {t.whatsappLabel}
            </div>

            <div className="bg-warning pt-9 pb-6 text-center text-carbon">
              <p className="text-sm leading-relaxed px-4 line-clamp-3 break-words h-[96px] overflow-hidden mt-6">
                {t.whatsappDesc}
              </p>
            </div>
          </div>
        </a>

        {/* Gmail Card */}
        <a
          href="mailto:pt.bumikartanegaranew@gmail.com?subject=Pertanyaan%20dan%20Penawaran&body=Halo%20tim%20PT.%20Bumi%20Kartanegara%2C%20saya%20ingin%20bertanya%20tentang%20..."
          className="w-full max-w-[300px] rounded-default overflow-hidden shadow-elevated hover:shadow-xl smooth-render"
          data-aos="fade-up"
        >
          <div className="bg-navy h-44 flex items-center justify-center">
            <img src={Gmail} alt="Gmail" className="h-16 w-16 object-contain" />
          </div>

          <div className="relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-warning px-6 py-2 rounded-full shadow text-base font-bold text-carbon z-10">
              {t.emailLabel}
            </div>

            <div className="bg-warning pt-9 pb-6 text-center text-carbon">
              <p className="text-sm leading-relaxed px-4 line-clamp-3 break-words h-[96px] overflow-hidden mt-6">
                {t.emailDesc}
              </p>
            </div>
          </div>
        </a>
      </div>

      {/* Our Service */}
      <div className="mt-16 mb-20 px-4 text-center" data-aos="fade-up">
        <h2 className="text-lg font-bold font-heading mb-6">
          {t.ourServiceHeading}
        </h2>
        <div className="w-full max-w-[630px] bg-navy text-white px-4 md:px-6 py-4 rounded-default shadow-elevated mx-auto">
          <p className="text-sm leading-relaxed px-2 md:px-4 line-clamp-3 break-words h-[96px] overflow-hidden">
            {t.ourServiceDesc}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Kontak;