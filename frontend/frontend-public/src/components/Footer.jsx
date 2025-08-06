import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../locales/language";
import { footerTranslations } from "../locales/footer";

export default function Footer() {
  const { language } = useContext(LanguageContext);
  const t = footerTranslations[language];

  return (
    <footer
      className="py-10 transition-colors duration-300"
      style={{
        backgroundColor: "var(--color-footer)",
        color: "#ffffff", // selalu putih
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Kolom Kiri - Informasi Perusahaan */}
        <div>
          <h3 className="text-xl font-heading mb-2">{t.companyName}</h3>
          <p className="text-sm leading-relaxed mb-4">
            {t.addressLine1}, <br />
            {t.addressLine2}, <br />
            {t.addressLine3}, <br />
            {t.addressLine4}
          </p>
          <p className="text-sm mb-1">+6282226677207</p>
          <p className="text-sm mb-1">pt.bumikartanegaranew@gmail.com</p>
        </div>

        {/* Kolom Kanan - Sitemap */}
        <div>
          <h3 className="text-xl font-heading mb-2">{t.siteMap}</h3>
          <ul className="space-y-2 text-sm">
            {["about", "media", "service", "contact"].map((item) => (
              <li key={item}>
                <Link
                  to={`/${item}`}
                  className="text-snow hover:text-tahiti transition"
                >
                  {t[item]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 border-t mt-8 pt-4 border:#ffff">
        <p className="text-sm text-white">
          {t.copyright.replace("{year}", new Date().getFullYear())}
        </p>
      </div>
    </footer>
  );
}