import React, { useState } from "react";
import {
  XMarkIcon,
  PencilSquareIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";

// Import komponen Material-UI
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const ContactBannerTitleCard = ({ id, onRemove }) => {
  // State untuk data di dalam tabel, dimulai dengan string kosong
  const [data, setData] = useState({
    nama: "",
    title: "",
  });
  
  // State untuk menyimpan data original saat mode edit, untuk fungsi 'batal'
  const [originalData, setOriginalData] = useState(data);
  
  // State untuk mode edit dan notifikasi, dimulai dalam mode edit
  const [isEditing, setIsEditing] = useState(true);
  const [alertInfo, setAlertInfo] = useState({ open: false, severity: 'info', message: '' });

  // Fungsi untuk menampilkan notifikasi
  const showAlert = (severity, message) => {
    setAlertInfo({ open: true, severity, message });
    setTimeout(() => setAlertInfo({ open: false, severity: 'info', message: '' }), 3000);
  };
  
  // Mengaktifkan mode edit
  const handleEdit = () => {
    setOriginalData(data); // Simpan state saat ini sebelum diedit
    setIsEditing(true);
  };

  // Membatalkan editan dan mengembalikan data ke semula
  const handleCancel = () => {
    setData(originalData); // Kembalikan ke data original
    // Jangan keluar dari mode edit jika data original kosong, agar user tidak stuck
    if (originalData.nama || originalData.title) {
      setIsEditing(false);
    }
  };
  
  // Menyimpan perubahan
  const handleSave = () => {
    if (!data.nama.trim() || !data.title.trim()) {
      showAlert('warning', 'Semua kolom tidak boleh kosong.');
      return;
    }
    setIsEditing(false);
    setOriginalData(data); // Update original data setelah save berhasil
    showAlert('success', 'Judul berhasil diperbarui!');
    // TODO: Kirim 'data' yang sudah diperbarui ke backend Anda
  };

  // Menangani perubahan pada input field
  const handleInputChange = (e, field) => {
    setData({ ...data, [field]: e.target.value });
  };
  
  return (
    <div className="relative mb-4">
      <div className="absolute left-0 top-0 h-full w-2 rounded-l-lg bg-[var(--color-accent)] dark:bg-[var(--color-button-blue)]"></div>
      <button
        onClick={() => onRemove(id)}
        className="absolute top-3 right-3 p-1 text-gray-400 z-10"
        title="Hapus Title"
        aria-label="Hapus Title"
        type="button"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>
      <div className="ml-2 bg-white dark:bg-[var(--color-card-bg)] rounded-lg shadow-elevated px-6 pt-5 pb-6">
        <h3 className="text-lg font-bold mb-1 text-[var(--color-button-blue)]">Title</h3>
        <p className="text-[13px] mb-4 text-[var(--color-button-blue)]">
          Kelola judul untuk halaman kontak Anda.
        </p>

        {/* Area Notifikasi MUI Alert */}
        {alertInfo.open && (
            <Stack sx={{ width: '100%', marginBottom: '1rem' }} spacing={2}>
              <Alert severity={alertInfo.severity}>
                {alertInfo.message}
              </Alert>
            </Stack>
        )}

        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-600 text-[var(--color-button-blue)]">
              <th className="p-2 font-semibold text-left">nama</th>
              <th className="p-2 font-semibold text-left">title</th>
              <th className="p-2 font-semibold text-center w-24">action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {isEditing ? (
                <>
                  <td className="p-2">
                    <input 
                      type="text"
                      value={data.nama}
                      onChange={(e) => handleInputChange(e, 'nama')}
                      className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-transparent text-[var(--color-button-blue)]"
                      placeholder="Contoh: Judul Kontak"
                    />
                  </td>
                  <td className="p-2">
                    <input 
                      type="text"
                      value={data.title}
                      onChange={(e) => handleInputChange(e, 'title')}
                      className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-transparent text-[var(--color-button-blue)]"
                      placeholder="Contoh: Hubungi Kami"
                    />
                  </td>
                </>
              ) : (
                <>
                  <td className="p-2 text-[var(--color-button-blue)]">{data.nama}</td>
                  <td className="p-2 text-[var(--color-button-blue)] break-all">{data.title}</td>
                </>
              )}
              <td className="p-2">
                <div className="flex justify-center gap-2">
                  {isEditing ? (
                    <>
                      <button onClick={handleSave} className="p-1" title="Simpan">
                        <CheckIcon className="w-5 h-5 text-green-500" />
                      </button>
                      <button onClick={handleCancel} className="p-1" title="Batal">
                        <XMarkIcon className="w-5 h-5 text-red-500" />
                      </button>
                    </>
                  ) : (
                    <button onClick={handleEdit} className="p-1 rounded" title="Edit">
                      <PencilSquareIcon className="w-5 h-5 text-yellow-500" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ContactBannerTitleCard;
