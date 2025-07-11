import React, { useState } from "react";

const Configuration = () => {
  const [data, setData] = useState({
    admin: [
      { name: "awang", akses: "wkwkwkwkwkwkwkwkwkk", checked: false },
      { name: "arham", akses: "wkwkwkwkwkwkwkwkwkk", checked: true },
    ],
    induk: [
      { name: "aksal", akses: "wkwkwkwkwkwkwkwkwkk", checked: false },
      { name: "bang jack", akses: "wkwkwkwkwkwkwkwkwkk", checked: true },
    ],
    anak: [
      { name: "awang", akses: "wkwkwkwkwkwkwkwkwkk", checked: false },
      { name: "arham", akses: "wkwkwkwkwkwkwkwkwkk", checked: true },
    ],
  });

  const handleToggle = (section, index) => {
    const updated = { ...data };
    updated[section][index].checked = !updated[section][index].checked;
    setData(updated);
  };

  const renderTable = (sectionKey) => (
    // Background, text, and border for the inner table container
    <div className="bg-[var(--color-snow)] dark:bg-[var(--color-ocean)] rounded-xl shadow p-4 
                    text-[var(--color-carbon)] dark:text-white 
                    border-l-8 border-[var(--color-midnight)]">
      {/* Table title text color */}
      <h3 className="text-md font-bold mb-2 text-[var(--color-navy)] dark:text-white">Hak Akses</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border-separate border-spacing-y-2">
          <thead>
            {/* Table header text and border color */}
            <tr className="font-semibold border-b border-[var(--color-carbon)] dark:border-white">
              <th className="py-2 px-4">nama</th>
              <th className="py-2 px-4">Akses</th>
              <th className="py-2 px-4">action</th>
            </tr>
          </thead>
          <tbody>
            {data[sectionKey].map((item, idx) => (
              <tr 
                key={idx} 
                // Table row background
                className="rounded shadow bg-white dark:bg-[var(--color-midnight)]" // Explicit white for light mode rows
              >
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">{item.akses}</td>
                <td className="py-2 px-4">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleToggle(sectionKey, idx)}
                    // Accent color for checkbox
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

  return (
    // Main container text color (removed explicit text-black, rely on global)
    <div className="space-y-10 min-h-screen py-10 px-4">
      {/* Header text color */}
      <h1 className="text-2xl font-extrabold text-[var(--color-navy)] dark:text-white text-center">
        HAK AKSES ADMIN & STAFF
      </h1>

      {/* ADMIN Section */}
      <div className="bg-white dark:bg-[var(--color-ocean)] rounded-2xl shadow-md p-6 max-w-5xl mx-auto">
        {/* Section title and paragraph text colors */}
        <h2 className="text-xl font-bold text-[var(--color-navy)] dark:text-white">ADMIN</h2>
        <p className="text-sm mb-4 text-[var(--color-carbon)] dark:text-white">lorem ipsum wkwkwkwkkw</p>
        {renderTable("admin")}
      </div>

      {/* STAFF INDUK Section */}
      <div className="bg-white dark:bg-[var(--color-ocean)] rounded-2xl shadow-md p-6 max-w-5xl mx-auto">
        {/* Section title and paragraph text colors */}
        <h2 className="text-xl font-bold text-[var(--color-navy)] dark:text-white">STAFF INDUK PERUSAHAAN</h2>
        <p className="text-sm mb-4 text-[var(--color-carbon)] dark:text-white">lorem ipsum wkwkwkwkkw</p>
        {renderTable("induk")}
      </div>

      {/* STAFF ANAK Section */}
      <div className="bg-white dark:bg-[var(--color-ocean)] rounded-2xl shadow-md p-6 max-w-5xl mx-auto">
        {/* Section title and paragraph text colors */}
        <h2 className="text-xl font-bold text-[var(--color-navy)] dark:text-white">STAFF ANAK PERUSAHAAN</h2>
        <p className="text-sm mb-4 text-[var(--color-carbon)] dark:text-white">lorem ipsum wkwkwkwkkw</p>
        {renderTable("anak")}
      </div>
    </div>
  );
};

export default Configuration;