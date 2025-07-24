import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Alat1 from "../../assets/company/Bg-Journey.png";
import Alat2 from "../../assets/company/Oj2.png";

const Tools = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  return (
    <section className="w-full px-4 md:px-12 lg:px-16 min-h-screen pt-2 pb-12 flex flex-col items-center justify-center">
      {/* HEADER */}
      <div className="w-full max-w-[1100px] mb-10 -mt-6" data-aos="fade-up">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[#0B192C]">
          Solusi Terlengkap untuk Kebutuhan Alat Berat Proyek Anda
        </h2>
        <p className="text-base text-[#0B192C]">
          PT. Bumi Kartanegara menyediakan berbagai dukungan komprehensif untuk
          alat berat, meliputi penyewaan, perawatan, hingga penyediaan suku
          cadang. <br />
          Kami memastikan ketersediaan dan performa optimal peralatan untuk
          efisiensi di setiap proyek konstruksi
        </p>
      </div>

      {/* CARD CONTAINER */}
      <div className="w-full max-w-[1100px] space-y-6">
        {/* CARD 1 */}
        <div
          className="bg-warning rounded-xl shadow-md p-4 md:p-6 flex flex-col md:flex-row items-start gap-6"
          data-aos="fade-right"
        >
          <img
            src={Alat1}
            alt="Alat Berat 1"
            className="w-full max-w-[220px] md:max-w-[420px] h-auto object-cover rounded-xl"
          />
          <div className="md:w-1/2">
            <h3 className="text-lg font-extrabold mb-2 font-heading">
              Industri Pengolahan & Suplai Material Konstruksi
            </h3>
            <p className="text-sm font-semibold leading-tight break-words">
              Kami mengoperasikan industri pengolahan mortar atau beton siap
              pakai , <br />
              serta berperan sebagai pemasok material bangunan, memastikan
              kualitas dan ketersediaan pasokan penting untuk proyek Anda
            </p>
          </div>
        </div>

        {/* CARD 2 */}
        <div
          className="bg-warning rounded-xl shadow-md p-4 md:p-6 flex flex-col md:flex-row-reverse items-start gap-6"
          data-aos="fade-left"
        >
          <img
            src={Alat2}
            alt="Alat Berat 2"
            className="w-full max-w-[220px] md:max-w-[420px] h-auto object-cover rounded-xl"
          />
          <div className="md:w-1/2 text-right">
            <h3 className="text-lg font-extrabold mb-2 font-heading">
              Penyewaan, Pemeliharaan, dan Suku Cadang Alat Berat
            </h3>
            <p className="text-sm font-semibold leading-tight break-words">
              Menawarkan layanan penyewaan berbagai jenis alat berat , didukung
              oleh perawatan, pemeliharaan, dan perbaikan berkala , serta
              penyediaan suku cadang alat-alat berat untuk kinerja optimal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tools;
