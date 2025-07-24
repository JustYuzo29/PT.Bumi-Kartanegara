import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Struktur0 from "../../assets/company/Struktur0.jpg";
import Struktur1 from "../../assets/company/Struktur1.jpg";
import Struktur2 from "../../assets/company/Struktur2.jpg";
import Struktur3 from "../../assets/company/Struktur3.jpg";

const Struktur = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    AOS.init({
      once: false,
      duration: 800,
      offset: 200,
    });
  }, []);

  return (
    <section className="relative z-20 bg-[#2f2f2f] text-white pb-40 overflow-hidden rounded-t-[40px] -mt-[80px]">
      {/* Background dengan lingkaran-lingkaran dekoratif */}
      <div className="absolute inset-0 bg-[#2f2f2f]" />

      {/* Background abu dengan sisi atas melengkung kiri dan kanan */}
      <div className="absolute top-0 left-0 w-1/2 h-[120px] bg-[#2f2f2f] rounded-b-full -translate-x-1/4 z-0" />
      <div className="absolute top-0 right-0 w-1/2 h-[120px] bg-[#2f2f2f] rounded-b-full translate-x-1/4 z-0" />

      <div className="relative z-10 pt-16">
        <div
          className="text-center text-white space-y-4 mb-16 px-4"
          data-aos="fade-down"
        >
          <h3 className="font-semibold text-sm md:text-base tracking-wide">
            Struktur Manajemen PT. Bumi Kartanegara
          </h3>
          <p className="text-xs md:text-sm max-w-2xl mx-auto">
            Struktur organisasi ini mencerminkan pembagian tugas yang jelas dan
            efisien dalam mendukung operasional PT. Bumi Kartanegara.
          </p>
        </div>
        {/* Container semua node */}
        <div className="flex flex-col items-center relative space-y-14">
          {/* Garis Vertikal */}
          <div className="absolute top-[120px] h-[400px] w-[2px] bg-white z-0" />

          {/* Direktur Utama */}
          <div data-aos="zoom-in" className="relative z-10">
            <div className="bg-white text-black rounded-xl p-4 shadow-md w-[150px] text-center">
              <img
                src={Struktur0}
                alt="Direktur Utama"
                className="w-full h-[150px] object-cover rounded-md mb-2"
              />
              <h3 className="font-semibold text-sm">Direktur Utama</h3>
              <p className="text-xs">ARIF</p>
            </div>
          </div>

          {/* Garis horizontal ke komisaris & operasional */}
          <div className="flex justify-center items-center relative z-0">
            <div className="w-[300px] h-[2px] bg-white" />
          </div>

          {/* Komisaris & Operasional */}
          <div className="flex justify-center items-start gap-32 z-10">
            <div data-aos="fade-right">
              <div className="bg-white text-black rounded-xl p-4 shadow-md w-[150px] text-center">
                <img
                  src={Struktur2}
                  alt="Direktur"
                  className="w-full h-[150px] object-cover rounded-md mb-2"
                />
                <h3 className="font-semibold text-sm">Direktur</h3>
                <p className="text-xs">A. KELAWING BAYAU, S.Pd M.A.P</p>
              </div>
            </div>
            <div data-aos="fade-left">
              <div className="bg-white text-black rounded-xl p-4 shadow-md w-[150px] text-center">
                <img
                  src={Struktur1}
                  alt="KA Operasional"
                  className="w-full h-[150px] object-cover rounded-md mb-2"
                />
                <h3 className="font-semibold text-sm">KA. Operasional</h3>
                <p className="text-xs">AW. AVRIL RINDRA PRATAMA</p>
              </div>
            </div>
          </div>

          {/* Garis horizontal ke bawah divisi */}
          <div className="w-[500px] h-[2px] bg-white mx-auto mt-10 z-0" />

          {/* Divisi bawah */}
          <div
            className="flex flex-wrap justify-center gap-6 max-w-4xl z-10"
            data-aos="fade-up"
          >
            {[
              {
                bagian: "Teknik SDA",
                nama: "DELLA APRILLA, ST",
                foto: Struktur3,
              },
              {
                bagian: "Teknik Jalan",
                nama: "WIRANDA DWIYANTI, ST",
                foto: Struktur3,
              },
              {
                bagian: "Ahli K3",
                nama: "RENGGHA AGUM PERDANA, ST",
                foto: Struktur3,
              },
              {
                bagian: "Petugas K3",
                nama: "JUMAIDI, ST",
                foto: Struktur3,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white text-black rounded-xl p-4 shadow-md w-[130px] text-center"
              >
                <img
                  src={item.foto}
                  alt={item.nama}
                  className="w-full h-[120px] object-cover rounded-md mb-2"
                />
                <h3 className="font-semibold text-sm">{item.bagian}</h3>
                <p className="text-xs">{item.nama}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Struktur;
