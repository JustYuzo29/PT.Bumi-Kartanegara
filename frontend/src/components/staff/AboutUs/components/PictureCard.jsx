import React, { useState } from "react";
import { XMarkIcon, TrashIcon, CheckIcon, PencilSquareIcon, PlusIcon } from "@heroicons/react/24/solid";

const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const PictureCard = ({ id, onRemove }) => {
  const [rows, setRows] = useState([
    { id: Date.now(), name: "", title: "", file: null, preview: "", isEditing: true },
  ]);
  const [error, setError] = useState("");

  const addRow = () => {
    setRows((prev) => [...prev, { id: Date.now() + Math.random(), name: "", title: "", file: null, preview: "", isEditing: true }]);
  };

  const handleChange = (id, field, value) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const handleFileChange = (id, e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Format gambar harus JPG, PNG, atau WEBP");
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setError("Ukuran gambar maksimal 1MB");
      return;
    }
    const preview = URL.createObjectURL(file);
    setError("");
    setRows((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, file, preview, isEditing: true } : row
      )
    );
  };

  const saveRow = (id) => {
    // Validasi minimal ada nama & title
    const row = rows.find((r) => r.id === id);
    if (!row.name.trim() || !row.title.trim()) {
      setError("Nama dan title wajib diisi");
      return;
    }
    if (!row.file && !row.preview) {
      setError("Wajib upload gambar");
      return;
    }
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, isEditing: false } : row))
    );
    setError("");
  };

  const editRow = (id) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, isEditing: true } : row))
    );
    setError("");
  };

  const deleteRow = (id) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
    setError("");
  };

  const removeImage = (id) => {
    setRows((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, file: null, preview: "" } : row
      )
    );
  };

  return (
    <div className="relative mb-4">
      <div className="absolute left-0 top-0 h-full w-2 rounded-l-lg bg-[var(--color-accent)] dark:bg-[var(--color-button-blue)]"></div>
      <button
        onClick={() => onRemove(id)}
        className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 z-10"
        title="Hapus Picture Card"
        aria-label="Hapus Picture Card"
        type="button"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>
      <div className="ml-2 bg-white dark:bg-[var(--color-card-bg)] rounded-lg shadow-elevated px-6 pt-5 pb-6">
        <h3 className="text-lg font-bold mb-1 text-[var(--color-button-blue)]">Picture</h3>
        <p className="text-[13px] mb-4 text-[var(--color-button-blue)]">
          Tambahkan gambar sesuai kebutuhan.
        </p>

        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-600 text-[var(--color-button-blue)]">
                <th className="text-left p-2 font-semibold">nama</th>
                <th className="text-left p-2 font-semibold">title</th>
                <th className="text-left p-2 font-semibold">gambar</th>
                <th className="text-center p-2 font-semibold">aksi</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-200 dark:border-gray-500"
                >
                  <td className="p-2">
                    {row.isEditing ? (
                      <input
                        type="text"
                        className="w-full px-2 py-1 rounded border focus:outline-none text-[var(--color-button-blue)]"
                        value={row.name}
                        onChange={(e) =>
                          handleChange(row.id, "name", e.target.value)
                        }
                      />
                    ) : (
                      row.name
                    )}
                  </td>
                  <td className="p-2">
                    {row.isEditing ? (
                      <input
                        type="text"
                        className="w-full px-2 py-1 rounded border focus:outline-none text-[var(--color-button-blue)]"
                        value={row.title}
                        onChange={(e) =>
                          handleChange(row.id, "title", e.target.value)
                        }
                      />
                    ) : (
                      row.title
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
                            onChange={(e) => handleFileChange(row.id, e)}
                          />
                        </label>
                        {row.preview && (
                          <img
                            src={row.preview}
                            alt="preview"
                            className="w-12 h-12 rounded object-cover border ml-2 inline-block"
                          />
                        )}
                        {row.file && (
                          <button
                            onClick={() => removeImage(row.id)}
                            className="ml-2 text-red-500 hover:text-red-700"
                            title="Hapus gambar"
                          >
                            <TrashIcon className="inline w-5 h-5" />
                          </button>
                        )}
                      </>
                    ) : (
                      <>
                        {row.preview && (
                          <img
                            src={row.preview}
                            alt={row.fileName}
                            className="w-12 h-12 rounded object-cover border"
                          />
                        )}
                      </>
                    )}
                  </td>
                  <td className="p-2 flex justify-center gap-2">
                    {row.isEditing ? (
                      <>
                        <button
                          onClick={() => saveRow(row.id)}
                          className="p-1 rounded hover:bg-green-100"
                          title="Simpan"
                        >
                          <CheckIcon className="w-5 h-5 text-green-500" />
                        </button>
                        <button
                          onClick={() => editRow(row.id)}
                          className="p-1 rounded hover:bg-red-100"
                          title="Batal"
                        >
                          <XMarkIcon className="w-5 h-5 text-red-500" />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => editRow(row.id)}
                        className="p-1 rounded hover:bg-[var(--color-accent)]"
                        title="Edit"
                      >
                        <PencilSquareIcon className="w-5 h-5 text-yellow-500" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteRow(row.id)}
                      className="p-1 rounded hover:bg-red-100"
                      title="Hapus"
                    >
                      <XMarkIcon className="w-5 h-5 text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={addRow}
          className="flex items-center gap-2 text-[var(--color-button-blue)] hover:text-[var(--color-accent)] font-semibold"
          title="Tambah Baris"
          type="button"
        >
          <PlusIcon className="w-5 h-5" />
          Tambah Baris
        </button>

        <div className="flex gap-4 mt-4">
          <button className="btn-primary rounded-full shadow min-w-[100px]">Simpan</button>
          <button
            className="btn-primary rounded-full shadow min-w-[100px]"
            onClick={() => onRemove(id)}
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default PictureCard;
