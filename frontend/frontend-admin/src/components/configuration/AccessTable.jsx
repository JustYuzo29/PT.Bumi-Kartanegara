// components/configuration/AccessTable.jsx
import React from "react";

const AccessTable = ({ data, sectionKey, onToggle }) => (
  <div className="bg-[var(--color-snow)] dark:bg-[var(--color-ocean)] rounded-xl shadow-lg p-6 text-[var(--color-carbon)] dark:text-white">
    <h3 className="text-lg font-bold mb-4 text-[var(--color-navy)] dark:text-white">
      Hak Akses
    </h3>
    <div className="overflow-x-auto">
      <table className="min-w-full text-left border-separate border-spacing-y-3">
        <thead>
          <tr className="font-semibold border-b-2 border-[var(--color-carbon)] dark:border-white text-sm uppercase tracking-wider">
            <th className="py-3 px-4">No.</th>
            <th className="py-3 px-4">Nama</th>
            <th className="py-3 px-4">Akses</th>
            <th className="py-3 px-4">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data[sectionKey].map((item, idx) => (
            <tr
              key={idx}
              className="rounded-lg shadow-sm bg-white dark:bg-[var(--color-midnight)]"
            >
              <td className="py-3 px-4">{idx + 1}.</td>
              <td className="py-3 px-4">{item.name}</td>
              <td className="py-3 px-4">{item.akses}</td>
              <td className="py-3 px-4">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => onToggle(sectionKey, idx)}
                  className="w-5 h-5 accent-[var(--color-navy)] dark:accent-[var(--color-snow)] cursor-pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default AccessTable;
