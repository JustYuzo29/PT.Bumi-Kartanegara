import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Wa from "../../assets/company/Whatsapp.png";
import Gmail from "../../assets/company/Gmail.png";

const Kontak = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-[var(--color-background)] font-body text-carbon overflow-hidden">
      {/* Marquee Header */}
      <div className="w-full bg-ocean marquee py-3">
        <div className="marquee-content text-white font-bold text-base md:text-lg tracking-wider">
          {"CONTACT US | ".repeat(100)}
        </div>
      </div>

      {/* Section Title */}
      <section className="text-center mt-20 md:mt-28 px-4" data-aos="fade-down">
        <h2 className="text-sm font-medium">CONTACT US</h2>
        <h1 className="text-3xl md:text-4xl font-heading font-bold mt-1">
          GET IN TOUCH
        </h1>
        <p className="text-sm md:text-base mt-2">
          Kami siap menjadi mitra terpercaya Anda dalam mewujudkan proyek-proyek
          penting. <br />
          Silakan hubungi tim kami melalui saluran komunikasi yang nyaman bagi
          Anda untuk pertanyaan atau kolaborasi.
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
          <div className="bg-ocean h-44 flex items-center justify-center">
            <img src={Wa} alt="WhatsApp" className="h-16 w-16 object-contain" />
          </div>

          <div className="relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-warning px-6 py-2 rounded-full shadow text-base font-bold text-carbon z-10">
              WhatsApp
            </div>

            <div className="bg-warning pt-9 pb-6 text-center">
              <p className="text-sm leading-relaxed px-4 line-clamp-3 break-words h-[96px] overflow-hidden mt-6">
                Layanan cepat WhatsApp
                <br />
                Hubungi kami langsung melalui pesan otomatis.
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
          <div className="bg-ocean h-44 flex items-center justify-center">
            <img src={Gmail} alt="Gmail" className="h-16 w-16 object-contain" />
          </div>

          <div className="relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-warning px-6 py-2 rounded-full shadow text-base font-bold text-carbon z-10">
              Email
            </div>

            <div className="bg-warning pt-9 pb-6 text-center">
              <p className="text-sm leading-relaxed px-4 line-clamp-3 break-words h-[96px] overflow-hidden mt-6">
                Informasi & Penawaran Via Email
                <br />
                Kirimkan pertanyaan, proposal, atau kebutuhan spesifik Anda.
              </p>
            </div>
          </div>
        </a>
      </section>

      {/* Our Service */}
      <section className="mt-16 px-4 text-center" data-aos="zoom-in">
        <h2 className="text-lg font-bold font-heading mb-6">OUR SERVICE</h2>
        <div className="w-[630px] bg-ocean text-white px-6 py-4 rounded-default shadow-elevated mx-auto">
          <p className="text-sm leading-relaxed px-4 line-clamp-3 break-words h-[96px] overflow-hidden">
            PT. Bumi Kartanegara adalah spesialis dalam Jasa Konstruksi,
            Rekayasa Sipil, Suplai Material, Aktivitas Penyewaan alat berat dan
            transportasi. Kami berkomitmen pada kualitas, efisiensi, dan
            kepuasan pelanggan dengan slogan SQQ.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Kontak;
