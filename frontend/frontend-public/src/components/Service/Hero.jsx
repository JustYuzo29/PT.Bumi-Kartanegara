import React, { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import HeroImg from "../../assets/company/About3.png";

const Hero = () => {
  useEffect(() => {
    AOS.init({ once: false, duration: 1000 });
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div
        className="relative h-screen w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${HeroImg})`,
          backgroundPosition: "center 10%",
          backgroundSize: "cover",
        }}
      >
        {/* Overlay Hitam Transparan */}
        <div className="absolute inset-0 bg-black/70 z-0"></div>

        {/* Konten teks */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-white text-center z-10 px-4"
          data-aos="fade-up"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            OUR SERVICES
          </h1>
          <p className="text-xl md:text-2xl font-light mb-2 font-semibold mt-12">
            Solusi Konstruksi dan Pasokan Terintegrasi untuk Kebutuhan
            Pembangunan Anda
          </p>
          <p className="text-base md:text-lg leading-relaxed">
            PT. Bumi Kartanegara menawarkan beragam layanan ahli di bidang 
            konstruksi, rekayasa sipil, serta pengadaan material dan peralatan. <br />
            Kami berkomitmen untuk memberikan kualitas terbaik dan inovasi dalam
            setiap aspek pekerjaan kami.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
