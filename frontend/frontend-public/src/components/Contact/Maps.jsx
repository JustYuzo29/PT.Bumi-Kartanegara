import React from "react";

const Maps = () => {
  return (
    <div className="relative bg-white dark:bg-[var(--color-background)] px-4 md:px-20 pt-40 pb-20">
      {/* Section Title */}
      <div className="text-center mb-0" data-aos="fade-down">
        <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
          LOKASI KAMI
        </h2>
        <h1 className="text-3xl md:text-4xl font-bold text-ocean mb-4">
          Temukan Kami di Google Maps
        </h1>
      </div>

      {/* Custom Card Google Maps */}
      {/* Card Container tanpa ruang putih atas */}
      <div
        className="mt-12 mb-8 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
        data-aos="zoom-in"
      >
        <iframe
          src="https://www.google.com/maps?q=-0.4923628577301253,117.13344259880564&z=18&output=embed"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Lokasi PT. BUMI KARTANEGARA"
        ></iframe>
      </div>

      {/* Tombol Buka Maps */}
      <div className="text-center mt-6" data-aos="fade-up">
        <a
          href="https://maps.app.goo.gl/86UnMTd9sCZv3SbeA"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-ocean text-white px-6 py-2 rounded-md transition duration-300 hover:bg-[var(--color-warning)]"
        >
          Lihat di Google Maps
        </a>
      </div>
    </div>
  );
};

export default Maps;
