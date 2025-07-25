// components/site/SiteHeader.jsx
import React from "react";

const SiteHeader = () => (
  <section>
    <h1 className="text-2xl font-extrabold text-[var(--color-navy)] dark:text-white mb-3">
      KUNJUNGI SITUS
    </h1>
    <a
      href="https://agen88a.net/"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block bg-[var(--color-midnight)] hover:bg-[var(--color-navy)] text-white font-semibold text-sm py-3 px-6 rounded-xl shadow transition-colors duration-200"
    >
      KUNJUNGI SITUS BLOG
    </a>
  </section>
);

export default SiteHeader;