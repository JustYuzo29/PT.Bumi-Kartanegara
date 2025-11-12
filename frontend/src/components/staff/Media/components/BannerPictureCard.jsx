import React, { useState } from "react";
import {
  XMarkIcon,
  TrashIcon,
  PencilSquareIcon,
  CheckIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";

// Import komponen Material-UI
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const BannerPictureCard = ({ id, onRemove }) => {
  const [rows, setRows] = useState([
    { id: Date.now(), nama: "", file: null, isEditing: true },
  ]);
  const [error, setError] = useState(""); // State untuk pesan error

  const addRow = () => {
    // LOGIKA TAMBAHAN: Mencegah tambah baris jika ada yang belum disimpan
    const hasUnsavedChanges = rows.some((row) => row.isEditing);
    if (hasUnsavedChanges) {
      setError("Harap simpan perubahan yang ada sebelum menambah baris baru.");
      return;
    }

    setRows((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        nama: "",
        file: null,
        isEditing: true,
      },
    ]);
    setError(""); // Bersihkan error setelah berhasil menambah baris
  };

  const handleChange = (rowId, value) => {
    setRows((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, nama: value } : row))
    );
  };

  const handleFileChange = (rowId, e) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) {
      // Jika user cancel, jangan ubah file yang sudah ada
      e.target.value = null; // Reset input file
      return;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Format gambar harus JPG, PNG, atau WEBP.");
      e.target.value = null; // Reset input file
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setError("Ukuran gambar maksimal 1MB.");
      e.target.value = null; // Reset input file
      return;
    }

    setError(""); // Clear previous error message if any

    setRows((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, file } : row))
    );
  };

  const saveRow = (rowId) => {
    // LOGIKA TAMBAHAN: Validasi input nama tidak boleh kosong
    const currentRow = rows.find((row) => row.id === rowId);
    if (!currentRow.nama.trim()) {
      setError("Nama gambar tidak boleh kosong.");
      return;
    }

    // Opsional: Aktifkan jika file wajib diisi saat menyimpan
    if (!currentRow.file) {
      setError("Anda harus memilih file gambar sebelum menyimpan.");
      return;
    }

    setRows((prev) =>
      prev.map((row) =>
        row.id === rowId ? { ...row, isEditing: false } : row
      )
    );
    setError(""); // Bersihkan error setelah berhasil menyimpan
  };

  const editRow = (rowId) => {
    setRows((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, isEditing: true } : row))
    );
    setError(""); // Bersihkan error saat mengedit
  };

  const deleteRow = (rowId) => {
    // Logika untuk mencegah penghapusan baris terakhir sudah ada dan benar
    if (rows.length <= 1) {
      setError("Tidak dapat menghapus baris terakhir.");
      return;
    }
    setRows((prev) => prev.filter((row) => row.id !== rowId));
    setError(""); // Bersihkan error setelah berhasil menghapus
  };

  return (
    <div className="relative mb-4">
      <div className="absolute left-0 top-0 h-full w-2 rounded-l-lg bg-[var(--color-accent)] dark:bg-[var(--color-button-blue)]"></div>
      <button
        onClick={() => onRemove(id)}
        className="absolute top-3 right-3 p-1 text-gray-400 dark:text-gray-500 z-10"
        title="Hapus Picture Card"
        type="button"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>
      <div className="ml-2 bg-white dark:bg-[var(--color-card-bg)] rounded-lg shadow-elevated px-6 pt-5 pb-6">
        <h3 className="text-lg font-bold mb-1 text-[var(--color-button-blue)]">
          Picture
        </h3>
        <p className="text-[13px] mb-4 text-[var(--color-button-blue)]">
          Unggah gambar dan beri nama.
        </p>

        {/* AREA UNTUK MENAMPILKAN ERROR (Menggunakan MUI Alert) */}
        {error && (
          <Stack sx={{ width: '100%', marginBottom: '1rem' }} spacing={2}>
            <Alert
              severity="warning" // Menggunakan severity "warning"
              // onClose={() => setError("")} // Dihapus: Properto onClose untuk menghilangkan tombol 'x'
              sx={{
                  backgroundColor: 'var(--color-card-secondary)',
                  color: 'var(--color-button-blue)',
                  '.MuiAlert-icon': {
                      color: 'var(--color-accent) !important',
                  },
                  '.MuiAlert-action': {
                      color: 'var(--color-button-blue) !important',
                  },
              }}
            >
              {error}
            </Alert>
          </Stack>
        )}

        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse table-fixed">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-600 text-[var(--color-button-blue)] font-bold">
                <th className="p-2 text-left w-[35%]">
                  Nama
                </th>
                <th className="p-2 text-left w-[45%]">
                  File Gambar
                </th>
                <th className="p-2 text-center w-[20%]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-200 dark:border-gray-500 align-top"
                >
                  <td className="p-2">
                    {row.isEditing ? (
                      <input
                        type="text"
                        className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 focus:outline-none text-[var(--color-button-blue)] bg-transparent"
                        value={row.nama}
                        onChange={(e) => handleChange(row.id, e.target.value)}
                        placeholder="Nama gambar"
                      />
                    ) : (
                      <span className="text-[var(--color-button-blue)] whitespace-pre-wrap">
                        {row.nama}
                      </span>
                    )}
                  </td>
                  <td className="p-2 text-[var(--color-button-blue)]">
                    {row.isEditing ? (
                      <div className="flex items-center gap-2 flex-wrap">
                        <label className="cursor-pointer px-3 py-1 bg-[var(--color-button-blue)] text-white rounded text-xs whitespace-nowrap">
                          Pilih Gambar
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileChange(row.id, e)}
                          />
                        </label>
                        {row.file && (
                          <span className="truncate max-w-[calc(100%-100px)]" title={row.file.name}>
                            {row.file.name}
                          </span>
                        )}
                      </div>
                    ) : row.file ? (
                      <span className="whitespace-pre-wrap">{row.file.name}</span>
                    ) : (
                      <span className="italic text-gray-400">
                        Belum ada gambar
                      </span>
                    )}
                  </td>
                  <td className="p-2">
                    <div className="flex gap-2 justify-center items-center">
                      {row.isEditing ? (
                        <>
                          <button
                            onClick={() => saveRow(row.id)}
                            className="p-1 rounded"
                            title="Simpan"
                          >
                            <CheckIcon className="w-5 h-5 text-green-500" />
                          </button>
                          <button
                            onClick={() => deleteRow(row.id)}
                            className="p-1 rounded"
                            title="Batal"
                          >
                            <XMarkIcon className="w-5 h-5 text-red-500" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => editRow(row.id)}
                            className="p-1 rounded"
                            title="Edit"
                          >
                            <PencilSquareIcon className="w-5 h-5 text-yellow-500" />
                          </button>
                          <button
                            onClick={() => deleteRow(row.id)}
                            className="p-1 rounded"
                            title="Hapus"
                          >
                            <TrashIcon className="w-5 h-5 text-red-500" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={addRow}
          type="button"
          className="flex items-center gap-2 text-[var(--color-button-blue)] font-semibold text-sm"
          title="Tambah Baris"
        >
          <PlusIcon className="w-5 h-5" />
          Tambah Baris
        </button>
      </div>
    </div>
  );
};

export default BannerPictureCard;