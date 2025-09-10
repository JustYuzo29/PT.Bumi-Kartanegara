import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

// Import komponen Material-UI
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const LineTitleCard = ({ id, onRemove }) => {
  // State untuk teks judul
  const [title, setTitle] = useState("");
  // State untuk menyimpan judul original saat edit
  const [originalTitle, setOriginalTitle] = useState("");
  // State untuk mode edit dan notifikasi
  const [isEditing, setIsEditing] = useState(true);
  const [alertInfo, setAlertInfo] = useState({ open: false, severity: 'info', message: '' });

  // Fungsi untuk menampilkan notifikasi
  const showAlert = (severity, message) => {
    setAlertInfo({ open: true, severity, message });
    setTimeout(() => setAlertInfo({ open: false, severity: 'info', message: '' }), 3000);
  };

  // Mengaktifkan mode edit
  const handleEdit = () => {
    setOriginalTitle(title);
    setIsEditing(true);
  };

  // Membatalkan editan
  const handleCancel = () => {
    setTitle(originalTitle);
    if (originalTitle) {
      setIsEditing(false);
    }
  };

  // Menyimpan perubahan
  const handleSave = () => {
    if (!title.trim()) {
      showAlert('warning', 'Judul tidak boleh kosong.');
      return;
    }
    setIsEditing(false);
    setOriginalTitle(title); // Update original title
    showAlert('success', 'Judul berhasil disimpan!');
    // TODO: Kirim 'title' ke backend Anda
  };

  return (
    <div className="relative mb-4">
      <div className="absolute left-0 top-0 h-full w-2 rounded-l-lg bg-[var(--color-accent)] dark:bg-[var(--color-button-blue)]"></div>
      <button
        onClick={() => onRemove(id)}
        className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-500 z-10"
        title="Hapus Title"
        aria-label="Hapus Title"
        type="button"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>
      <div className="ml-2 bg-white dark:bg-[var(--color-card-bg)] rounded-lg shadow-elevated px-6 pt-5 pb-6">
        <h3 className="text-lg font-bold mb-1 text-[var(--color-button-blue)]">Title</h3>
        <p className="text-[13px] mb-4 text-[var(--color-button-blue)]">
          Kelola judul untuk bagian ini.
        </p>
        
        {/* Area Notifikasi MUI Alert */}
        {alertInfo.open && (
            <Stack sx={{ width: '100%', marginBottom: '1rem' }} spacing={2}>
              <Alert severity={alertInfo.severity}>
                {alertInfo.message}
              </Alert>
            </Stack>
        )}

        <div className="border-b border-gray-200 dark:border-gray-600 mb-3" />

        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full font-bold text-[var(--color-button-blue)] text-sm mb-2 bg-transparent border border-gray-300 dark:border-gray-600 rounded px-2 py-1"
            placeholder="Masukkan judul di sini..."
          />
        ) : (
          <p className="font-bold text-[var(--color-button-blue)] text-sm mb-2">
            {title || "Belum ada judul"}
          </p>
        )}
        
        <div className="flex gap-4 mt-4">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="btn-primary rounded-full shadow min-w-[100px]">simpan</button>
              <button onClick={handleCancel} className="btn-primary rounded-full shadow min-w-[100px]">batal</button>
            </>
          ) : (
            <>
              <button onClick={handleEdit} className="btn-primary rounded-full shadow min-w-[100px]">edit</button>
              <button onClick={() => onRemove(id)} className="btn-primary rounded-full shadow min-w-[100px]">
                hapus
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LineTitleCard;
