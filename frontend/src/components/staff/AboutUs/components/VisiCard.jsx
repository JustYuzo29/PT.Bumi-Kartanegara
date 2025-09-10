import React, { useState } from "react";
import {
  XMarkIcon,
  TrashIcon,
  CheckIcon,
  PencilSquareIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";

const VisiCard = ({ id, onRemove }) => {
  // Baris Picture: nama, title (readonly: nama file gambar), upload/hapus
  const [pictureRows, setPictureRows] = useState([
    {
      id: Date.now() + Math.random(),
      nama: "",
      file: null,
      isEditing: true,
    },
  ]);
  // Title rows (biasa)
  const [titleRows, setTitleRows] = useState([
    {
      id: Date.now() + Math.random(),
      nama: "",
      isEditing: true,
    },
  ]);
  // Desc rows (biasa)
  const [descRows, setDescRows] = useState([
    {
      id: Date.now() + Math.random(),
      nama: "",
      isEditing: true,
    },
  ]);

  // Tambah baris
  const addRow = (rows, setRows, withFile = false) => {
    setRows((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        nama: "",
        ...(withFile ? { file: null } : {}),
        isEditing: true,
      },
    ]);
  };

  // Input handler
  const handleChange = (rows, setRows, rowId, value) => {
    setRows((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, nama: value } : row))
    );
  };

  // File upload handler
  const handleFileChange = (rowId, e) => {
    const file = e.target.files[0];
    setPictureRows((prev) =>
      prev.map((row) =>
        row.id === rowId ? { ...row, file, isEditing: true } : row
      )
    );
  };

  // Save baris
  const saveRow = (rows, setRows, rowId) => {
    setRows((prev) =>
      prev.map((row) =>
        row.id === rowId ? { ...row, isEditing: false } : row
      )
    );
  };

  // Edit baris
  const editRow = (rows, setRows, rowId) => {
    setRows((prev) =>
      prev.map((row) =>
        row.id === rowId ? { ...row, isEditing: true } : row
      )
    );
  };

  // Hapus baris
  const deleteRow = (rows, setRows, rowId) => {
    setRows((prev) => prev.filter((row) => row.id !== rowId));
  };

  return (
    <div className="relative mb-4">
      <div className="absolute left-0 top-0 h-full w-2 rounded-l-lg bg-[var(--color-accent)] dark:bg-[var(--color-button-blue)]"></div>
      <button
        onClick={() => onRemove(id)}
        className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 z-10"
        title="Hapus Visi"
        aria-label="Hapus Visi"
        type="button"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>
      <div className="ml-2 bg-white dark:bg-[var(--color-card-bg)] rounded-lg shadow-elevated px-6 pt-5 pb-6">
        <h3 className="text-lg font-bold mb-1 text-[var(--color-button-blue)] uppercase">VISI</h3>
        <p className="text-[13px] mb-4 text-[var(--color-button-blue)]"></p>
        
        {/* TABEL PICTURE */}
        <table className="w-full text-sm mb-2 border-collapse">
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-600">
              <th className="p-2 font-semibold text-left text-[var(--color-button-blue)]">Picture</th>
              <th className="p-2 font-semibold text-left text-[var(--color-button-blue)]">nama</th>
              <th className="p-2 font-semibold text-left text-[var(--color-button-blue)]">title</th>
              <th className="p-2 font-semibold text-center text-[var(--color-button-blue)]">action</th>
            </tr>
          </thead>
          <tbody>
            {pictureRows.map((row) => (
              <tr key={row.id} className="border-b border-gray-200 dark:border-gray-500">
                <td className="p-2 font-semibold text-[var(--color-button-blue)]">picture</td>
                <td className="p-2">
                  {row.isEditing ? (
                    <input
                      type="text"
                      className="w-full px-2 py-1 rounded border focus:outline-none text-[var(--color-button-blue)]"
                      value={row.nama}
                      onChange={(e) => handleChange(pictureRows, setPictureRows, row.id, e.target.value)}
                      placeholder="nama"
                    />
                  ) : (
                    <span className="text-[var(--color-button-blue)]">{row.nama}</span>
                  )}
                </td>
                <td className="p-2">
                  {row.isEditing ? (
                    <>
                      <label className="inline-block cursor-pointer px-3 py-1 bg-[var(--color-button-blue)] text-white rounded text-xs">
                        Pilih Gambar
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={e => handleFileChange(row.id, e)}
                        />
                      </label>
                      {row.file && (
                        <span className="ml-2 text-[var(--color-button-blue)]">{row.file.name}</span>
                      )}
                    </>
                  ) : (
                    row.file ? (
                      <span className="text-[var(--color-button-blue)]">{row.file.name}</span>
                    ) : (
                      <span className="italic text-gray-400">Belum ada gambar</span>
                    )
                  )}
                </td>
                <td className="p-2 flex gap-2 justify-center">
                  {row.isEditing ? (
                    <button
                      onClick={() => saveRow(pictureRows, setPictureRows, row.id)}
                      className="p-1 rounded hover:bg-green-100"
                      title="Simpan"
                    >
                      <CheckIcon className="w-5 h-5 text-green-500" />
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => editRow(pictureRows, setPictureRows, row.id)}
                        className="p-1 rounded hover:bg-[var(--color-accent)]"
                        title="Edit"
                      >
                        <PencilSquareIcon className="w-5 h-5 text-yellow-500" />
                      </button>
                      <button
                        onClick={() => deleteRow(pictureRows, setPictureRows, row.id)}
                        className="p-1 rounded hover:bg-red-100"
                        title="Hapus"
                      >
                        <TrashIcon className="w-5 h-5 text-red-500" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={() => addRow(pictureRows, setPictureRows, true)}
          type="button"
          className="flex items-center gap-2 text-[var(--color-button-blue)] hover:text-[var(--color-accent)] font-semibold mb-3"
        >
          <PlusIcon className="w-5 h-5" />
          Tambah Baris Picture
        </button>

        {/* TABEL TITLE */}
        <table className="w-full text-sm mb-2 border-collapse">
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-600">
              <th className="p-2 font-semibold text-left text-[var(--color-button-blue)]">Title</th>
              <th className="p-2 font-semibold text-left text-[var(--color-button-blue)]">nama</th>
              <th className="p-2 font-semibold text-center text-[var(--color-button-blue)]">action</th>
            </tr>
          </thead>
          <tbody>
            {titleRows.map((row) => (
              <tr key={row.id} className="border-b border-gray-200 dark:border-gray-500">
                <td className="p-2 font-semibold text-[var(--color-button-blue)]">title</td>
                <td className="p-2">
                  {row.isEditing ? (
                    <input
                      type="text"
                      className="w-full px-2 py-1 rounded border focus:outline-none text-[var(--color-button-blue)]"
                      value={row.nama}
                      onChange={(e) => handleChange(titleRows, setTitleRows, row.id, e.target.value)}
                      placeholder="nama"
                    />
                  ) : (
                    <span className="text-[var(--color-button-blue)]">{row.nama}</span>
                  )}
                </td>
                <td className="p-2 flex gap-2 justify-center">
                  {row.isEditing ? (
                    <button
                      onClick={() => saveRow(titleRows, setTitleRows, row.id)}
                      className="p-1 rounded hover:bg-green-100"
                      title="Simpan"
                    >
                      <CheckIcon className="w-5 h-5 text-green-500" />
                    </button>
                  ) : (
                    <button
                      onClick={() => editRow(titleRows, setTitleRows, row.id)}
                      className="p-1 rounded hover:bg-[var(--color-accent)]"
                      title="Edit"
                    >
                      <PencilSquareIcon className="w-5 h-5 text-yellow-500" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={() => addRow(titleRows, setTitleRows, false)}
          type="button"
          className="flex items-center gap-2 text-[var(--color-button-blue)] hover:text-[var(--color-accent)] font-semibold mb-3"
        >
          <PlusIcon className="w-5 h-5" />
          Tambah Baris Title
        </button>

        {/* TABEL DESCRIPTION */}
        <table className="w-full text-sm mb-2 border-collapse">
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-600">
              <th className="p-2 font-semibold text-left text-[var(--color-button-blue)]">Description</th>
              <th className="p-2 font-semibold text-left text-[var(--color-button-blue)]">nama</th>
              <th className="p-2 font-semibold text-center text-[var(--color-button-blue)]">action</th>
            </tr>
          </thead>
          <tbody>
            {descRows.map((row) => (
              <tr key={row.id} className="border-b border-gray-200 dark:border-gray-500">
                <td className="p-2 font-semibold text-[var(--color-button-blue)]">desc</td>
                <td className="p-2">
                  {row.isEditing ? (
                    <textarea
                      rows={2}
                      className="w-full px-2 py-1 rounded border focus:outline-none text-[var(--color-button-blue)] resize-none"
                      value={row.nama}
                      onChange={(e) => handleChange(descRows, setDescRows, row.id, e.target.value)}
                      placeholder="nama"
                    />
                  ) : (
                    <span className="text-[var(--color-button-blue)]">{row.nama}</span>
                  )}
                </td>
                <td className="p-2 flex gap-2 justify-center">
                  {row.isEditing ? (
                    <button
                      onClick={() => saveRow(descRows, setDescRows, row.id)}
                      className="p-1 rounded hover:bg-green-100"
                      title="Simpan"
                    >
                      <CheckIcon className="w-5 h-5 text-green-500" />
                    </button>
                  ) : (
                    <button
                      onClick={() => editRow(descRows, setDescRows, row.id)}
                      className="p-1 rounded hover:bg-[var(--color-accent)]"
                      title="Edit"
                    >
                      <PencilSquareIcon className="w-5 h-5 text-yellow-500" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={() => addRow(descRows, setDescRows, false)}
          type="button"
          className="flex items-center gap-2 text-[var(--color-button-blue)] hover:text-[var(--color-accent)] font-semibold"
        >
          <PlusIcon className="w-5 h-5" />
          Tambah Baris Desc
        </button>
      </div>
    </div>
  );
};

export default VisiCard;
