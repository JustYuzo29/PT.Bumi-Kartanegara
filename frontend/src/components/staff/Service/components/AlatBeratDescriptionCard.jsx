import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

// Import komponen Material-UI
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const AlatBeratDescriptionCard = ({ id, onRemove }) => {
  // State untuk teks deskripsi
  const [descriptionText, setDescriptionText] = useState("");
  // State untuk melacak mode edit atau view
  const [isEditing, setIsEditing] = useState(true);
  // State untuk mengelola notifikasi (Alert)
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    severity: "info", // 'success', 'warning', 'info', 'error'
    message: "",
  });

  /**
   * Menangani penyimpanan deskripsi.
   */
  const handleSave = () => {
    if (!descriptionText.trim()) {
      setAlertInfo({
        open: true,
        severity: "warning",
        message: "Deskripsi tidak boleh kosong.",
      });
      return;
    }
    setIsEditing(false); // Beralih ke mode view
    setAlertInfo({
      open: true,
      severity: "success",
      message: "Deskripsi berhasil disimpan!",
    });
    // TODO: Kirim 'descriptionText' ke backend di sini
  };

  /**
   * Beralih kembali ke mode edit.
   */
  const handleEdit = () => {
    setIsEditing(true);
    setAlertInfo({ open: false, severity: "info", message: "" });
  };

  /**
   * Membersihkan isi textarea.
   * Saya ganti nama tombolnya menjadi "bersihkan" agar lebih sesuai dengan fungsinya.
   */
  const handleClearContent = () => {
    setDescriptionText("");
  };

  /**
   * Menghapus seluruh card.
   */
  const handleDeleteCard = () => {
    onRemove(id);
  };

  return (
    <div className="relative mb-4">
      <div className="absolute left-0 top-0 h-full w-2 rounded-l-lg bg-[var(--color-accent)] dark:bg-[var(--color-button-blue)]"></div>
      <button
        onClick={() => onRemove(id)}
        className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-500 z-10"
        title="Hapus Description"
        aria-label="Hapus Description"
        type="button"
      >
        {/* Menggunakan ikon XMarkIcon agar konsisten */ }
        <XMarkIcon className="w-5 h-5" />
      </button>
      <div className="ml-2 bg-white dark:bg-[var(--color-card-bg)] rounded-lg shadow-elevated px-6 pt-5 pb-6">
        <h3 className="text-lg font-bold mb-1 text-[var(--color-button-blue)]">Description</h3>
        <p className="text-[13px] mb-4 text-[var(--color-button-blue)]">
          Isi deskripsi untuk kartu alat berat ini.
        </p>

        {/* Area untuk menampilkan notifikasi MUI Alert */}
        {alertInfo.open && (
          <Stack sx={{ width: '100%', marginBottom: '1rem' }} spacing={2}>
            <Alert
              severity={alertInfo.severity}
              onClose={() => setAlertInfo({ ...alertInfo, open: false })}
            >
              {alertInfo.message}
            </Alert>
          </Stack>
        )}

        {/* Tampilan kondisional: textarea untuk edit, div untuk view */}
        {isEditing ? (
          <textarea
            rows={4}
            className="w-full bg-gray-50 dark:bg-[var(--color-card-secondary)] px-4 py-2 rounded mb-4 border border-gray-200 dark:border-gray-600 focus:outline-none text-[var(--color-button-blue)] resize-y"
            value={descriptionText}
            onChange={(e) => setDescriptionText(e.target.value)}
            placeholder="Masukkan deskripsi di sini..."
          />
        ) : (
          <div className="bg-gray-50 dark:bg-[var(--color-card-secondary)] px-4 py-2 rounded mb-4 border border-gray-200 dark:border-gray-600">
            <p className="text-[15px] font-semibold mb-1 text-[var(--color-button-blue)] whitespace-pre-wrap">
              {descriptionText || "Belum ada deskripsi."}
            </p>
          </div>
        )}

        {/* Tombol kondisional */}
        <div className="flex gap-4">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="btn-primary rounded-full shadow min-w-[100px]">simpan</button>
              {/* Tombol kedua saat edit adalah untuk membersihkan textarea, bukan menghapus card */}
              <button onClick={handleClearContent} className="btn-primary rounded-full shadow min-w-[100px]">bersihkan</button>
            </>
          ) : (
            <>
              <button onClick={handleEdit} className="btn-primary rounded-full shadow min-w-[100px]">edit</button>
              {/* Tombol hapus dikembalikan ke style aslinya */}
              <button onClick={handleDeleteCard} className="btn-primary rounded-full shadow min-w-[100px]">hapus</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default AlatBeratDescriptionCard;
