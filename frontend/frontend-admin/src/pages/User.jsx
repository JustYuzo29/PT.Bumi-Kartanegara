import React from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/solid";

const User = () => {
  const users = [
    { name: "lorem ipsum", email: "loremipsum@gmail.com" },
    { name: "lorem ipsum", email: "loremipsum@gmail.com" },
    { name: "lorem ipsum", email: "loremipsum@gmail.com" },
  ];

  return (
    <div className="space-y-10"> {/* Removed text-white from here */}
      {/* ADMIN SECTION */}
      <div>
        {/* Header text color for light mode */}
        <h1 className="text-2xl font-extrabold mb-4 text-[var(--color-navy)] dark:text-white">
          ADMIN
        </h1>

        {/* Card Box background for light mode */}
        <div className="bg-[var(--color-white)] dark:bg-[var(--color-ocean)] w-full max-w-screen-xl mx-auto px-6 pb-8 rounded-xl shadow-lg">
          {/* Text colors for light mode */}
          <h2 className="text-xl font-bold text-[var(--color-navy)] dark:text-white pt-4">
            Pengaturan Admin
          </h2>
          <p className="text-sm mb-4 text-[var(--color-carbon)] dark:text-white">
            Berikut adalah beberapa pengaturan yang dapat dilakukan oleh admin untuk mengelola situs ini.
          </p>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-separate border-spacing-y-2">
              <thead>
                {/* Table header text and border colors for light mode */}
                <tr className="text-[var(--color-navy)] dark:text-white font-semibold border-b border-[var(--color-carbon)] dark:border-white">
                  <th className="py-2 px-4">No.</th>
                  <th className="py-2 px-4">Nama</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Aksi</th>
                </tr>
              </thead>
              {/* Table body text color for light mode */}
              <tbody className="text-[var(--color-carbon)] dark:text-white">
                {users.map((user, idx) => (
                  <tr
                    key={idx}
                    // Table row background for light mode
                    className="bg-[var(--color-snow)] dark:bg-[var(--color-midnight)] rounded-lg shadow"
                  >
                    <td className="py-2 px-4">{idx + 1}.</td>
                    <td className="py-2 px-4">{user.name}</td>
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
        <h1 className="text-2xl font-extrabold mb-4 text-[var(--color-navy)] dark:text-white">
          STAFF
        </h1>

        {/* Icon + Dropdown */}
        <div className="flex items-center gap-3 mb-4">
          <BuildingOffice2Icon className="h-6 w-6 text-[var(--color-navy)] dark:text-white" />
          <div className="relative inline-block">
            <select className="dropdown-select">
              <option>Perusahaan Induk</option>
              <option>Perusahaan Anak</option>
            </select>
            <div className="dropdown-arrow">
              <svg
                className="w-4 h-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.08z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Card Box */}
        {/* Card Box background for light mode */}
        <div className="bg-[var(--color-white)] dark:bg-[var(--color-ocean)] w-full max-w-screen-xl mx-auto px-6 pb-8 rounded-xl shadow-lg">
          {/* Text colors for light mode */}
          <h2 className="text-xl font-bold text-[var(--color-navy)] dark:text-white pt-4">
            Pengaturan Staff
          </h2>
          <p className="text-sm mb-4 text-[var(--color-carbon)] dark:text-white">
            Berikut adalah beberapa pengaturan yang dapat dilakukan oleh admin untuk mengelola staff.
          </p>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-separate border-spacing-y-2">
              <thead>
                {/* Table header text and border colors for light mode */}
                <tr className="text-[var(--color-navy)] dark:text-white font-semibold border-b border-[var(--color-carbon)] dark:border-white">
                  <th className="py-2 px-4">No.</th>
                  <th className="py-2 px-4">Nama</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Aksi</th>
                </tr>
              </thead>
              {/* Table body text color for light mode */}
              <tbody className="text-[var(--color-carbon)] dark:text-white">
                {users.map((user, idx) => (
                  <tr
                    key={idx}
                    // Table row background for light mode
                    className="bg-[var(--color-snow)] dark:bg-[var(--color-midnight)] rounded-lg shadow"
                  >
                    <td className="py-2 px-4">{idx + 1}.</td>
                    <td className="py-2 px-4">{user.name}</td>
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