import React, { useState } from "react";
import {
  XMarkIcon,
  PencilSquareIcon,
  CheckIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";

// Import komponen Material-UI
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const BannerTitleCard = ({ id, onRemove }) => {
  const [rows, setRows] = useState([
    { id: Date.now(), nama: "", title: "", isEditing: true },
  ]);
  const [error, setError] = useState(""); // State untuk pesan error

  // FUNGSI BARU: Menambah baris
  const addRow = () => {
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
        title: "",
        isEditing: true,
      },
    ]);
    setError("");
  };

  const handleChange = (rowId, field, value) => {
    setRows((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, [field]: value } : row))
    );
  };

  const saveRow = (rowId) => {
    const currentRow = rows.find((row) => row.id === rowId);
    if (!currentRow.nama.trim() || !currentRow.title.trim()) {
      setError("Nama dan Title tidak boleh kosong.");
      return;
    }
    setRows((prev) =>
      prev.map((row) =>
        row.id === rowId ? { ...row, isEditing: false } : row
      )
    );
    setError("");
  };

  const editRow = (rowId) => {
    setRows((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, isEditing: true } : row))
    );
    setError("");
  };

  const deleteRow = (rowId) => {
    if (rows.length <= 1) {
      setError("Tidak dapat menghapus baris terakhir.");
      return;
    }
    setRows((prev) => prev.filter((row) => row.id !== rowId));
    setError("");
  };

  return (
    <div className="relative mb-4">
      <div className="absolute left-0 top-0 h-full w-2 rounded-l-lg bg-[var(--color-accent)] dark:bg-[var(--color-button-blue)]"></div>
      <button
        onClick={() => onRemove(id)}
        className="absolute top-3 right-3 p-1 text-gray-400 dark:text-gray-500 z-10"
        title="Hapus Title"
        type="button"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>
      <div className="ml-2 bg-white dark:bg-[var(--color-card-bg)] rounded-lg shadow-elevated px-6 pt-5 pb-6">
        <h3 className="text-lg font-bold mb-1 text-[var(--color-button-blue)]">
          Title
        </h3>
        <p className="text-[13px] mb-4 text-[var(--color-button-blue)]">
          Tambahkan nama dan judul untuk setiap galeri.
        </p>

        {/* AREA UNTUK MENAMPILKAN ERROR (Menggunakan MUI Alert) */}
        {error && (
          <Stack sx={{ width: '100%', marginBottom: '1rem' }} spacing={2}>
            <Alert
              severity="warning" // Menggunakan severity "warning"
              // onClose={() => setError("")} // DIHAPUS: Properto onClose untuk menghilangkan tombol 'x'
              sx={{
                  backgroundColor: 'var(--color-card-secondary)',
                  color: 'var(--color-button-blue)',
                  '.MuiAlert-icon': {
                      color: 'var(--color-accent) !important',
                  },
                  '.MuiAlert-action': { // Ini mungkin tidak berlaku jika onClose dihapus, tapi biarkan saja
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
                <th className="p-2 text-left w-[45%]">
                  Nama
                </th>
                <th className="p-2 text-left w-[35%]">
                  Title
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
                        onChange={(e) =>
                          handleChange(row.id, "nama", e.target.value)
                        }
                        placeholder="nama"
                      />
                    ) : (
                      <span className="text-[var(--color-button-blue)] whitespace-pre-wrap">
                        {row.nama}
                      </span>
                    )}
                  </td>
                  <td className="p-2">
                    {row.isEditing ? (
                      <input
                        type="text"
                        className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 focus:outline-none text-[var(--color-button-blue)] bg-transparent"
                        value={row.title}
                        onChange={(e) =>
                          handleChange(row.id, "title", e.target.value)
                        }
                        placeholder="title"
                      />
                    ) : (
                      <span className="text-[var(--color-button-blue)] whitespace-pre-wrap">
                        {row.title}
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

export default BannerTitleCard;