import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

import BgJourney from "../../assets/company/Bg-Journey.png";
import Oj1 from "../../assets/company/Oj1.jpg";
import Oj2 from "../../assets/company/Oj2.png";
import Oj3 from "../../assets/company/Oj3.png";

const imageMap = { Oj1, Oj2, Oj3 };

const JourneyCard = ({ item, index }) => {
  const { ref, inView } = useInView({ triggerOnce: false });

  return (
    <div
      ref={ref}
      className={`transform transition duration-500 relative px-2 ${
        index === 1
          ? "scale-[1.25] lg:scale-[1.3] z-30 -translate-y-2"
          : "scale-95 z-10"
      }`}
      data-aos={item.aos} // ✅ animasi diambil dari translate.js
      data-aos-anchor-placement="top-bottom" // ✅ agar AOS tetap mendeteksi meski ada transform/scale
    >
      <div 
        style={{
          backgroundColor: "var(--color-journey-card-bg)",
          color: "var(--color-journey-card-text)"
        }}
        className="rounded-[2rem] overflow-hidden shadow-xl relative group hover:shadow-2xl"
      >
        <div className="w-full h-52 md:h-60 relative overflow-hidden">
          <img
            src={imageMap[item.img]}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover object-center rounded-t-[2rem]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-30 transition"></div>
        </div>
        <div className="p-6 text-center relative z-10">
          <h3 
            style={{ color: "var(--color-journey-card-text)" }}
            className="text-3xl font-bold"
          >
            {inView ? (
              <CountUp
                key={inView}
                end={parseInt(item.num)}
                duration={3}
                separator=""
              />
            ) : (
              "0"
            )}
          </h3>
          <p 
            style={{ color: "var(--color-journey-card-text)" }}
            className="font-semibold"
          >
            {item.title}
          </p>
          <p 
            style={{ color: "var(--color-journey-card-text)" }}
            className="text-sm mt-2"
          >
            {item.desc}
          </p>
        </div>
      </div>
    </div>
  );
};

const OurJourney = ({ t }) => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
    AOS.refresh(); // ✅ memastikan AOS refresh ulang setelah render
  }, []);

  return (
    <section
      id="our-journey"
      className="relative min-h-screen flex flex-col justify-between text-white pt-36 pb-24 bg-cover bg-center scroll-mt-36"
      style={{ backgroundImage: `url(${BgJourney})` }}
    >
      <div className="absolute inset-0 bg-black/30 z-0 backdrop-blur-sm" />
      <div className="absolute top-[-50px] left-[10%] w-72 h-72 bg-[#B7D6F2]/20 rounded-full animate-pulse-slow blur-3xl z-0" />
      <div className="absolute bottom-[-40px] right-[10%] w-60 h-60 bg-[#82A9DF]/20 rounded-full animate-pulse-slow blur-2xl z-0" />

      <div className="relative z-20">
        {/* Title */}
        <div
          className="mb-12 px-4 md:px-0 max-w-6xl mx-auto"
          data-aos="fade-up"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-left">
            {t.journeyTitle}
          </h2>
        </div>

        {/* Cards */}
        <div className="max-w-6xl mx-auto px-4 lg:px-6 grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-x-12 items-start">
          {t.journeyItems.map((item, i) => (
            <JourneyCard key={i} item={item} index={i} />
          ))}
        </div>

        {/* Description */}
        <div
          className="max-w-3xl mx-auto text-center mt-16 mb-10 px-4 z-20 relative"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="1000"
        >
          <p className="text-sm md:text-base leading-relaxed text-white">
            {t.journeyDesc}
          </p>
        </div>

        {/* Button */}
        <div
          className="text-center mt-2 md:mt-10 z-20 relative max-w-6xl mx-auto px-4 md:px-0"
          data-aos="fade-up"
          data-aos-delay="400"
          data-aos-duration="1200"
        >
          <Link to="/service" className="inline-block">
            <button 
              style={{
                backgroundColor: "var(--color-journey-button-bg)",
                transition: "all 0.3s"
              }}
              className="text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-warning cursor-pointer"
            >
              {t.journeyButton}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurJourney;