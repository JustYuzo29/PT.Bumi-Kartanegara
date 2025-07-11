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
    <div className=""> {/* Removed text-white from here */}
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-wide mb-4 text-[var(--color-navy)] dark:text-white">
          STAFF MONITORING
        </h1>

        <div className="flex items-center gap-3">
          {/* Icon color for light mode */}
          <BuildingOffice2Icon className="h-6 w-6 text-[var(--color-navy)] dark:text-white" /> 
          {/* Select styling for light mode */}
          <select className="bg-[var(--color-snow)] text-[var(--color-carbon)] dark:bg-[var(--color-midnight)] dark:text-white text-sm px-4 py-2 rounded-lg shadow focus:outline-none">
            <option>Perusahaan Induk</option>
            <option>Perusahaan Anak</option>
          </select>
        </div>
      </div>

      {/* Card Box */}
      {/* Background for the main card box */}
      <div className="bg-[var(--color-snow)] dark:bg-[var(--color-ocean)] w-full max-w-screen-xl mx-auto px-6 rounded-xl shadow-lg">
        {/* Text colors for light mode */}
        <h2 className="text-xl font-bold text-[var(--color-navy)] dark:text-white pt-4">
          Daily Monitoring
        </h2>
        <p className="text-sm mb-4 text-[var(--color-carbon)] dark:text-white">
          lorem ipsum wkwkwkwkwk
        </p>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-separate border-spacing-y-2">
            <thead>
              {/* Table header text and border colors for light mode */}
              <tr className="text-[var(--color-navy)] dark:text-white font-semibold border-b border-[var(--color-carbon)] dark:border-white">
                <th className="py-2 px-4">nama</th>
                <th className="py-2 px-4">date/time</th>
                <th className="py-2 px-4">country</th>
              </tr>
            </thead>
            {/* Table body text color for light mode */}
            <tbody className="text-[var(--color-carbon)] dark:text-white">
              {data.map((item, idx) => (
                <tr 
                  key={idx} 
                  // Table row background for light mode
                  className="bg-[var(--color-snow)] dark:bg-[var(--color-midnight)] rounded-lg shadow"
                >
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