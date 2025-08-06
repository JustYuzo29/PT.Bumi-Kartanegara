import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Wa from "../../assets/company/Whatsapp.png";
import Gmail from "../../assets/company/Gmail.png";

const Kontak = ({ t }) => {
  useEffect(() => {
    AOS.init({ duration: 800, once: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main
      className="min-h-screen font-body text-white overflow-hidden"
      style={{ backgroundColor: "var(--color-contact-bg)" }}
    >
      {/* Marquee Header */}
      <div
        className="w-full marquee py-3"
        style={{ backgroundColor: "var(--color-contact-marquee)" }}
      >
        <div className="marquee-content font-bold text-base md:text-lg tracking-wider">
          {(t.contactMarquee + " | ").repeat(100)}
        </div>
      </div>

      {/* Section Title */}
      <section className="text-center mt-20 md:mt-28 px-4" data-aos="fade-down">
        <h2 className="text-sm font-medium" style={{ color: "var(--color-text)" }}>
          {t.contactHeading}
        </h2>
        <h1 className="text-3xl md:text-4xl font-heading font-bold mt-1 text-white" style={{ color: "var(--color-text)" }}>
          {t.contactTitle}
        </h1>
        <p className="text-sm md:text-base mt-2 text-white" style={{ color: "var(--color-text)" }}>
          {t.contactIntro}
        </p>
      </section>

      {/* Kontak Cards */}
      <section className="flex flex-col md:flex-row items-center justify-center gap-10 mt-16 px-4">
        {/* WhatsApp Card */}
        <a
          href="https://wa.me/6282226677207?text=Halo%20saya%20ingin%20bertanya"
          target="_blank"
          rel="noopener noreferrer"
          className="w-[300px] rounded-default overflow-hidden shadow-elevated transform transition duration-300 hover:-translate-y-2 hover:shadow-xl"
          data-aos="fade-up"
        >
          <div
            className="h-44 flex items-center justify-center"
            style={{ backgroundColor: "var(--color-contact-card-top)" }}
          >
            <img src={Wa} alt="WhatsApp" className="h-16 w-16 object-contain" />
          </div>

          <div className="relative">
            <div
              className="absolute -top-6 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full shadow text-base font-bold z-10"
              style={{
                backgroundColor: "var(--color-contact-card-bottom)",
                color: "var(--color-text)",
              }}
            >
              {t.whatsappLabel}
            </div>

            <div
              className="pt-9 pb-6 text-center"
              style={{ backgroundColor: "var(--color-contact-card-bottom)", color: "var(--color-text)" }}
            >
              <p className="text-sm leading-relaxed px-4 line-clamp-3 break-words h-[96px] overflow-hidden mt-6">
                {t.whatsappDesc}
              </p>
            </div>
          </div>
        </a>

        {/* Gmail Card */}
        <a
          href="mailto:pt.bumikartanegaranew@gmail.com?subject=Pertanyaan%20dan%20Penawaran&body=Halo%20tim%20PT.%20Bumi%20Kartanegara%2C%20saya%20ingin%20bertanya%20tentang%20..."
          className="w-[300px] rounded-default overflow-hidden shadow-elevated transform transition duration-300 hover:-translate-y-2 hover:shadow-xl"
          data-aos="fade-up"
        >
          <div
            className="h-44 flex items-center justify-center"
            style={{ backgroundColor: "var(--color-contact-card-top)" }}
          >
            <img src={Gmail} alt="Gmail" className="h-16 w-16 object-contain" />
          </div>

          <div className="relative">
            <div
              className="absolute -top-6 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full shadow text-base font-bold z-10"
              style={{
                backgroundColor: "var(--color-contact-card-bottom)",
                color: "var(--color-text)",
              }}
            >
              {t.emailLabel}
            </div>

            <div
              className="pt-9 pb-6 text-center"
              style={{ backgroundColor: "var(--color-contact-card-bottom)", color: "var(--color-text)" }}
            >
              <p className="text-sm leading-relaxed px-4 line-clamp-3 break-words h-[96px] overflow-hidden mt-6">
                {t.emailDesc}
              </p>
            </div>
          </div>
        </a>
      </section>

      {/* Our Service */}
      <section className="mt-16 px-4 text-center" data-aos="zoom-in">
        <h2 className="text-lg font-bold font-heading mb-6 text-white" style={{ color: "var(--color-text)" }}>
          {t.ourServiceHeading}
        </h2>
        <div
          className="w-[630px] px-6 py-4 rounded-default shadow-elevated mx-auto"
          style={{ backgroundColor: "var(--color-contact-service)", color: "var(--color-card-text)" }}
        >
          <p className="text-sm leading-relaxed px-4 line-clamp-3 break-words h-[96px] overflow-hidden">
            {t.ourServiceDesc}
          </p>
        </div>
      </section>
    </main>
  );
};

export default Kontak;
