import React from "react";

const Maps = ({ t }) => {
  return (
    <div className="relative bg-white dark:bg-[var(--color-background)] px-4 md:px-20 pt-40 pb-20">
      {/* Section Title */}
      <div className="text-center mb-0" data-aos="fade-down">
        <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
          {t.mapsSubtitle}
        </h2>
        <h1 className="text-3xl md:text-4xl font-bold text-ocean mb-4">
          {t.mapsTitle}
        </h1>
      </div>

      {/* Google Maps */}
      <div
        className="mt-12 mb-8 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
        data-aos="zoom-in"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d547.7868393194464!2d117.1329989279793!3d-0.4925936210590439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df67ff3fdbf695d%3A0xa2b3b3df1fdd9952!2sPT.%20BUMI%20KARTANEGARA!5e0!3m2!1sen!2sid!4v1753517725348!5m2!1sen!2sid"
          className="w-full h-[450px]"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer"
        ></iframe>
      </div>

      {/* Button */}
      <div className="text-center mt-6" data-aos="fade-up">
        <a
          href="https://maps.app.goo.gl/4idKYAXmBVVNP1K87"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-ocean text-white px-6 py-2 rounded-md transition duration-300 hover:bg-[var(--color-warning)]"
        >
          {t.mapsButton}
        </a>
      </div>
    </div>
  );
};

export default Maps;
