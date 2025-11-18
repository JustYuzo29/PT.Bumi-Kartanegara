import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Partner from "../../../assets/company/Partner.jpg";
import About1 from "../../../assets/company/About1.jpg";
import About2 from "../../../assets/company/About2.png";
import Oj1 from "../../../assets/company/Oj1.jpg";
import GalleryImg from "../../../assets/company/Gallery.png";
import Oj3 from "../../../assets/company/Oj3.png";

const images = [Partner, About1, About2, Oj1, GalleryImg, Oj3];

const arrowClipTop = "polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)";
const arrowClipBottom = "polygon(0% 0%, 80% 0%, 100% 100%, 20% 100%)";

const GalleryArrowShape = ({ t }) => {
  useEffect(() => {
    AOS.init({ once: false, duration: 800 });
  }, []);

  const topRow = images.slice(0, 3);
  const bottomRow = images.slice(3, 6);

  const renderRow = (imgs, isTop) => (
    <div className="flex justify-center gap-0">
      {imgs.map((img, i) => (
        <div
          key={i}
          className="w-99 h-70 overflow-hidden relative shadow-lg cursor-pointer"
          style={{
            clipPath: isTop ? arrowClipTop : arrowClipBottom,
            WebkitClipPath: isTop ? arrowClipTop : arrowClipBottom,
          }}
          data-aos="zoom-in"
          data-aos-delay={i * 100}
        >
          <img
            src={img}
            alt={`Gallery ${i + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
      ))}
    </div>
  );

  return (
    <section
      className="py-12 bg-theme text-theme flex justify-center px-0 relative min-h-[500px] mt-32 transition-colors duration-300"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      {/* Teks di kanan atas */}
      <div className="absolute top-0 right-10 max-w-sm text-right z-10 mb-40">
        <h2
          className="text-4xl font-bold mb-4"
          data-aos="fade-down"
          data-aos-delay="100"
        >
          {t.galleryTitle}
        </h2>
        <p
          className="text-sm leading-relaxed mt-4"
          data-aos="fade-down"
          data-aos-delay="200"
        >
          {t.galleryDescription}
        </p>
      </div>

      {/* Galeri */}
      <div className="flex flex-col justify-center gap-6 mb-12 z-0 mt-40">
        {renderRow(topRow, true)}
        {renderRow(bottomRow, false)}
      </div>
    </section>
  );
};

export default GalleryArrowShape;
