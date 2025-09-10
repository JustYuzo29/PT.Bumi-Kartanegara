import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

// Import komponen Material-UI
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const OurServicesDescriptionCard = ({ id, onRemove }) => {
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
   * Jika teks kosong, tampilkan peringatan.
   * Jika berhasil, ubah ke mode view dan tampilkan notifikasi sukses.
   */
  const handleSave = () => {
    if (!descriptionText.trim()) {
      setAlertInfo({
        open: true,
        severity: "warning",
        message: "Deskripsi tidak boleh kosong. Silakan isi terlebih dahulu.",
      });
      console.log("Error: Deskripsi kosong.");
      return;
    }
    // TODO: Kirim data 'descriptionText' ke backend Django di sini
    console.log("Deskripsi disimpan:", descriptionText);
    setIsEditing(false); // Beralih ke mode view
    setAlertInfo({
      open: true,
      severity: "success",
      message: "Deskripsi berhasil disimpan!",
    });
  };

  /**
   * Beralih kembali ke mode edit.
   */
  const handleEdit = () => {
    setIsEditing(true);
    setAlertInfo({ open: false, severity: "info", message: "" }); // Sembunyikan alert saat mulai mengedit
  };

  /**
   * Menghapus konten dari textarea.
   */
  const handleClearContent = () => {
    setDescriptionText("");
    setAlertInfo({ open: false, severity: "info", message: "" }); // Sembunyikan alert
    console.log("Konten deskripsi dibersihkan.");
  };

  /**
   * Menghapus seluruh kartu deskripsi.
   */
  const handleDeleteCard = () => {
    // Fungsi onRemove dipanggil dari props untuk menghapus card ini di parent component
    onRemove(id);
  };

  return (
    <div className="relative mb-4">
      {/* Aksen bar di sisi kiri */}
      <div className="absolute left-0 top-0 h-full w-2 rounded-l-lg bg-[var(--color-accent)] dark:bg-[var(--color-button-blue)]"></div>

      {/* Tombol hapus kartu di pojok kanan atas */}
      <button
        onClick={handleDeleteCard}
        className="absolute top-3 right-3 p-1 text-gray-400 dark:text-gray-500 z-10 hover:text-red-500 transition-colors"
        title="Hapus Kartu Deskripsi"
        aria-label="Hapus Kartu Deskripsi"
        type="button"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>

      <div className="ml-2 bg-white dark:bg-[var(--color-card-bg)] rounded-lg shadow-elevated px-6 pt-5 pb-6">
        <h3 className="text-lg font-bold mb-1 text-[var(--color-button-blue)]">Description</h3>
        <p className="text-[13px] mb-4 text-[var(--color-button-blue)]">
          Isi deskripsi layanan Anda di bawah ini.
        </p>

        {/* Area untuk menampilkan notifikasi (MUI Alert) */}
        {alertInfo.open && (
          <Stack sx={{ width: '100%', marginBottom: '1rem' }} spacing={2}>
            <Alert
              severity={alertInfo.severity}
              // Tampilkan tombol close hanya untuk 'warning' atau 'error'
              onClose={alertInfo.severity === 'warning' || alertInfo.severity === 'error' ? () => setAlertInfo({ ...alertInfo, open: false }) : undefined}
              sx={{
                backgroundColor: alertInfo.severity === 'success' ? 'var(--color-success-bg)' : 'var(--color-card-secondary)',
                color: 'var(--color-button-blue)',
                '.MuiAlert-icon': {
                  color: alertInfo.severity === 'success' ? 'var(--color-success-icon) !important' : 'var(--color-accent) !important',
                },
                '.MuiAlert-action': {
                  color: 'var(--color-button-blue) !important',
                },
              }}
            >
              {alertInfo.message}
            </Alert>
          </Stack>
        )}

        {/* Textarea untuk input deskripsi */}
        <div className="mb-4">
          <textarea
            rows={4}
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none text-[var(--color-button-blue)] bg-transparent resize-y disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
            value={descriptionText}
            onChange={(e) => {
              setDescriptionText(e.target.value);
              // Sembunyikan alert saat pengguna mulai mengetik lagi
              if (alertInfo.open && alertInfo.severity === "warning") {
                setAlertInfo({ open: false, severity: "info", message: "" });
              }
            }}
            placeholder="Masukkan deskripsi layanan Anda di sini..."
            disabled={!isEditing} // Textarea dinonaktifkan jika tidak dalam mode edit
          />
        </div>

        {/* Kontainer untuk tombol aksi */}
        <div className="flex gap-4">
          {isEditing ? (
            <>
              {/* Tombol saat mode edit */}
              <button
                onClick={handleSave}
                className="btn-primary rounded-full shadow min-w-[100px]"
              >
                Simpan
              </button>
              <button
                onClick={handleClearContent}
                className="btn-secondary rounded-full shadow min-w-[100px]"
              >
                Bersihkan
              </button>
            </>
          ) : (
            <>
              {/* Tombol saat mode view (setelah simpan) */}
              <button
                onClick={handleEdit}
                className="btn-primary rounded-full shadow min-w-[100px]"
              >
                Edit
              </button>
              <button
                onClick={handleDeleteCard}
                className="btn-danger rounded-full shadow min-w-[100px]"
              >
                Hapus
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OurServicesDescriptionCard;
