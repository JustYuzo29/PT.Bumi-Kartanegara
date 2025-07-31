// components/user/UserTable.jsx
import React from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

const UserTable = ({ title, users, onEdit, onDelete }) => (
  <div className="space-y-4">
    <p className="text-sm mb-4 text-[var(--color-carbon)] dark:text-white">
      Berikut adalah beberapa pengaturan yang dapat dilakukan oleh admin untuk mengelola {title.toLowerCase()}.
    </p>
    <div className="overflow-x-auto">
      <table className="min-w-full text-left border-separate border-spacing-y-2">
        <thead>
          <tr className="text-[var(--color-navy)] dark:text-white font-semibold border-b border-[var(--color-carbon)] dark:border-white">
            <th className="py-2 px-4">No.</th>
            <th className="py-2 px-4">Nama</th>
            <th className="py-2 px-4">Email</th>
            {/* <th className="py-2 px-4">Password</th> */}
            <th className="py-2 px-4">Aksi</th>
          </tr>
        </thead>
        <tbody className="text-[var(--color-carbon)] dark:text-white">
          {users.map((user, idx) => (
            <tr
              key={user.id}
              className="bg-[var(--color-snow)] dark:bg-[var(--color-midnight)] rounded-lg shadow"
            >
              <td className="py-2 px-4">{idx + 1}.</td>
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4 space-x-2">
                <PencilSquareIcon
                  className="h-5 w-5 inline-block text-yellow-400 hover:text-yellow-500 cursor-pointer"
                  onClick={() =>
                    onEdit({
                      id: user.id,
                      name: user.name,
                      email: user.email,
                      tipe: user.tipe,
                      // ⛔️ password tidak diteruskan
                    })
                  }
                />
                <TrashIcon
                  className="h-5 w-5 inline-block text-red-500 hover:text-red-600 cursor-pointer"
                  onClick={() => onDelete(user.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default UserTable;