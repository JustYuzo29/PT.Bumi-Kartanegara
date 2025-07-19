import React, { useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

const Site = () => {
  const [updates, setUpdates] = useState([
    {
      text: "Jika Kau Bertemu aku begini",
      datetime: "15-08-2025/14.00",
      editedBy: "Jeki",
    },
    {
      text: "Aku tak kau anggap pada cerita",
      datetime: "15-08-2025/14.00",
      editedBy: "Rehan",
    },
  ]);

  const keyMetrics = [
    {
      title: 'Pengunjung Hari Ini',
      value: '1.250',
      trend: '+15%',
      trendColor: 'text-green-500',
      description: 'dari kemarin'
    },
    {
      title: 'Postingan Aktif',
      value: '85',
      trend: 'Stabil',
      trendColor: 'text-gray-500',
      description: 'minggu ini'
    },
    {
      title: 'Komentar Baru',
      value: '12',
      trend: '-5%',
      trendColor: 'text-red-500',
      description: 'dari kemarin'
    },
    {
      title: 'Postingan Terpopuler',
      value: 'Judul Postingan Teratas Ini',
      trend: '5.2K views',
      trendColor: 'text-blue-500',
      description: ''
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState("");

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditedText(updates[index].text);
    setIsModalOpen(true);
  };

  const handleSaveEdit = () => {
    const updated = [...updates];
    updated[editingIndex].text = editedText;
    setUpdates(updated);
    setIsModalOpen(false);
    setEditingIndex(null);
    setEditedText("");
  };

  return (
    <div className="space-y-10">
      {/* VISIT SITE */}
      <div>
        <h1 className="text-2xl font-extrabold mb-4 text-[var(--color-navy)] dark:text-white">
          KUNJUNGI SITUS
        </h1>
        <div className="w-full max-w-screen-xl mx-auto">
          <a
            href="https://blog.site.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center 
                      bg-[var(--color-midnight)] hover:bg-[var(--color-navy)]
                      dark:bg-[var(--color-midnight)] dark:hover:bg-[var(--color-navy)]
                      text-white font-semibold text-sm py-4 rounded-xl shadow transition-colors duration-200"
          >
            KUNJUNGI SITUS BLOG
          </a>
        </div>
      </div>

      {/* METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-screen-xl mx-auto">
        {keyMetrics.map((metric, index) => (
          <div key={index} className="bg-[var(--color-snow)] dark:bg-[var(--color-midnight)] p-4 rounded-xl shadow-md">
            <h3 className="text-sm font-semibold text-[var(--color-navy)] dark:text-white">{metric.title}</h3>
            <p className="text-2xl font-bold text-[var(--color-carbon)] dark:text-white mt-1">
              {metric.value}
            </p>
            <p className="text-sm mt-1">
              <span className={`${metric.trendColor} font-semibold`}>{metric.trend}</span> {metric.description}
            </p>
          </div>
        ))}
      </div>

      {/* UPDATES */}
      <div>
        <h1 className="text-2xl font-extrabold mb-4 text-[var(--color-navy)] dark:text-white">
          UPDATES
        </h1>

        <div className="bg-[var(--color-white)] dark:bg-[var(--color-ocean)] w-full max-w-screen-xl mx-auto px-6 pb-8 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-[var(--color-navy)] dark:text-white pt-4">
            Update Terbaru
          </h2>
          <p className="text-sm mb-6 text-[var(--color-carbon)] dark:text-white">
            Berikut adalah beberapa riwayat update terbaru yang telah dilakukan pada situs ini.
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-separate border-spacing-y-2">
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
                  <tr
                    key={idx}
                    className="bg-[var(--color-snow)] dark:bg-[var(--color-midnight)] rounded-lg shadow"
                  >
                    <td className="py-2 px-4">{idx + 1}.</td>
                    <td className="py-2 px-4">{item.text}</td>
                    <td className="py-2 px-4">{item.datetime}</td>
                    <td className="py-2 px-4">{item.editedBy}</td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => handleEditClick(idx)}
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
      </div>

      {/* MODAL EDIT */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-[var(--color-ocean)] p-6 rounded-lg shadow-xl w-11/12 md:w-1/2 lg:w-1/3">
            <h3 className="text-xl font-semibold mb-4 text-[var(--color-navy)] dark:text-white">Edit Pembaruan</h3>
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm dark:bg-gray-700 dark:text-white"
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-md hover:bg-gray-400 dark:hover:bg-gray-700 transition"
              >
                Batal
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Site;
