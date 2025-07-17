// src/pages/Site.jsx
import React from "react";

const Site = () => {
  const updates = [
    {
      text: "Jika Kau Bertemu aku begini",
      datetime: "15-08-2025/14.00",
      editedBy: "Jeki",
    },
    {
      text: "Aku tak kau anggap pada cerita",
      datetime: "15-08-2025/14.00",
      editedBy: "Rehan",
    },
  ];

  return (
    <div className="space-y-10"> {/* Removed text-white from here */}
      {/* VISIT SITE */}
      <div>
        <h1 className="text-2xl font-extrabold mb-4 text-[var(--color-navy)] dark:text-white">
          KUNJUNGI SITUS
        </h1>

        <div className="w-full max-w-screen-xl mx-auto">
          <a
            href="https://blog.site.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-[var(--color-midnight)] text-white 
                       hover:bg-[var(--color-snow)] hover:text-[var(--color-navy)] // Updated hover text color for light mode
                       font-semibold text-sm py-4 rounded-xl shadow transition
                       dark:hover:text-black" // Keep original hover text for dark mode if needed
          >
            KUNJUNGI SITUS BLOG
          </a>
        </div>
      </div>

      {/* UPDATES */}
      <div>
        <h1 className="text-2xl font-extrabold mb-4 text-[var(--color-navy)] dark:text-white">
          UPDATES
        </h1>

        {/* The overall background for the Updates section should be light in light mode */}
        <div className="bg-[var(--color-white)] dark:bg-[var(--color-ocean)] w-full max-w-screen-xl mx-auto px-6 pb-8 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-[var(--color-navy)] dark:text-white pt-4">
            Update Terbaru
          </h2>
          <p className="text-sm mb-6 text-[var(--color-carbon)] dark:text-white">
            Berikut adalah beberapa riwayat update terbaru yang telah dilakukan pada situs ini.
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-separate border-spacing-y-2">
              <thead>
                {/* Table header text color for light mode */}
                <tr className="text-[var(--color-navy)] dark:text-white font-semibold border-b border-[var(--color-carbon)] dark:border-white">
                  <th className="py-2 px-4">No.</th>
                  <th className="py-2 px-4">Pembaruan</th>
                  <th className="py-2 px-4">Tanggal/Waktu</th>
                  <th className="py-2 px-4">Diedit Oleh</th>
                </tr>
              </thead>
              <tbody className="text-[var(--color-carbon)] dark:text-white"> {/* Table body text color */}
                {updates.map((item, idx) => (
                  <tr
                    key={idx}
                    // Background for table rows, typically lighter in light mode
                    className="bg-[var(--color-snow)] dark:bg-[var(--color-midnight)] rounded-lg shadow"
                  >
                    <td className="py-2 px-4">{`${idx + 1}.`}</td>
                    <td className="py-2 px-4">{item.text}</td>
                    <td className="py-2 px-4">{item.datetime}</td>
                    <td className="py-2 px-4">{item.editedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Site;