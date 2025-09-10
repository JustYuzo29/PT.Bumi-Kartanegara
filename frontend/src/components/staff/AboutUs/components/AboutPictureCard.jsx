import React, { useState, useEffect } from "react";
import {
  XMarkIcon,
  TrashIcon,
  CheckIcon,
  PencilSquareIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const AboutPictureCard = ({ id, onRemove }) => {
  const [rows, setRows] = useState([]);
  const [alertInfo, setAlertInfo] = useState({ open: false, severity: 'info', message: '' });

  const showAlert = (severity, message) => {
    setAlertInfo({ open: true, severity, message });
    setTimeout(() => setAlertInfo({ open: false, severity: 'info', message: '' }), 3000);
  };

  useEffect(() => {
    return () => {
      rows.forEach(row => {
        if (row.preview) URL.revokeObjectURL(row.preview);
      });
    };
  }, [rows]);
  
  const hasUnsavedChanges = () => rows.some(r => r.isEditing);

  const addRow = () => {
    if (hasUnsavedChanges()) {
      showAlert('warning', 'Please save or cancel existing edits first.');
      return;
    }
    setRows(prev => [...prev, { id: Date.now(), nama: "", title: "", file: null, preview: "", isEditing: true, isNew: true }]);
  };

  const handleChange = (rowId, field, value) => {
    setRows(prev => prev.map(row => (row.id === rowId ? { ...row, [field]: value } : row)));
  };

  const handleFileChange = (rowId, e) => {
    const file = e.target.files[0];
    e.target.value = null;
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      showAlert('error', `Format must be ${ALLOWED_TYPES.join(', ')}.`);
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      showAlert('error', `Max size is ${MAX_IMAGE_SIZE / 1024 / 1024}MB.`);
      return;
    }
    
    const preview = URL.createObjectURL(file);
    setRows(prev => prev.map(row => {
      if (row.id === rowId) {
        if (row.preview) URL.revokeObjectURL(row.preview);
        return { ...row, file, preview };
      }
      return row;
    }));
  };

  const saveRow = (rowId) => {
    const row = rows.find(r => r.id === rowId);
    if (!row.nama.trim() || !row.title.trim() || !row.file) {
      showAlert('error', 'All fields and image are required.');
      return;
    }
    setRows(prev => prev.map(r => (r.id === rowId ? { ...r, isEditing: false, isNew: false } : r)));
    showAlert('success', 'Image row saved.');
  };

  const editRow = (rowId) => {
    if (hasUnsavedChanges()) {
      showAlert('warning', 'Please save other edits first.');
      return;
    }
    setRows(prev => prev.map(row => (row.id === rowId ? { ...row, isEditing: true } : row)));
  };

  const deleteRow = (rowId) => {
    const rowToDelete = rows.find(r => r.id === rowId);
    if (rowToDelete?.preview) URL.revokeObjectURL(rowToDelete.preview);
    setRows(prev => prev.filter(row => row.id !== rowId));
  };

  const cancelEdit = (rowId) => {
    const row = rows.find(r => r.id === rowId);
    if (row.isNew) {
      deleteRow(rowId);
    } else {
      setRows(prev => prev.map(r => r.id === rowId ? { ...r, isEditing: false } : r));
    }
  };

  const removeImage = (rowId) => {
    setRows(prev => prev.map(row => {
      if (row.id === rowId) {
        if (row.preview) URL.revokeObjectURL(row.preview);
        return { ...row, file: null, preview: "" };
      }
      return row;
    }));
  };

  return (
    <div className="relative mb-4">
      <div className="absolute left-0 top-0 h-full w-2 rounded-l-lg bg-[var(--color-accent)] dark:bg-[var(--color-button-blue)]"></div>
      <button
        onClick={() => onRemove(id)}
        className="absolute top-3 right-3 p-1 text-gray-400 dark:text-gray-500 z-10"
        title="Hapus Picture Card" type="button">
        <XMarkIcon className="w-5 h-5" />
      </button>

      <div className="ml-2 bg-white dark:bg-[var(--color-card-bg)] rounded-lg shadow-elevated px-6 pt-5 pb-6">
        <h3 className="text-lg font-bold mb-1 text-[var(--color-button-blue)]">Picture</h3>
        <p className="text-[13px] mb-4 text-[var(--color-button-blue)]">
          Masukkan gambar dan info pada tabel di bawah.
        </p>
        
        {alertInfo.open && (
            <Stack sx={{ width: '100%', my: 2 }} spacing={2}>
              <Alert severity={alertInfo.severity}>{alertInfo.message}</Alert>
            </Stack>
        )}

        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse table-fixed">
            <thead>
              <tr className="text-[var(--color-button-blue)] font-bold">
                <th className="text-left p-2 border-b border-gray-300 dark:border-gray-600 w-[25%]">Nama</th>
                <th className="text-left p-2 border-b border-gray-300 dark:border-gray-600 w-[25%]">Title</th>
                <th className="text-left p-2 border-b border-gray-300 dark:border-gray-600 w-[35%]">Gambar</th>
                <th className="text-center p-2 border-b border-gray-300 dark:border-gray-600 w-[15%]">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.id} className="align-top">
                  <td className="p-2 border-b border-gray-200 dark:border-gray-500">
                    {row.isEditing ? (
                      <input type="text" className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 focus:outline-none text-[var(--color-button-blue)] bg-transparent" value={row.nama} onChange={(e) => handleChange(row.id, 'nama', e.target.value)} />
                    ) : (
                      <span className="text-[var(--color-button-blue)]">{row.nama}</span>
                    )}
                  </td>
                  <td className="p-2 border-b border-gray-200 dark:border-gray-500">
                     {row.isEditing ? (
                      <input type="text" className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 focus:outline-none text-[var(--color-button-blue)] bg-transparent" value={row.title} onChange={(e) => handleChange(row.id, 'title', e.target.value)} />
                    ) : (
                      <span className="text-[var(--color-button-blue)]">{row.title}</span>
                    )}
                  </td>
                  <td className="p-2 border-b border-gray-200 dark:border-gray-500">
                    {row.isEditing ? (
                      <div className="flex flex-wrap items-center gap-2">
                        <label className="inline-block cursor-pointer px-3 py-1 bg-[var(--color-button-blue)] text-white rounded text-xs">
                          Pilih Gambar
                          <input type="file" accept={ALLOWED_TYPES.join(',')} className="hidden" onChange={(e) => handleFileChange(row.id, e)} />
                        </label>
                        {row.preview && <img src={row.preview} alt="preview" className="w-14 h-14 rounded object-cover border" />}
                        {row.file && <button onClick={() => removeImage(row.id)} className="text-red-500 p-1" title="Hapus gambar"><TrashIcon className="w-5 h-5" /></button>}
                      </div>
                    ) : (
                      row.preview && <img src={row.preview} alt={row.title} className="w-14 h-14 rounded object-cover border" />
                    )}
                  </td>
                  <td className="p-2 border-b border-gray-200 dark:border-gray-500 text-center">
                    <div className="flex justify-center gap-2">
                      {row.isEditing ? (
                        <>
                          <button onClick={() => saveRow(row.id)} className="p-1 rounded" title="Simpan"><CheckIcon className="w-5 h-5 text-green-500" /></button>
                          <button onClick={() => cancelEdit(row.id)} className="p-1 rounded" title="Batal"><XMarkIcon className="w-5 h-5 text-red-500" /></button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => editRow(row.id)} className="p-1 rounded" title="Edit"><PencilSquareIcon className="w-5 h-5 text-yellow-500" /></button>
                          <button onClick={() => deleteRow(row.id)} className="p-1 rounded" title="Hapus"><TrashIcon className="w-5 h-5 text-red-500" /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={addRow} className="flex items-center gap-2 text-[var(--color-button-blue)] font-semibold" title="Tambah Baris" type="button">
          <PlusIcon className="w-5 h-5" />
          Tambah Baris
        </button>
      </div>
    </div>
  );
};

export default AboutPictureCard;