// src/pages/Configuration.jsx
import React, { useState } from "react";
import AccessTable from "../../components/frontend-admin/configuration/AccessTable";

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

  return (
    <div className="bg-[var(--color-whisper)] dark:bg-[var(--color-abyss)] min-h-screen py-12">
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 space-y-12">
        <h1 className="text-3xl font-extrabold text-[var(--color-navy)] dark:text-white mb-8">
          HAK AKSES ADMIN & STAFF
        </h1>

        <h2 className="text-2xl font-bold text-[var(--color-navy)] dark:text-white">ADMIN</h2>
        <div className="bg-white dark:bg-[var(--color-ocean)] rounded-3xl shadow-xl p-8">
          <AccessTable data={data} sectionKey="admin" onToggle={handleToggle} />
        </div>

        <h2 className="text-2xl font-bold text-[var(--color-navy)] dark:text-white">STAFF PERUSAHAAN</h2>
        <div className="bg-white dark:bg-[var(--color-ocean)] rounded-3xl shadow-xl p-8">
          <AccessTable data={data} sectionKey="induk" onToggle={handleToggle} />
        </div>
      </div>
    </div>
  );
};

export default Configuration;