import React from "react";

const MonitoringTable = ({ data, title, subtitle }) => {
  return (
    <>
      <h2 className="text-xl font-bold text-[var(--color-navy)] dark:text-white">{title}</h2>
      <div className="rounded-xl shadow-lg p-4 sm:p-6 md:p-10 bg-[var(--color-white)] dark:bg-[var(--color-ocean)]">
        {subtitle && (
          <p className="text-sm mb-6 text-[var(--color-carbon)] dark:text-white">{subtitle}</p>
        )}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-separate border-spacing-y-2">
            <thead>
              <tr className="text-[var(--color-navy)] dark:text-white font-semibold border-b border-[var(--color-carbon)] dark:border-white">
                <th className="py-2 px-4">No.</th>
                <th className="py-2 px-4">Nama</th>
                <th className="py-2 px-4">Tanggal/Waktu</th>
                <th className="py-2 px-4">Negara</th>
              </tr>
            </thead>
            <tbody className="text-[var(--color-carbon)] dark:text-white">
              {data.map((item, i) => (
                <tr
                  key={i}
                  className="bg-[var(--color-snow)] dark:bg-[var(--color-midnight)] rounded-lg shadow"
                >
                  <td className="py-2 px-4">{i + 1}.</td>
                  <td className="py-2 px-4">{item.name}</td>
                  <td className="py-2 px-4">{item.datetime}</td>
                  <td className="py-2 px-4">{item.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MonitoringTable;
