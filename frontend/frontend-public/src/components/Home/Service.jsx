import React from "react";

const Service = ({ t }) => (
  <section
    style={{
      backgroundColor: "var(--color-card-bg)",
      color: "var(--color-card-text)"
    }}
    className="w-full"
    data-aos="fade-up"
  >
    <div className="flex flex-col md:flex-row w-full h-full">
      <div
        className="relative flex items-center justify-center text-white font-bold text-3xl md:text-3xl w-full md:w-[35%] py-24"
        style={{
          backgroundColor: "var(--color-card-ser)",
          clipPath: "polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%)",
        }}
      >
        {t.serviceLabel}
      </div>
      <div className="flex flex-col md:flex-row flex-1 divide-y md:divide-y-0 md:divide-x divide-white/30">
        {t.services.map((item, i) => (
          <div 
            key={i} 
            className="flex-1 px-8 py-20 text-center"
            style={{
              backgroundColor: "var(--color-card-bg)",
              color: "var(--color-card-text)"
            }}
          >
            <h3 
              style={{ color: "var(--color-card-text)" }}
              className="font-bold text-2xl mb-2 uppercase"
            >
              {item.title}
            </h3>
            <p 
              style={{ color: "var(--color-card-text)" }}
              className="text-base leading-relaxed"
            >
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Service;