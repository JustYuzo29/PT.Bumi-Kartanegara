// src/pages/Monitoring.jsx
import React from "react";
import { BuildingOffice2Icon } from "@heroicons/react/24/solid";

const Monitoring = () => {
  const data = [
    { name: "lorem ipsum", datetime: "15-08-2025/14.00", country: "Indonesia" },
    { name: "lorem ipsum", datetime: "15-08-2025/14.00", country: "Indonesia" },
    { name: "lorem ipsum", datetime: "15-08-2025/14.00", country: "Indonesia" },
  ];

  return (
    <div className="text-white">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-wide mb-4">
          STAFF MONITORING
        </h1>

        <div className="flex items-center gap-3">
          <BuildingOffice2Icon className="h-6 w-6 text-white" />
          <select className="bg-[var(--color-midnight)] text-white text-sm px-4 py-2 rounded-lg shadow focus:outline-none">
            <option>Perusahaan Induk</option>
            <option>Perusahaan Anak</option>
          </select>
        </div>
      </div>

      {/* Card Box */}
      <div className="bg-[var(--color-snow)] w-full max-w-screen-xl mx-auto px-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-black pt-4">Daily Monitoring</h2>
        <p className="text-sm mb-4 text-black">lorem ipsum wkwkwkwkwk</p>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-black font-semibold border-b border-black">
                <th className="py-2 px-4">nama</th>
                <th className="py-2 px-4">date/time</th>
                <th className="py-2 px-4">country</th>
              </tr>
            </thead>
            <tbody className="text-black">
              {data.map((item, idx) => (
                <tr key={idx} className="bg-[var(--color-snow)] rounded-lg shadow">
                  <td className="py-2 px-4">{`${idx + 1}. ${item.name}`}</td>
                  <td className="py-2 px-4">{item.datetime}</td>
                  <td className="py-2 px-4">{item.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Monitoring;