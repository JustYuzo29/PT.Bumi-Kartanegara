import React from "react";
import { Link } from "react-router-dom";
import HeroImage from "../../assets/company/Hero.png";

const Hero = () => (
  <section className="relative w-full h-screen pt-20">
    <img
      src={HeroImage}
      alt="hero background"
      className="absolute inset-0 w-full h-full object-cover z-0"
    />
    <div className="absolute inset-0 bg-black/70 z-10"></div>
    <div
      className="relative z-20 flex items-center h-full px-6 md:px-20"
      data-aos="fade-up"
    >
      <div className="max-w-xl text-white">
        <h1 className="text-xl md:text-4xl font-bold mb-4 leading-tight">
          PT. Bumi Kartanegara : <br />
          Membangun Infrastruktur dan Fondasi Kemajuan Nasional
        </h1>
        <p className="text-base md:text-lg mb-6">
          Menyediakan Solusi Komprehensif dalam bidang Kontruksi, dan Rekayasa
          Sipil
        </p>
        <Link to="/about">
          <button className="px-6 py-3 bg-navy hover:bg-warning rounded-full text-white font-semibold transition-all duration-300 cursor-pointer">
            SELENGKAPNYA →
          </button>
        </Link>
      </div>
    </div>
  </section>
);

export default Hero;
