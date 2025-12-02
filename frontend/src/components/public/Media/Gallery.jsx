import React from "react";

import Partner from "../../../assets/company/Partner.webp";
import About1 from "../../../assets/company/About1.webp";
import About2 from "../../../assets/company/About2.webp";
import Oj1 from "../../../assets/company/Oj1.webp";
import GalleryImg from "../../../assets/company/Gallery.webp";
import Oj3 from "../../../assets/company/Oj3.webp";

const images = [Partner, About1, About2, Oj1, GalleryImg, Oj3];

const arrowClipTop = "polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)";
const arrowClipBottom = "polygon(0% 0%, 80% 0%, 100% 100%, 20% 100%)";

const GalleryArrowShape = ({ t }) => {
  const topRow = images.slice(0, 3);
  const bottomRow = images.slice(3, 6);

  const renderRow = (imgs, isTop) => (
    <div className="flex justify-center gap-0 px-4 md:px-0">
      {imgs.map((img, i) => (
        <div
          key={i}
          className="w-24 md:w-32 lg:w-40 xl:w-99 h-48 md:h-56 lg:h-64 xl:h-70 overflow-hidden relative shadow-lg cursor-pointer flex-shrink-0 smooth-render"
          style={{
            clipPath: isTop ? arrowClipTop : arrowClipBottom,
            WebkitClipPath: isTop ? arrowClipTop : arrowClipBottom,
          }}
          data-aos="fade-up"
        >
          <img
            src={img}
            alt={`Gallery ${i + 1}`}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110 smooth-render"
          />
        </div>
      ))}
    </div>
  );

  return (
    <section className="py-20 bg-theme text-theme">
      {/* Teks Header */}
      <div className="text-center mb-12 px-4" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {t.galleryTitle}
        </h2>
        <p className="text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          {t.galleryDescription}
        </p>
      </div>

      {/* Galeri */}
      <div className="flex flex-col justify-center gap-4 md:gap-6 px-4 max-w-7xl mx-auto">
        {renderRow(topRow, true)}
        {renderRow(bottomRow, false)}
      </div>
    </section>
  );
};

export default GalleryArrowShape;
