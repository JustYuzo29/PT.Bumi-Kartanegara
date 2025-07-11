import React from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/solid";

const User = () => {
  const users = [
    { name: "lorem ipsum", email: "jkcajakc@gmail.com" },
    { name: "lorem ipsum", email: "jkcajakc@gmail.com" },
    { name: "lorem ipsum", email: "jkcajakc@gmail.com" },
  ];

  return (
    <div className="text-white space-y-10">
      {/* ADMIN SECTION */}
      <div>
        <h1 className="text-2xl font-extrabold mb-4">ADMIN</h1>

        <div className="bg-[var(--color-snow)] w-full max-w-screen-xl mx-auto px-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-black pt-4">Admin Settings</h2>
          <p className="text-sm mb-4 text-black">lorem ipsum wkwkwkwkkw</p>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr className="text-black font-semibold border-b border-black">
                  <th className="py-2 px-4">nama</th>
                  <th className="py-2 px-4">email</th>
                  <th className="py-2 px-4">action</th>
                </tr>
              </thead>
              <tbody className="text-black">
                {users.map((user, idx) => (
                  <tr
                    key={idx}
                    className="bg-[var(--color-snow)] rounded-lg shadow"
                  >
                    <td className="py-2 px-4">{`${idx + 1}. ${user.name}`}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4 space-x-2">
                      <PencilSquareIcon className="h-5 w-5 inline-block text-yellow-400 hover:text-yellow-500 cursor-pointer" />
                      <TrashIcon className="h-5 w-5 inline-block text-red-500 hover:text-red-600 cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* STAFF SECTION */}
      <div>
        {/* Judul */}
        <h1 className="text-2xl font-extrabold mb-4">STAFF</h1>

        {/* Icon + Dropdown */}
        <div className="flex items-center gap-3 mb-4">
          <BuildingOffice2Icon className="h-6 w-6 text-white" />
          <select className="bg-[var(--color-midnight)] text-white text-sm px-4 py-2 rounded-lg shadow focus:outline-none">
            <option>Induk Perusahaan</option>
            <option>Anak Perusahaan</option>
          </select>
        </div>

        {/* Card Box */}
        <div className="bg-[var(--color-snow)] w-full max-w-screen-xl mx-auto px-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-black pt-4">Staff Settings</h2>
          <p className="text-sm mb-4 text-black">lorem ipsum wkwkwkkwkw</p>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr className="text-black font-semibold border-b border-black">
                  <th className="py-2 px-4">nama</th>
                  <th className="py-2 px-4">email</th>
                  <th className="py-2 px-4">action</th>
                </tr>
              </thead>
              <tbody className="text-black">
                {users.map((user, idx) => (
                  <tr
                    key={idx}
                    className="bg-[var(--color-snow)] rounded-lg shadow"
                  >
                    <td className="py-2 px-4">{`${idx + 1}. ${user.name}`}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4 space-x-2">
                      <PencilSquareIcon className="h-5 w-5 inline-block text-yellow-400 hover:text-yellow-500 cursor-pointer" />
                      <TrashIcon className="h-5 w-5 inline-block text-red-500 hover:text-red-600 cursor-pointer" />
                    </td>
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

export default User;