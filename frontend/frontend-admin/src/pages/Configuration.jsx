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
    const updatedData = { ...data };
    const updatedSection = [...updatedData[section]];
    updatedSection[index] = {
      ...updatedSection[index],
      checked: !updatedSection[index].checked,
    };
    updatedData[section] = updatedSection;
    setData(updatedData);
  };

  const renderTable = (sectionKey) => (
    <div
      className="bg-[var(--color-snow)] dark:bg-[var(--color-ocean)] rounded-xl shadow-lg p-6
                 text-[var(--color-carbon)] dark:text-white"
    >
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
                    onChange={() => handleToggle(sectionKey, idx)}
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
    <div className="bg-[var(--color-whisper)] dark:bg-[var(--color-abyss)] min-h-screen py-12">
      {/* Wrapper dengan gutter & width sama Monitoring */}
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 space-y-12">
        {/* Title utama – keluar card & kiri */}
        <h1 className="text-3xl font-extrabold text-[var(--color-navy)] dark:text-white mb-8">
          HAK AKSES ADMIN & STAFF
        </h1>

        {/* ADMIN */}
        <h2 className="text-2xl font-bold text-[var(--color-navy)] dark:text-white">
          ADMIN
        </h2>
        <div className="bg-white dark:bg-[var(--color-ocean)] rounded-3xl shadow-xl p-8">
          {renderTable("admin")}
        </div>

        {/* STAFF INDUK */}
        <h2 className="text-2xl font-bold text-[var(--color-navy)] dark:text-white">
          STAFF INDUK PERUSAHAAN
        </h2>
        <div className="bg-white dark:bg-[var(--color-ocean)] rounded-3xl shadow-xl p-8">
          {renderTable("induk")}
        </div>

        {/* STAFF ANAK */}
        <h2 className="text-2xl font-bold text-[var(--color-navy)] dark:text-white">
          STAFF ANAK PERUSAHAAN
        </h2>
        <div className="bg-white dark:bg-[var(--color-ocean)] rounded-3xl shadow-xl p-8">
          {renderTable("anak")}
        </div>
      </div>
    </div>
  );
};

export default Configuration;
