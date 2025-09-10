import React, { useState } from "react";
import { XMarkIcon, PencilSquareIcon, CheckIcon } from "@heroicons/react/24/solid";

// Import komponen Material-UI
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const MapCard = ({ id, onRemove }) => {
  // State untuk link Google Maps
  const [link, setLink] = useState("");
  // State untuk menyimpan data original saat mode edit
  const [originalLink, setOriginalLink] = useState("");
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
    setOriginalLink(link); // Simpan link saat ini
    setIsEditing(true);
  };

  // Membatalkan editan
  const handleCancel = () => {
    setLink(originalLink);
    if (originalLink) {
      setIsEditing(false);
    }
  };

  // Menyimpan perubahan
  const handleSave = () => {
    // Validasi sederhana untuk memastikan link bukan hanya spasi
    if (!link.trim()) {
      showAlert('warning', 'Link Google Maps tidak boleh kosong.');
      return;
    }
    // Validasi untuk memastikan ini adalah link embed dari Google Maps
    if (!link.includes("google.com/maps/embed")) {
      showAlert('error', 'Harap masukkan link embed Google Maps yang valid.');
      return;
    }
    setIsEditing(false);
    setOriginalLink(link); // Update data original
    showAlert('success', 'Link Google Maps berhasil disimpan!');
    // TODO: Kirim 'link' ke backend Anda
  };

  return (
    <div className="relative mb-4">
      {/* Accent kiri */}
      <div className="absolute left-0 top-0 h-full w-2 rounded-l-lg bg-[var(--color-accent)] dark:bg-[var(--color-button-blue)]"></div>
      {/* Tombol hapus Card */}
      <button
        onClick={() => onRemove(id)}
        className="absolute top-3 right-3 p-1 text-gray-400 z-10"
        title="Hapus Map"
        aria-label="Hapus Map"
        type="button"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>
      <div className="ml-2 bg-white dark:bg-[var(--color-card-bg)] rounded-lg shadow-elevated px-6 pt-5 pb-6">
        <h3 className="text-lg font-bold mb-1 text-[var(--color-button-blue)]">Link Google Maps</h3>
        <p className="text-[13px] mb-4 text-[var(--color-button-blue)]">Masukkan link embed dari Google Maps.</p>

        {/* Area Notifikasi MUI Alert */}
        {alertInfo.open && (
            <Stack sx={{ width: '100%', marginBottom: '1rem' }} spacing={2}>
              <Alert severity={alertInfo.severity}>
                {alertInfo.message}
              </Alert>
            </Stack>
        )}

        {/* Tampilan kondisional untuk input/preview */}
        {isEditing ? (
          <div className="flex items-center mb-4">
            <input
              type="text"
              className="flex-grow px-4 py-2 bg-gray-50 dark:bg-[var(--color-card-secondary)] border border-gray-300 dark:border-gray-600 text-[var(--color-button-blue)] rounded-l-full focus:outline-none"
              placeholder="Paste link embed Google Maps di sini..."
              value={link}
              onChange={e => setLink(e.target.value)}
            />
            {/* Tombol insert link tidak diperlukan lagi karena ada simpan/batal */}
          </div>
        ) : (
          link && (
            <div className="mb-4">
              <iframe
                src={link}
                title="Maps Preview"
                className="w-full rounded h-48 border"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )
        )}

        {/* Tombol kondisional */}
        <div className="flex gap-4">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="btn-primary rounded-full shadow min-w-[100px]" type="button">
                simpan
              </button>
              <button onClick={handleCancel} className="btn-primary rounded-full shadow min-w-[100px]" type="button">
                batal
              </button>
            </>
          ) : (
            <>
              <button onClick={handleEdit} className="btn-primary rounded-full shadow min-w-[100px]" type="button">
                edit
              </button>
              <button onClick={() => onRemove(id)} className="btn-danger rounded-full shadow min-w-[100px]" type="button">
                hapus
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapCard;
