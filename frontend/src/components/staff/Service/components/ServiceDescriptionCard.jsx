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

const ServiceDescriptionCard = ({ id, onRemove }) => {
  const [rows, setRows] = useState([
    { id: Date.now(), nama: "", title: "", isEditing: true }, // State awal dengan satu baris dalam mode edit
  ]);
  const [error, setError] = useState(""); // State untuk pesan error

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
    setError(""); // Bersihkan error setelah berhasil menambah baris
  };

  const handleChange = (rowId, field, value) => {
    setRows((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, [field]: value } : row))
    );
  };

  const saveRow = (rowId) => {
    const currentRow = rows.find((row) => row.id === rowId);
    if (!currentRow.nama.trim() || !currentRow.title.trim()) {
      setError("Nama dan Title wajib diisi.");
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
        // DIUBAH: Efek hover dihapus, gunakan XMarkIcon
        className="absolute top-3 right-3 p-1 text-gray-400 dark:text-gray-500 z-10"
        title="Hapus Description"
        aria-label="Hapus Description"
        type="button"
      >
        <XMarkIcon className="w-5 h-5" /> {/* Menggunakan Heroicons XMarkIcon */}
      </button>
      <div className="ml-2 bg-white dark:bg-[var(--color-card-bg)] rounded-lg shadow-elevated px-6 pt-5 pb-6">
        <h3 className="text-lg font-bold mb-1 text-[var(--color-button-blue)]">Description</h3>
        <p className="text-[13px] mb-4 text-[var(--color-button-blue)]">
          Tambahkan nama dan deskripsi untuk setiap layanan.
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
          <table className="w-full text-sm border-collapse table-fixed"> {/* Added table-fixed */}
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-600 text-[var(--color-button-blue)] font-bold">
                <th className="p-2 text-left w-[45%]"> {/* Sesuaikan lebar kolom */}
                  Nama
                </th>
                <th className="p-2 text-left w-[35%]"> {/* Sesuaikan lebar kolom */}
                  Title
                </th>
                <th className="p-2 text-center w-[20%]"> {/* Sesuaikan lebar kolom */}
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-200 dark:border-gray-500 align-top" // Added align-top
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
                        placeholder="Nama"
                      />
                    ) : (
                      <span className="text-[var(--color-button-blue)] whitespace-pre-wrap"> {/* Added whitespace-pre-wrap */}
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
                        placeholder="Deskripsi"
                      />
                    ) : (
                      <span className="text-[var(--color-button-blue)] whitespace-pre-wrap"> {/* Added whitespace-pre-wrap */}
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
                            className="p-1 rounded" // Removed hover
                            title="Simpan"
                          >
                            <CheckIcon className="w-5 h-5 text-green-500" />
                          </button>
                          <button
                            onClick={() => editRow(row.id)} // Menggunakan editRow sebagai "Batal" untuk kembali ke mode view tanpa save
                            className="p-1 rounded" // Removed hover
                            title="Batal"
                          >
                            <XMarkIcon className="w-5 h-5 text-red-500" /> {/* Warna tetap merah */}
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => editRow(row.id)}
                            className="p-1 rounded" // Removed hover
                            title="Edit"
                          >
                            <PencilSquareIcon className="w-5 h-5 text-yellow-500" />
                          </button>
                          <button
                            onClick={() => deleteRow(row.id)}
                            className="p-1 rounded" // Removed hover
                            title="Hapus"
                          >
                            <TrashIcon className="w-5 h-5 text-red-500" /> {/* Warna tetap merah */}
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

        {/* Tombol untuk menambah baris */}
        <button
          onClick={addRow}
          type="button"
          className="flex items-center gap-2 text-[var(--color-button-blue)] font-semibold text-sm" // Removed hover
          title="Tambah Baris"
        >
          <PlusIcon className="w-5 h-5" />
          Tambah Baris
        </button>
      </div>
    </div>
  );
};

export default ServiceDescriptionCard;