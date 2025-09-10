import React, { useState } from "react";
import { PencilSquareIcon, PlusIcon, XMarkIcon, CheckIcon } from "@heroicons/react/24/solid";

const TitleCard = ({ id, onRemove }) => {
  const [rows, setRows] = useState([
    { id: Date.now(), nama: "", title: "", isEditing: true },
  ]);

  // Tambah baris baru (kosong)
  const addRow = () => {
    setRows((prev) => [...prev, { id: Date.now() + Math.random(), nama: "", title: "", isEditing: true }]);
  };

  // Update input
  const handleChange = (id, field, value) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  // Simpan baris (non-editing)
  const saveRow = (id) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, isEditing: false } : row))
    );
  };

  // Edit baris (bisa ubah kembali)
  const editRow = (id) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, isEditing: true } : row))
    );
  };

  // Hapus baris
  const deleteRow = (id) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  return (
    <div className="relative mb-4">
      {/* Garis aksen kiri */}
      <div className="absolute left-0 top-0 h-full w-2 rounded-l-lg bg-[var(--color-accent)] dark:bg-[var(--color-button-blue)]"></div>
      {/* Tombol hapus card */}
      <button
        onClick={() => onRemove(id)}
        className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 z-10"
        aria-label="Hapus Title Card"
        title="Hapus Title Card"
        type="button"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>

      <div className="ml-2 bg-white dark:bg-[var(--color-card-bg)] rounded-lg shadow-elevated px-6 pt-5 pb-6">
        <h3 className="text-lg font-bold mb-1 text-[var(--color-button-blue)]">Title</h3>
        <p className="text-[13px] mb-4 text-[var(--color-button-blue)]">Masukkan judul dan nama pada tabel di bawah.</p>

        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-600 text-[var(--color-button-blue)]">
                <th className="text-left p-2 font-semibold">nama</th>
                <th className="text-left p-2 font-semibold">title</th>
                <th className="text-center p-2 font-semibold">action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-gray-200 dark:border-gray-500">
                  <td className="p-2">
                    {row.isEditing ? (
                      <input
                        type="text"
                        className="w-full px-2 py-1 rounded border focus:outline-none text-[var(--color-button-blue)]"
                        value={row.nama}
                        onChange={(e) => handleChange(row.id, "nama", e.target.value)}
                      />
                    ) : (
                      row.nama
                    )}
                  </td>
                  <td className="p-2">
                    {row.isEditing ? (
                      <input
                        type="text"
                        className="w-full px-2 py-1 rounded border focus:outline-none text-[var(--color-button-blue)]"
                        value={row.title}
                        onChange={(e) => handleChange(row.id, "title", e.target.value)}
                      />
                    ) : (
                      row.title
                    )}
                  </td>
                  <td className="p-2 flex justify-center gap-2">
                    {row.isEditing ? (
                      <button
                        onClick={() => saveRow(row.id)}
                        title="Simpan"
                        className="p-1 rounded hover:bg-green-100"
                      >
                        <CheckIcon className="w-5 h-5 text-green-500" />
                      </button>
                    ) : (
                      <button
                        onClick={() => editRow(row.id)}
                        title="Edit"
                        className="p-1 rounded hover:bg-[var(--color-accent)]"
                      >
                        <PencilSquareIcon className="w-5 h-5 text-yellow-500" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteRow(row.id)}
                      title="Hapus"
                      className="p-1 rounded hover:bg-red-100"
                    >
                      <XMarkIcon className="w-5 h-5 text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tombol tambah baris */}
        <button
          onClick={addRow}
          className="flex items-center gap-2 text-[var(--color-button-blue)] hover:text-[var(--color-accent)] font-semibold"
          title="Tambah baris"
          type="button"
        >
          <PlusIcon className="w-5 h-5" />
          Tambah Baris
        </button>

        <div className="flex gap-4 mt-4">
          <button className="btn-primary rounded-full shadow min-w-[100px]">simpan</button>
          <button
            className="btn-primary rounded-full shadow min-w-[100px]"
            onClick={() => onRemove(id)}
          >
            hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default TitleCard;
