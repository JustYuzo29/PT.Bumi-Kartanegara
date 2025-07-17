import React from "react";
import { BuildingOffice2Icon } from "@heroicons/react/24/solid";

const Monitoring = () => {
  const blogData = [
    { name: "lorem ipsum", datetime: "15-08-2025/14.00", country: "Indonesia" },
    { name: "lorem ipsum", datetime: "15-08-2025/14.00", country: "Indonesia" },
    { name: "lorem ipsum", datetime: "15-08-2025/14.00", country: "Indonesia" },
    { name: "lorem ipsum", datetime: "15-08-2025/14.00", country: "Indonesia" },
    { name: "lorem ipsum", datetime: "15-08-2025/14.00", country: "Indonesia" },
  ];

  const staffData = [
    { name: "lorem ipsum", datetime: "15-08-2025/14.00", country: "Indonesia" },
    { name: "lorem ipsum", datetime: "15-08-2025/14.00", country: "Indonesia" },
    { name: "lorem ipsum", datetime: "15-08-2025/14.00", country: "Indonesia" },
  ];

  return (
    <div className="space-y-10">
      {/* WEB BLOG MONITORING */}
      <div>
        <h1 className="text-2xl font-extrabold mb-4 text-[var(--color-navy)] dark:text-white">
          WEB BLOG MONITORING
        </h1>

        <div className="bg-[var(--color-white)] dark:bg-[var(--color-ocean)] w-full max-w-screen-xl mx-auto px-6 pb-8 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-[var(--color-navy)] dark:text-white pt-4">
            Monitoring Harian
          </h2>
          <p className="text-sm mb-6 text-[var(--color-carbon)] dark:text-white">
            Berikut adalah beberapa riwayat monitoring terbaru yang telah dilakukan pada situs ini.
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr className="text-[var(--color-navy)] dark:text-white font-semibold border-b border-[var(--color-carbon)] dark:border-white">
                  <th className="py-2 px-4">No.</th>
                  <th className="py-2 px-4">Nama</th>
                  <th className="py-2 px-4">Tanggal/Waktu</th>
                  <th className="py-2 px-4">Negara</th>
                </tr>
              </thead>
              <tbody className="text-[var(--color-carbon)] dark:text-white">
                {blogData.map((item, idx) => (
                  <tr
                    key={idx}
                    className="bg-[var(--color-snow)] dark:bg-[var(--color-midnight)] rounded-lg shadow"
                  >
                    <td className="py-2 px-4">{idx + 1}.</td>
                    <td className="py-2 px-4">{item.name}</td>
                    <td className="py-2 px-4">{item.datetime}</td>
                    <td className="py-2 px-4">{item.country}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* STAFF MONITORING */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-wide mb-4 text-[var(--color-navy)] dark:text-white">
          STAFF MONITORING
        </h1>
        <div className="flex items-center gap-3 mb-4">
          <BuildingOffice2Icon className="h-6 w-6 text-[var(--color-navy)] dark:text-white" />
          <div className="relative inline-block">
            <select className="dropdown-select">
              <option>Perusahaan Induk</option>
              <option>Perusahaan Anak</option>
            </select>
            <div className="dropdown-arrow">
              <svg
                className="w-4 h-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.08z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-white)] dark:bg-[var(--color-ocean)] w-full max-w-screen-xl mx-auto px-6 pb-8 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-[var(--color-navy)] dark:text-white pt-4">
            Monitoring Harian
          </h2>
          <p className="text-sm mb-6 text-[var(--color-carbon)] dark:text-white">
            Berikut adalah beberapa riwayat monitoring terbaru yang telah dilakukan pada situs ini.
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr className="text-[var(--color-navy)] dark:text-white font-semibold border-b border-[var(--color-carbon)] dark:border-white">
                  <th className="py-2 px-4">No.</th>
                  <th className="py-2 px-4">Nama</th>
                  <th className="py-2 px-4">Tanggal/Waktu</th>
                  <th className="py-2 px-4">Negara</th>
                </tr>
              </thead>
              <tbody className="text-[var(--color-carbon)] dark:text-white">
                {staffData.map((item, idx) => (
                  <tr
                    key={idx}
                    className="bg-[var(--color-snow)] dark:bg-[var(--color-midnight)] rounded-lg shadow"
                  >
                    <td className="py-2 px-4">{idx + 1}.</td>
                    <td className="py-2 px-4">{item.name}</td>
                    <td className="py-2 px-4">{item.datetime}</td>
                    <td className="py-2 px-4">{item.country}</td>
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

export default Monitoring;
