import React, { useState, useEffect } from "react";
import {
  TrashIcon,
  PencilSquareIcon,
  PlusIcon,
  XMarkIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";

// Import komponen Material-UI
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

// Konstanta untuk validasi file
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];

const ContactCard = ({ id, onRemove, cardIndex }) => {
  const [rows, setRows] = useState({
    icon: [],
    description: [],
    button: [],
    link: [],
  });
  
  // State untuk notifikasi
  const [alertInfo, setAlertInfo] = useState({ open: false, severity: 'info', message: '' });

  // Fungsi untuk menampilkan notifikasi
  const showAlert = (severity, message) => {
    setAlertInfo({ open: true, severity, message });
    setTimeout(() => setAlertInfo({ open: false, severity: 'info', message: '' }), 3000);
  };

  // Cleanup Object URL untuk ikon
  useEffect(() => {
    return () => {
      rows.icon.forEach(row => {
        if (row.preview) URL.revokeObjectURL(row.preview);
      });
    };
  }, [rows.icon]);

  // --- LOGIKA GENERIC CRUD ---

  const hasUnsavedChanges = () => {
    return Object.values(rows).some(section => section.some(row => row.isEditing));
  };

  // Fungsi tambah baris
  const addRow = (type) => {
    if (hasUnsavedChanges()) {
      showAlert('warning', 'Harap simpan atau batalkan perubahan yang ada sebelum menambah baris baru.');
      return;
    }
    const newRow = { id: Date.now(), nama: "", title: "", file: null, preview: null, isEditing: true, isNew: true };
    setRows(prev => ({ ...prev, [type]: [...prev[type], newRow] }));
  };

  // Fungsi ubah value
  const handleChange = (type, rowId, field, value) => {
    setRows(prev => ({
      ...prev,
      [type]: prev[type].map(row =>
        row.id === rowId ? { ...row, [field]: value } : row
      ),
    }));
  };

  // Fungsi ubah file (khusus ikon)
  const handleFileChange = (rowId, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      showAlert('error', `Format file harus ${ALLOWED_IMAGE_TYPES.join(', ')}.`);
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      showAlert('error', `Ukuran file maksimal ${MAX_FILE_SIZE / 1024 / 1024}MB.`);
      return;
    }

    const preview = URL.createObjectURL(file);
    setRows(prev => ({
      ...prev,
      icon: prev.icon.map(row => {
        if (row.id === rowId) {
          if (row.preview) URL.revokeObjectURL(row.preview); // Hapus preview lama
          return { ...row, file, preview };
        }
        return row;
      }),
    }));
  };

  // Fungsi simpan baris
  const saveRow = (type, rowId) => {
    const rowToSave = rows[type].find(row => row.id === rowId);

    // Validasi
    if (!rowToSave.nama.trim() || !rowToSave.title.trim()) {
      showAlert('warning', 'Kolom "nama" dan "title" tidak boleh kosong.');
      return;
    }
    if (type === 'icon' && !rowToSave.file) {
      showAlert('warning', 'File ikon wajib diunggah.');
      return;
    }

    setRows(prev => ({
      ...prev,
      [type]: prev[type].map(row =>
        row.id === rowId ? { ...row, isEditing: false, isNew: false } : row
      ),
    }));
    showAlert('success', `Baris ${type} berhasil disimpan.`);
    // TODO: Kirim data ke backend
  };

  // Fungsi edit baris
  const editRow = (type, rowId) => {
    if (hasUnsavedChanges()) {
      showAlert('warning', 'Harap simpan atau batalkan perubahan lain terlebih dahulu.');
      return;
    }
    setRows(prev => ({
      ...prev,
      [type]: prev[type].map(row =>
        row.id === rowId ? { ...row, isEditing: true } : row
      ),
    }));
  };

  // Fungsi hapus baris
  const deleteRow = (type, rowId) => {
      setRows(prev => {
        const rowToDelete = prev[type].find(r => r.id === rowId);
        if (rowToDelete?.preview) {
          URL.revokeObjectURL(rowToDelete.preview);
        }
        return {
          ...prev,
          [type]: prev[type].filter(row => row.id !== rowId),
        };
      });
  };
  
  // Fungsi batal edit
  const cancelEdit = (type, rowId) => {
     const rowToCancel = rows[type].find(row => row.id === rowId);
     if (rowToCancel.isNew) {
        // Jika baris baru, hapus saja tanpa konfirmasi
        deleteRow(type, rowId);
     } else {
        // Untuk baris yang sudah ada, kita hanya matikan mode edit
        setRows(prev => ({
            ...prev,
            [type]: prev[type].map(row =>
              row.id === rowId ? { ...row, isEditing: false } : row
            ),
        }));
     }
  };

  // --- Komponen Render Tabel ---
  const renderTable = (type, title, headers) => {
    const data = rows[type];
    
    return (
      <div className="mt-4">
        <h4 className="text-md font-bold mb-2 text-[var(--color-button-blue)]">{title}</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse table-auto">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-600">
                {headers.map(h => <th key={h} className="p-2 font-semibold text-left text-[var(--color-button-blue)]">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {data.map(row => (
                <tr key={row.id} className="border-b border-gray-200 dark:border-gray-500 align-top">
                  {/* Kolom spesifik untuk setiap tipe */}
                  {type === 'icon' && (
                    <td className="p-2 w-28">
                      {row.isEditing ? (
                        <div className="flex flex-col gap-2">
                          <label className="cursor-pointer">
                            <span className="px-3 py-1.5 text-xs text-white bg-[var(--color-button-blue)] rounded">Pilih File</span>
                            <input type="file" className="hidden" accept={ALLOWED_IMAGE_TYPES.join(',')} onChange={(e) => handleFileChange(row.id, e)} />
                          </label>
                          {row.file && <span className="text-xs truncate text-[var(--color-button-blue)]">{row.file.name}</span>}
                        </div>
                      ) : (
                        row.preview && <img src={row.preview} alt={row.nama} className="w-14 h-14 object-contain rounded" />
                      )}
                    </td>
                  )}
                  <td className="p-2">
                    {row.isEditing ? (
                      <input type="text" value={row.nama} onChange={e => handleChange(type, row.id, 'nama', e.target.value)} className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-transparent text-[var(--color-button-blue)]" placeholder="nama" />
                    ) : (
                      <span className="text-[var(--color-button-blue)]">{row.nama}</span>
                    )}
                  </td>
                  <td className="p-2">
                    {row.isEditing ? (
                      <textarea rows="2" value={row.title} onChange={e => handleChange(type, row.id, 'title', e.target.value)} className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-transparent text-[var(--color-button-blue)] resize-y" placeholder="title"></textarea>
                    ) : (
                      <span className="text-[var(--color-button-blue)] break-all">{row.title}</span>
                    )}
                  </td>
                  <td className="p-2 w-24">
                    <div className="flex justify-center gap-2">
                      {row.isEditing ? (
                        <>
                          <button onClick={() => saveRow(type, row.id)} className="p-1" title="Simpan"><CheckIcon className="w-5 h-5 text-green-500" /></button>
                          <button onClick={() => cancelEdit(type, row.id)} className="p-1" title="Batal"><XMarkIcon className="w-5 h-5 text-red-500" /></button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => editRow(type, row.id)} className="p-1" title="Edit"><PencilSquareIcon className="w-5 h-5 text-yellow-500" /></button>
                          <button onClick={() => {if(window.confirm(`Yakin ingin menghapus baris ${type} ini?`)) deleteRow(type, row.id)}} className="p-1" title="Hapus"><TrashIcon className="w-5 h-5 text-red-500" /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={() => addRow(type)} type="button" className="flex items-center gap-2 text-[var(--color-button-blue)] font-semibold text-sm mt-2">
          <PlusIcon className="w-5 h-5" /> Tambah Baris {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      </div>
    );
  };

  return (
    <div className="relative mb-4">
      <div className="absolute left-0 top-0 h-full w-2 rounded-l-lg bg-[var(--color-accent)] dark:bg-[var(--color-button-blue)]"></div>
      <button onClick={() => onRemove(id)} className="absolute top-3 right-3 p-1 text-gray-400 z-10" title="Hapus Card"><XMarkIcon className="w-5 h-5" /></button>
      
      <div className="ml-2 bg-white dark:bg-[var(--color-card-bg)] rounded-lg shadow-elevated px-6 pt-5 pb-6">
        <h3 className="text-lg font-bold mb-1 text-[var(--color-button-blue)]">Card {cardIndex || 1}</h3>
        <p className="text-[13px] mb-4 text-[var(--color-button-blue)]">lorem ipsum wkwkwkwkwkw</p>

        {alertInfo.open && (
            <Stack sx={{ width: '100%', marginBottom: '1rem' }} spacing={2}>
              <Alert severity={alertInfo.severity}>{alertInfo.message}</Alert>
            </Stack>
        )}

        {renderTable('icon', 'Icon', ['Icon', 'nama', 'title', 'action'])}
        {renderTable('description', 'Description', ['nama', 'title', 'action'])}
        {renderTable('button', 'Button Title', ['nama', 'title', 'action'])}
        {renderTable('link', 'Link', ['nama', 'title', 'action'])}

      </div>
    </div>
  );
};

export default ContactCard;
