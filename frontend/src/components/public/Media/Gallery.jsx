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
    <div className="flex justify-center gap-0 flex-wrap md:flex-nowrap w-full">
      {imgs.map((img, i) => (
        <div
          key={i}
          className="w-32 h-24 sm:w-40 sm:h-28 md:w-99 md:h-70 overflow-hidden relative shadow-lg cursor-pointer flex-shrink-0"
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
      className="py-12 bg-[var(--color-pages)] text-[var(--color-text)] flex justify-center px-4 md:px-0 relative min-h-[500px] mt-20 md:mt-32 transition-colors duration-300 w-full"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      {/* Teks di kanan atas */}
      <div className="absolute top-0 right-4 md:right-10 max-w-xs md:max-w-sm text-right z-10 mb-20 md:mb-40">
        <h2
          className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-[var(--color-text)]"
          data-aos="fade-down"
          data-aos-delay="100"
        >
          {t.galleryTitle}
        </h2>
        <p
          className="text-xs md:text-sm leading-relaxed text-[var(--color-text)] mt-2 md:mt-4"
          data-aos="fade-down"
          data-aos-delay="200"
        >
          {t.galleryDescription}
        </p>
      </div>

      {/* Galeri */}
      <div className="flex flex-col justify-center gap-3 md:gap-6 mb-12 z-0 mt-24 md:mt-40 w-full max-w-full">
        {renderRow(topRow, true)}
        {renderRow(bottomRow, false)}
      </div>
    </section>
  );
};

export default GalleryArrowShape;
