// components/site/UpdatesTable.jsx
import React from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

const UpdatesTable = ({ updates, onEdit }) => (
  <section>
    <h2 className="text-2xl font-extrabold text-[var(--color-navy)] dark:text-white mb-4">UPDATES</h2>
    <div className="bg-white dark:bg-[var(--color-ocean)] p-6 rounded-xl shadow-lg space-y-4">
      <h3 className="text-xl font-bold text-[var(--color-navy)] dark:text-white">Update Terbaru</h3>
      <p className="text-sm text-[var(--color-carbon)] dark:text-white">
        Berikut adalah beberapa riwayat update terbaru yang telah dilakukan pada situs ini.
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-separate border-spacing-y-2">
          <thead>
            <tr className="text-[var(--color-navy)] dark:text-white font-semibold border-b border-[var(--color-carbon)] dark:border-white">
              <th className="py-2 px-4">No.</th>
              <th className="py-2 px-4">Pembaruan</th>
              <th className="py-2 px-4">Tanggal/Waktu</th>
              <th className="py-2 px-4">Diedit Oleh</th>
              <th className="py-2 px-4">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-[var(--color-carbon)] dark:text-white">
            {updates.map((item, idx) => (
              <tr key={idx} className="bg-[var(--color-snow)] dark:bg-[var(--color-midnight)] rounded-lg shadow">
                <td className="py-2 px-4">{idx + 1}.</td>
                <td className="py-2 px-4">{item.text}</td>
                <td className="py-2 px-4">{item.datetime}</td>
                <td className="py-2 px-4">{item.editedBy}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => onEdit(idx)}
                    title="Edit Update"
                    className="text-blue-500 hover:text-blue-700 transition"
                  >
                    <PencilSquareIcon className="h-5 w-5 inline-block" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

export default UpdatesTable;