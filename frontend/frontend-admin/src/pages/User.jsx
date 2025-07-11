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
    <div className="space-y-10"> {/* Removed text-white from here */}
      {/* ADMIN SECTION */}
      <div>
        {/* Header text color for light mode */}
        <h1 className="text-2xl font-extrabold mb-4 text-[var(--color-navy)] dark:text-white">
          ADMIN
        </h1>

        {/* Card Box background for light mode */}
        <div className="bg-[var(--color-snow)] dark:bg-[var(--color-ocean)] w-full max-w-screen-xl mx-auto px-6 rounded-xl shadow-lg">
          {/* Text colors for light mode */}
          <h2 className="text-xl font-bold text-[var(--color-navy)] dark:text-white pt-4">
            Admin Settings
          </h2>
          <p className="text-sm mb-4 text-[var(--color-carbon)] dark:text-white">
            lorem ipsum wkwkwkwkkw
          </p>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-separate border-spacing-y-2">
              <thead>
                {/* Table header text and border colors for light mode */}
                <tr className="text-[var(--color-navy)] dark:text-white font-semibold border-b border-[var(--color-carbon)] dark:border-white">
                  <th className="py-2 px-4">nama</th>
                  <th className="py-2 px-4">email</th>
                  <th className="py-2 px-4">action</th>
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
        <h1 className="text-2xl font-extrabold mb-4 text-[var(--color-navy)] dark:text-white">
          STAFF
        </h1>

        {/* Icon + Dropdown */}
        <div className="flex items-center gap-3 mb-4">
          {/* Icon color for light mode */}
          <BuildingOffice2Icon className="h-6 w-6 text-[var(--color-navy)] dark:text-white" />
          {/* Select styling for light mode */}
          <select className="bg-[var(--color-snow)] text-[var(--color-carbon)] dark:bg-[var(--color-midnight)] dark:text-white text-sm px-4 py-2 rounded-lg shadow focus:outline-none">
            <option>Induk Perusahaan</option>
            <option>Anak Perusahaan</option>
          </select>
        </div>

        {/* Card Box */}
        {/* Card Box background for light mode */}
        <div className="bg-[var(--color-snow)] dark:bg-[var(--color-ocean)] w-full max-w-screen-xl mx-auto px-6 rounded-xl shadow-lg">
          {/* Text colors for light mode */}
          <h2 className="text-xl font-bold text-[var(--color-navy)] dark:text-white pt-4">
            Staff Settings
          </h2>
          <p className="text-sm mb-4 text-[var(--color-carbon)] dark:text-white">
            lorem ipsum wkwkwkkwkw
          </p>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-separate border-spacing-y-2">
              <thead>
                {/* Table header text and border colors for light mode */}
                <tr className="text-[var(--color-navy)] dark:text-white font-semibold border-b border-[var(--color-carbon)] dark:border-white">
                  <th className="py-2 px-4">nama</th>
                  <th className="py-2 px-4">email</th>
                  <th className="py-2 px-4">action</th>
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