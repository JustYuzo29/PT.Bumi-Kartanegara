import React, { useState, useEffect } from "react";
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

// Konstanta untuk validasi gambar/ikon
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];

const AlatBeratCard = ({ id, onRemove, cardIndex }) => {
  const [pictures, setPictures] = useState([]);
  const [icons, setIcons] = useState([]);
  const [texts, setTexts] = useState([]);
  
  // State notifikasi yang lebih baik
  const [alertInfo, setAlertInfo] = useState({ open: false, severity: 'info', message: '' });

  // Fungsi untuk menampilkan notifikasi dan menyembunyikannya setelah 3 detik
  const showAlert = (severity, message) => {
    setAlertInfo({ open: true, severity, message });
    setTimeout(() => setAlertInfo({ open: false, severity: 'info', message: '' }), 3000);
  };

  // Effect untuk membersihkan Object URL saat komponen unmount
  useEffect(() => {
    return () => {
      [...pictures, ...icons].forEach((row) => {
        if (row.preview) URL.revokeObjectURL(row.preview);
      });
    };
  }, [pictures, icons]);

  // --- Helper ---
  const validateRow = (row, isFileRequired = false) => {
    if (!row.nama.trim()) return "Nama tidak boleh kosong.";
    if (isFileRequired && !row.file) return "File gambar/ikon wajib diunggah.";
    return null;
  };

  const hasUnsavedChanges = () => 
    pictures.some(r => r.isEditing) || 
    icons.some(r => r.isEditing) || 
    texts.some(r => r.isEditing);

  // --- Generic Handlers ---
  const handleAddRow = (setter) => {
    if (hasUnsavedChanges()) {
      showAlert("warning", "Harap simpan perubahan yang ada sebelum menambah baris baru.");
      return;
    }
    setter(prev => [...prev, { id: Date.now(), nama: "", title: "", file: null, preview: "", isEditing: true, isNew: true }]);
  };

  const handleDeleteRow = (id, setter, rows) => {
    const rowToDelete = rows.find(r => r.id === id);
    if (rowToDelete && rowToDelete.preview) URL.revokeObjectURL(rowToDelete.preview);
    setter(prev => prev.filter(row => row.id !== id));
  };

  const handleCancelEdit = (id, setter, originalRows) => {
      const row = originalRows.find(r => r.id === id);
      if (row.isNew) {
          handleDeleteRow(id, setter, originalRows); // Hapus baris baru jika dibatalkan
      } else {
          // Revert changes (jika Anda menyimpan state original) atau cukup matikan mode edit
          setter(prev => prev.map(r => r.id === id ? { ...r, isEditing: false } : r));
      }
  };


  // --- Picture Handlers ---
  const handleFileChange = (id, e, setter) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      showAlert("error", "Format file harus JPG, PNG, WEBP, atau SVG.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      showAlert("error", "Ukuran file maksimal 1MB.");
      return;
    }

    setter(prev => {
      const oldRow = prev.find(r => r.id === id);
      if (oldRow?.preview) URL.revokeObjectURL(oldRow.preview);
      const preview = URL.createObjectURL(file);
      return prev.map(row => row.id === id ? { ...row, file, preview } : row);
    });
  };

  const savePictureRow = (id) => {
    const row = pictures.find(r => r.id === id);
    const error = validateRow(row, true);
    if (error) {
      showAlert("error", error);
      return;
    }
    setPictures(prev => prev.map(r => r.id === id ? { ...r, isEditing: false, isNew: false } : r));
    showAlert("success", "Gambar berhasil disimpan.");
    // TODO: Kirim data ke backend
  };

  // --- Icon Handlers ---
  const saveIconRow = (id) => {
    const row = icons.find(r => r.id === id);
    const error = validateRow(row, true);
    if (error) {
      showAlert("error", error);
      return;
    }
    setIcons(prev => prev.map(r => r.id === id ? { ...r, isEditing: false, isNew: false } : r));
    showAlert("success", "Ikon berhasil disimpan.");
    // TODO: Kirim data ke backend
  };

  // --- Text Handlers ---
  const saveTextRow = (id) => {
    const row = texts.find(r => r.id === id);
    const error = validateRow(row);
    if (error) {
      showAlert("error", error);
      return;
    }
    setTexts(prev => prev.map(r => r.id === id ? { ...r, isEditing: false, isNew: false } : r));
    showAlert("success", "Teks berhasil disimpan.");
    // TODO: Kirim data ke backend
  };

  return (
    <div className="relative mb-4">
      <div className="absolute left-0 top-0 h-full w-2 rounded-l-lg bg-[var(--color-accent)] dark:bg-[var(--color-button-blue)]"></div>
      <button onClick={() => onRemove(id)} className="absolute top-3 right-3 p-1 text-gray-400 dark:text-gray-500 z-10 hover:text-red-500" title="Hapus Card"><XMarkIcon className="w-5 h-5" /></button>
      
      <div className="ml-2 bg-white dark:bg-[var(--color-card-bg)] rounded-lg shadow-elevated px-6 pt-5 pb-6">
        <h3 className="text-lg font-bold mb-1 text-[var(--color-button-blue)]">Card Layanan {cardIndex || 1}</h3>
        <p className="text-[13px] mb-4 text-[var(--color-button-blue)]">Kelola gambar, ikon, dan teks untuk kartu layanan ini.</p>

        {alertInfo.open && (
          <Stack sx={{ width: '100%', marginBottom: '1rem' }} spacing={2}>
            <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, open: false })}>{alertInfo.message}</Alert>
          </Stack>
        )}

        {/* --- TABEL PICTURE --- */}
        <DataTable title="Gambar Layanan" headers={["Gambar", "Nama", "File", "Aksi"]}>
          {pictures.map(row => (
            <DataRow key={row.id} row={row} type="picture"
              onSave={() => savePictureRow(row.id)}
              onEdit={() => setPictures(prev => prev.map(r => r.id === row.id ? { ...r, isEditing: true } : r))}
              onDelete={() => handleDeleteRow(row.id, setPictures, pictures)}
              onCancel={() => handleCancelEdit(row.id, setPictures, pictures)}
              onValueChange={(field, value) => setPictures(prev => prev.map(r => r.id === row.id ? { ...r, [field]: value } : r))}
              onFileChange={(e) => handleFileChange(row.id, e, setPictures)}
            />
          ))}
        </DataTable>
        <AddRowButton onClick={() => handleAddRow(setPictures)} label="Tambah Baris Gambar" />

        {/* --- TABEL ICON --- */}
        <DataTable title="Ikon Layanan" headers={["Ikon", "Nama", "File", "Aksi"]}>
          {icons.map(row => (
            <DataRow key={row.id} row={row} type="icon"
              onSave={() => saveIconRow(row.id)}
              onEdit={() => setIcons(prev => prev.map(r => r.id === row.id ? { ...r, isEditing: true } : r))}
              onDelete={() => handleDeleteRow(row.id, setIcons, icons)}
              onCancel={() => handleCancelEdit(row.id, setIcons, icons)}
              onValueChange={(field, value) => setIcons(prev => prev.map(r => r.id === row.id ? { ...r, [field]: value } : r))}
              onFileChange={(e) => handleFileChange(row.id, e, setIcons)}
            />
          ))}
        </DataTable>
        <AddRowButton onClick={() => handleAddRow(setIcons)} label="Tambah Baris Ikon" />

        {/* --- TABEL TEXT --- */}
        <DataTable title="Teks Layanan" headers={["Nama", "Deskripsi", "Aksi"]}>
          {texts.map(row => (
            <DataRow key={row.id} row={row} type="text"
              onSave={() => saveTextRow(row.id)}
              onEdit={() => setTexts(prev => prev.map(r => r.id === row.id ? { ...r, isEditing: true } : r))}
              onDelete={() => handleDeleteRow(row.id, setTexts, texts)}
              onCancel={() => handleCancelEdit(row.id, setTexts, texts)}
              onValueChange={(field, value) => setTexts(prev => prev.map(r => r.id === row.id ? { ...r, [field]: value } : r))}
            />
          ))}
        </DataTable>
        <AddRowButton onClick={() => handleAddRow(setTexts)} label="Tambah Baris Teks" />
      </div>
    </div>
  );
};

// --- Sub-Komponen untuk Reusability ---

const DataTable = ({ title, headers, children }) => (
  <div className="mt-4">
    <h4 className="text-md font-bold mb-2 text-[var(--color-button-blue)]">{title}</h4>
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse table-auto">
        <thead>
          <tr className="border-b border-gray-300 dark:border-gray-600 text-[var(--color-button-blue)] font-bold">
            {headers.map(h => <th key={h} className="p-2 text-left">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  </div>
);

const AddRowButton = ({ onClick, label }) => (
  <button onClick={onClick} type="button" className="flex items-center gap-2 text-[var(--color-button-blue)] font-semibold text-sm mt-2" title={label}>
    <PlusIcon className="w-5 h-5" /> {label}
  </button>
);

const DataRow = ({ row, type, onSave, onEdit, onDelete, onCancel, onValueChange, onFileChange }) => {
  const isFileType = type === 'picture' || type === 'icon';

  return (
    <tr className="border-b border-gray-200 dark:border-gray-500 align-top">
      {isFileType && (
        <td className="p-2 w-20">
          {row.isEditing ? (
            <label className="inline-block cursor-pointer px-3 py-1 bg-[var(--color-button-blue)] text-white rounded text-xs whitespace-nowrap">
              Pilih File
              <input type="file" accept="image/*" className="hidden" onChange={onFileChange} />
            </label>
          ) : (
            row.preview && <img src={row.preview} alt={row.nama || "preview"} className="w-14 h-14 rounded object-cover border" />
          )}
        </td>
      )}
      <td className="p-2">
        {row.isEditing ? (
          <input type="text" className="w-full form-input" value={row.nama} onChange={(e) => onValueChange('nama', e.target.value)} placeholder={`Nama ${type}`} />
        ) : (
          <span className="text-content">{row.nama}</span>
        )}
      </td>
      {type === 'text' ? (
        <td className="p-2">
          {row.isEditing ? (
            <textarea rows="2" className="w-full form-input" value={row.title} onChange={(e) => onValueChange('title', e.target.value)} placeholder="Isi deskripsi"></textarea>
          ) : (
            <span className="text-content">{row.title}</span>
          )}
        </td>
      ) : (
        <td className="p-2 text-content">
          {row.isEditing && row.file ? (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="truncate max-w-[150px]" title={row.file.name}>{row.file.name}</span>
            </div>
          ) : row.file ? (
            <span>{row.file.name}</span>
          ) : !row.isEditing ? (
            <span className="italic text-gray-400">Belum ada file</span>
          ) : null}
        </td>
      )}
      <td className="p-2 w-24">
        <div className="flex gap-2 justify-center items-center">
          {row.isEditing ? (
            <>
              <button onClick={onSave} className="p-1" title="Simpan"><CheckIcon className="w-5 h-5 text-green-500" /></button>
              <button onClick={onCancel} className="p-1" title="Batal"><XMarkIcon className="w-5 h-5 text-red-500" /></button>
            </>
          ) : (
            <>
              <button onClick={onEdit} className="p-1" title="Edit"><PencilSquareIcon className="w-5 h-5 text-yellow-500" /></button>
              <button onClick={onDelete} className="p-1" title="Hapus"><TrashIcon className="w-5 h-5 text-red-500" /></button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default AlatBeratCard;
