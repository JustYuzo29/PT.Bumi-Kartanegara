import React, { useState } from "react";
import {
  PencilSquareIcon,
  XMarkIcon,
  PlusIcon,
  CheckIcon,
  TrashIcon
} from "@heroicons/react/24/solid";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const AboutDescriptionCard = ({ id, onRemove }) => {
  const [rows, setRows] = useState([]);
  const [alertInfo, setAlertInfo] = useState({ open: false, severity: 'info', message: '' });

  const showAlert = (severity, message) => {
    setAlertInfo({ open: true, severity, message });
    setTimeout(() => setAlertInfo({ open: false, severity: 'info', message: '' }), 3000);
  };

  const hasUnsavedChanges = () => rows.some(r => r.isEditing);

  const addRow = () => {
    if (hasUnsavedChanges()) {
      showAlert('warning', 'Please save or cancel existing edits first.');
      return;
    }
    setRows(prev => [...prev, { id: Date.now(), nama: "", title: "", isEditing: true, isNew: true }]);
  };

  const handleChange = (rowId, field, value) => {
    setRows(prev => prev.map(row => (row.id === rowId ? { ...row, [field]: value } : row)));
  };

  const saveRow = (rowId) => {
    const row = rows.find(r => r.id === rowId);
    if (!row.nama.trim() || !row.title.trim()) {
      showAlert('error', 'Fields cannot be empty.');
      return;
    }
    setRows(prev => prev.map(r => (r.id === rowId ? { ...r, isEditing: false, isNew: false } : r)));
    showAlert('success', 'Row saved successfully.');
  };

  const editRow = (rowId) => {
    if (hasUnsavedChanges()) {
      showAlert('warning', 'Please save or cancel other edits first.');
      return;
    }
    setRows(prev => prev.map(row => (row.id === rowId ? { ...row, isEditing: true } : row)));
  };

  const deleteRow = (rowId) => {
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

  return (
    <div className="relative mb-4">
      <div className="absolute left-0 top-0 h-full w-2 rounded-l-lg bg-[var(--color-accent)] dark:bg-[var(--color-button-blue)]"></div>
      <button
        onClick={() => onRemove(id)}
        className="absolute top-3 right-3 p-1 text-gray-400 dark:text-gray-500 z-10"
        title="Hapus Description Card"
        type="button"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>

      <div className="ml-2 bg-white dark:bg-[var(--color-card-bg)] rounded-lg shadow-elevated px-6 pt-5 pb-6">
        <h3 className="text-lg font-bold mb-1 text-[var(--color-button-blue)]">Description</h3>
        <p className="text-[13px] mb-4 text-[var(--color-button-blue)]">
          Masukkan deskripsi dan judul di bawah.
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
                <th className="p-2 border-b border-gray-300 dark:border-gray-600 text-left w-[45%]">nama</th>
                <th className="p-2 border-b border-gray-300 dark:border-gray-600 text-left w-[35%]">title</th>
                <th className="p-2 border-b border-gray-300 dark:border-gray-600 text-center w-[20%]">action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.id} className="align-top">
                  <td className="p-2 border-b border-gray-200 dark:border-gray-500">
                    {row.isEditing ? (
                      <textarea
                        rows={2}
                        className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 focus:outline-none text-[var(--color-button-blue)] resize-none bg-transparent"
                        value={row.nama}
                        onChange={(e) => handleChange(row.id, "nama", e.target.value)}
                      />
                    ) : (
                      <p className="whitespace-pre-wrap text-[var(--color-button-blue)]">{row.nama}</p>
                    )}
                  </td>
                  <td className="p-2 border-b border-gray-200 dark:border-gray-500">
                    {row.isEditing ? (
                      <input
                        type="text"
                        className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 focus:outline-none text-[var(--color-button-blue)] bg-transparent"
                        value={row.title}
                        onChange={(e) => handleChange(row.id, "title", e.target.value)}
                      />
                    ) : (
                      <p className="text-[var(--color-button-blue)]">{row.title}</p>
                    )}
                  </td>
                  <td className="p-2 border-b border-gray-200 dark:border-gray-500">
                    <div className="flex gap-2 justify-center">
                      {row.isEditing ? (
                        <>
                          <button onClick={() => saveRow(row.id)} title="Simpan" className="p-1 rounded">
                            <CheckIcon className="w-5 h-5 text-green-500" />
                          </button>
                          <button onClick={() => cancelEdit(row.id)} title="Batal" className="p-1 rounded">
                            <XMarkIcon className="w-5 h-5 text-red-500" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => editRow(row.id)} title="Edit" className="p-1 rounded">
                            <PencilSquareIcon className="w-5 h-5 text-yellow-500" />
                          </button>
                          <button onClick={() => deleteRow(row.id)} title="Hapus" className="p-1 rounded">
                            <TrashIcon className="w-5 h-5 text-red-500" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={addRow} type="button" className="flex items-center gap-2 text-[var(--color-button-blue)] font-semibold">
          <PlusIcon className="w-5 h-5" />
          Tambah Baris
        </button>
      </div>
    </div>
  );
};

export default AboutDescriptionCard;