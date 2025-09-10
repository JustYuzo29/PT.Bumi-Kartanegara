import React, { useState, useEffect } from "react";
import {
  XMarkIcon,
  PencilSquareIcon,
  CheckIcon,
  TrashIcon, 
} from "@heroicons/react/24/solid";

// Import komponen Material-UI
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

// Konstanta untuk validasi
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const ContactMapCard = ({ id, onRemove }) => {
  // State untuk data, sekarang menangani file
  const [data, setData] = useState({
    nama: "",
    file: null,
    preview: "",
  });
  
  // State untuk menyimpan data original saat mode edit
  const [originalData, setOriginalData] = useState(data);
  
  // State untuk mode edit dan notifikasi
  const [isEditing, setIsEditing] = useState(true);
  const [alertInfo, setAlertInfo] = useState({ open: false, severity: 'info', message: '' });

  // Cleanup Object URL untuk mencegah memory leak
  useEffect(() => {
    return () => {
      if (data.preview) {
        URL.revokeObjectURL(data.preview);
      }
    };
  }, [data.preview]);

  // Fungsi untuk menampilkan notifikasi
  const showAlert = (severity, message) => {
    setAlertInfo({ open: true, severity, message });
    setTimeout(() => setAlertInfo({ open: false, severity: 'info', message: '' }), 3000);
  };
  
  // Mengaktifkan mode edit
  const handleEdit = () => {
    setOriginalData(data);
    setIsEditing(true);
  };

  // Membatalkan editan
  const handleCancel = () => {
    // Jika ada preview di state saat ini yang tidak ada di original, hapus
    if (data.preview && data.preview !== originalData.preview) {
        URL.revokeObjectURL(data.preview);
    }
    setData(originalData);
    if (originalData.nama || originalData.file) {
      setIsEditing(false);
    }
  };
  
  // Menyimpan perubahan
  const handleSave = () => {
    if (!data.nama.trim() || !data.file) {
      showAlert('warning', 'Nama dan file gambar tidak boleh kosong.');
      return;
    }
    setIsEditing(false);
    setOriginalData(data);
    showAlert('success', 'Gambar peta berhasil diperbarui!');
    // TODO: Kirim 'data.file' ke backend Anda menggunakan FormData
  };

  // Menangani perubahan input teks
  const handleInputChange = (e) => {
    setData({ ...data, nama: e.target.value });
  };

  // Menangani perubahan file gambar
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        showAlert('error', 'Format file harus JPG, PNG, atau WEBP.');
        return;
    }
    if (file.size > MAX_FILE_SIZE) {
        showAlert('error', 'Ukuran file maksimal 2MB.');
        return;
    }

    // Hapus preview lama jika ada
    if (data.preview) {
        URL.revokeObjectURL(data.preview);
    }

    const newPreview = URL.createObjectURL(file);
    setData({ ...data, file: file, preview: newPreview });
  };
  
  return (
    <div className="relative mb-4">
      <div className="absolute left-0 top-0 h-full w-2 rounded-l-lg bg-[var(--color-accent)] dark:bg-[var(--color-button-blue)]"></div>
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
        <h3 className="text-lg font-bold mb-1 text-[var(--color-button-blue)]">Map</h3>
        <p className="text-[13px] mb-4 text-[var(--color-button-blue)]">
          Unggah gambar peta lokasi Anda.
        </p>

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
              <th className="p-2 font-semibold text-left">Gambar Peta</th>
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
                      onChange={handleInputChange}
                      className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-transparent text-[var(--color-button-blue)]"
                      placeholder="Contoh: Lokasi Kantor"
                    />
                  </td>
                  <td className="p-2">
                    <div className="flex items-center gap-4">
                        <label className="cursor-pointer flex-shrink-0">
                            <span className="px-3 py-2 text-xs text-white bg-[var(--color-button-blue)] rounded">Pilih File</span>
                            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                        </label>
                        <span className={`text-xs truncate min-w-0 ${data.file ? 'text-[var(--color-button-blue)]' : 'text-gray-400 dark:text-gray-500'}`}>
                            {data.file ? data.file.name : "Belum ada file dipilih"}
                        </span>
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td className="p-2 text-[var(--color-button-blue)]">{data.nama}</td>
                  <td className="p-2 text-[var(--color-button-blue)]">
                    {data.preview && <img src={data.preview} alt={data.nama || "Peta"} className="w-32 h-auto rounded border" />}
                  </td>
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
export default ContactMapCard;
