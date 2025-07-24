import React from "react";

const layanan = [
  {
    title: "Jasa Konstruksi",
    desc: "Menyelenggarakan pembangunan dan renovasi berbagai bidang sipil dan infrastruktur",
  },
  {
    title: "Perdagangan & suplai",
    desc: "Menyediakan berbagai kebutuhan material & peralatan, juga penyewaan alat dan aktivitas industri.",
  },
];

const Service = () => (
  <section
    className="w-full bg-[var(--color-navy)] text-white"
    data-aos="fade-up"
  >
    <div className="flex flex-col md:flex-row w-full h-full">
      <div
        className="relative flex items-center justify-center text-white font-bold text-3xl md:text-3xl w-full md:w-[35%] py-24"
        style={{
          backgroundColor: "var(--color-warning)",
          clipPath: "polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%)",
        }}
      >
        SERVICE
      </div>
      <div className="flex flex-col md:flex-row flex-1 divide-y md:divide-y-0 md:divide-x divide-white/30">
        {layanan.map((item, i) => (
          <div key={i} className="flex-1 px-8 py-20 text-center">
            <h3 className="font-bold text-2xl mb-2 uppercase">{item.title}</h3>
            <p className="text-base text-white/80 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Service;
