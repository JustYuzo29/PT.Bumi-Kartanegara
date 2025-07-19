import React, { useState } from "react";

const Configuration = () => {
  const [data, setData] = useState({
    admin: [
      { name: "Jeki", akses: "Akses itu", checked: false },
      { name: "Icong", akses: "Akses ini", checked: true },
    ],
    induk: [
      { name: "Arham", akses: "Akses itu", checked: false },
      { name: "Awang", akses: "Akses ini", checked: true },
    ],
    anak: [
      { name: "Aksal", akses: "Akses itu", checked: false },
      { name: "Rifki", akses: "Akses ini", checked: true },
    ],
  });

  const handleToggle = (section, index) => {
    // Create a new copy of the data object
    const updatedData = { ...data };
    // Create a new copy of the specific section array
    const updatedSection = [...updatedData[section]];
    // Create a new copy of the item to be updated
    updatedSection[index] = {
      ...updatedSection[index],
      checked: !updatedSection[index].checked,
    };
    // Update the section in the new data object
    updatedData[section] = updatedSection;
    // Set the state with the fully immutable updated data
    setData(updatedData);
  };

  const renderTable = (sectionKey) => (
    // Background, text, and border for the inner table container
    <div className="bg-[var(--color-snow)] dark:bg-[var(--color-ocean)] rounded-xl shadow-lg p-6
                    text-[var(--color-carbon)] dark:text-white
                    border-l-8 border-[var(--color-midnight)]">
      {/* Table title text color and adjusted margin */}
      <h3 className="text-lg font-bold mb-4 text-[var(--color-navy)] dark:text-white">Hak Akses</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border-separate border-spacing-y-3">
          <thead>
            {/* Table header text, border color, and slightly more padding */}
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
                // Table row background
                className="rounded-lg shadow-sm bg-white dark:bg-[var(--color-midnight)]"
              >
                <td className="py-3 px-4">{idx + 1}.</td>
                <td className="py-3 px-4">{item.name}</td>
                <td className="py-3 px-4">{item.akses}</td>
                <td className="py-3 px-4">
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
    // Main container spacing and overall background for a cohesive look
    <div className="bg-[var(--color-whisper)] dark:bg-[var(--color-abyss)] min-h-screen py-12 px-6 space-y-12">
      {/* Header text color, font, and increased bottom margin */}
      <h1 className="text-3xl font-extrabold text-[var(--color-navy)] dark:text-white text-center mb-8">
        HAK AKSES ADMIN & STAFF
      </h1>

      {/* ADMIN Section - Larger padding, shadow, and rounded corners */}
      <div className="bg-white dark:bg-[var(--color-ocean)] rounded-3xl shadow-xl p-8 max-w-5xl mx-auto">
        {/* Section title and paragraph text colors */}
        <h2 className="text-2xl font-bold mb-2 text-[var(--color-navy)] dark:text-white">ADMIN</h2>
        <p className="text-base mb-6 text-[var(--color-carbon)] dark:text-white">Ini adalah deskripsi untuk ADMIN</p>
        {renderTable("admin")}
      </div>

      {/* STAFF INDUK Section */}
      <div className="bg-white dark:bg-[var(--color-ocean)] rounded-3xl shadow-xl p-8 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-2 text-[var(--color-navy)] dark:text-white">STAFF INDUK PERUSAHAAN</h2>
        <p className="text-base mb-6 text-[var(--color-carbon)] dark:text-white">Ini adalah deskripsi untuk STAFF INDUK PERUSAHAAN</p>
        {renderTable("induk")}
      </div>

      {/* STAFF ANAK Section */}
      <div className="bg-white dark:bg-[var(--color-ocean)] rounded-3xl shadow-xl p-8 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-2 text-[var(--color-navy)] dark:text-white">STAFF ANAK PERUSAHAAN</h2>
        <p className="text-base mb-6 text-[var(--color-carbon)] dark:text-white">Ini adalah deskripsi untuk STAFF ANAK PERUSAHAAN</p>
        {renderTable("anak")}
      </div>
    </div>
  );
};

export default Configuration;