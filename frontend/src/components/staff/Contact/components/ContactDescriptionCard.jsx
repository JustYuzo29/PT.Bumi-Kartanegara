import React, { useState } from "react";
import { PencilSquareIcon, XMarkIcon, CheckIcon } from "@heroicons/react/24/solid";

// Import komponen Material-UI
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const ContactDescriptionCard = ({ id, onRemove }) => {
  // State untuk teks deskripsi
  const [description, setDescription] = useState("");
  // State untuk menyimpan data original saat mode edit
  const [originalDescription, setOriginalDescription] = useState("");
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
    setOriginalDescription(description); // Simpan state saat ini
    setIsEditing(true);
  };

  // Membatalkan editan
  const handleCancel = () => {
    setDescription(originalDescription);
    if (originalDescription) {
      setIsEditing(false);
    }
  };

  // Menyimpan perubahan
  const handleSave = () => {
    if (!description.trim()) {
      showAlert('warning', 'Deskripsi tidak boleh kosong.');
      return;
    }
    setIsEditing(false);
    setOriginalDescription(description); // Update data original
    showAlert('success', 'Deskripsi berhasil disimpan!');
    // TODO: Kirim 'description' ke backend Anda
  };

  return (
    <div className="relative mb-4">
      {/* Accent kiri */}
      <div className="absolute left-0 top-0 h-full w-2 rounded-l-lg bg-[var(--color-accent)] dark:bg-[var(--color-button-blue)]"></div>
      {/* Tombol hapus Card */}
      <button
        onClick={() => onRemove(id)}
        className="absolute top-3 right-3 p-1 text-gray-400 z-10"
        title="Hapus Description Card"
        aria-label="Hapus Description Card"
        type="button"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>
      {/* Card Content */}
      <div className="ml-2 bg-white dark:bg-[var(--color-card-bg)] rounded-lg shadow-elevated px-6 pt-5 pb-6">
        <h3 className="text-lg font-bold mb-1 text-[var(--color-button-blue)]">Description</h3>
        <p className="text-[13px] mb-4 text-[var(--color-button-blue)]">Masukkan deskripsi sesuai kebutuhan.</p>

        {/* Area Notifikasi MUI Alert */}
        {alertInfo.open && (
            <Stack sx={{ width: '100%', marginBottom: '1rem' }} spacing={2}>
              <Alert severity={alertInfo.severity}>
                {alertInfo.message}
              </Alert>
            </Stack>
        )}

        {/* Tampilan kondisional untuk deskripsi */}
        {isEditing ? (
          <textarea
            rows={4}
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none text-[var(--color-button-blue)] bg-transparent resize-y"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Masukkan deskripsi di sini..."
          />
        ) : (
          <div className="w-full min-h-[100px] px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-transparent">
            <p className="text-[var(--color-button-blue)] whitespace-pre-wrap">
              {description || "Belum ada deskripsi."}
            </p>
          </div>
        )}
        
        {/* Tombol kondisional */}
        <div className="flex gap-4 mt-4">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="btn-primary rounded-full shadow min-w-[100px]">simpan</button>
              <button onClick={handleCancel} className="btn-primary rounded-full shadow min-w-[100px]">batal</button>
            </>
          ) : (
            <>
              <button onClick={handleEdit} className="btn-primary rounded-full shadow min-w-[100px]">edit</button>
              <button onClick={() => onRemove(id)} className="btn-danger rounded-full shadow min-w-[100px]">hapus</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactDescriptionCard;
