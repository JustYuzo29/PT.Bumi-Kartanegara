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
    <div className="bg-[var(--color-snow)] rounded-xl shadow p-4 text-black border-l-8 border-[var(--color-midnight)]">
      <h3 className="text-md font-bold mb-2">Hak Akses</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="font-semibold border-b border-white">
              <th className="py-2 px-4">nama</th>
              <th className="py-2 px-4">Akses</th>
              <th className="py-2 px-4">action</th>
            </tr>
          </thead>
          <tbody>
            {data[sectionKey].map((item, idx) => (
              <tr key={idx} className="rounded shadow">
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">{item.akses}</td>
                <td className="py-2 px-4">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleToggle(sectionKey, idx)}
                    className="w-5 h-5 accent-[var(--color-snow)] cursor-pointer"
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
    <div className="text-white space-y-10">
      <h1 className="text-2xl font-extrabold">HAK AKSES ADMIN & STAFF</h1>

      {/* Admin Section */}
      <div className="bg-[var(--color-snow)] w-full max-w-screen-xl mx-auto px-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-black pt-4">ADMIN</h2>
        <p className="text-sm mb-4 text-black">lorem ipsum wkwkwkwkkw</p>
        {renderTable("admin")}
      </div>

      {/* Staff Induk Section */}
      <div className="bg-[var(--color-snow)] w-full max-w-screen-xl mx-auto px-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-black pt-4">
          STAFF INDUK PERUSAHAAN
        </h2>
        <p className="text-sm mb-4 text-black">lorem ipsum wkwkwkwkkw</p>
        {renderTable("induk")}
      </div>

      {/* Staff Anak Section */}
      <div className="bg-[var(--color-snow)] w-full max-w-screen-xl mx-auto px-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-black pt-4">
          STAFF ANAK PERUSAHAAN
        </h2>
        <p className="text-sm mb-4 text-black">lorem ipsum wkwkwkwkkw</p>
        {renderTable("anak")}
      </div>
    </div>
  );
};

export default Configuration;
