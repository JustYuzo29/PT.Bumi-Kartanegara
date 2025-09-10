import React, { useState } from "react";
import { XMarkIcon, PencilSquareIcon, TrashIcon, PlusIcon, CheckIcon } from "@heroicons/react/24/solid";

const ServiceContentCard = ({
  id,
  onRemove,
  title = "Content 1",
  description = "Masukkan data layanan pada tabel di bawah.",
  rows = [],
  onChangeRows,
}) => {
  // State HANYA untuk mengelola proses edit
  const [editRowId, setEditRowId] = useState(null);
  const [editRowData, setEditRowData] = useState(null);

  // --- Fungsi Handler yang Disederhanakan ---

  const handleEdit = (row) => {
    if (editRowId) return; // Mencegah edit ganda
    setEditRowId(row.id);
    setEditRowData({ ...row });
  };

  const handleAdd = () => {
    if (editRowId) return;
    const newId = Date.now();
    setEditRowId(newId);
    setEditRowData({ id: newId, nama: "", title: "", text: "" });
  };

  const handleCancel = () => {
    setEditRowId(null);
    setEditRowData(null);
  };

  const handleSave = () => {
    // Validasi input
    if (!editRowData.nama?.trim() || !editRowData.title?.trim() || !editRowData.text?.trim()) {
      alert("Semua kolom (nama, title, text) wajib diisi.");
      return;
    }

    const isUpdating = rows.some(row => row.id === editRowId);
    const newRows = isUpdating
      ? rows.map(row => (row.id === editRowId ? editRowData : row))
      : [...rows, editRowData];
    
    onChangeRows(newRows);
    handleCancel();
  };

  const handleDelete = (rowIdToDelete, rowName) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus "${rowName}"?`)) {
      onChangeRows(rows.filter(row => row.id !== rowIdToDelete));
    }
  };

  const handleInputChange = (field, value) => {
    setEditRowData(prev => ({ ...prev, [field]: value }));
  };

  // Menentukan baris yang akan dirender (termasuk baris baru yang sedang dibuat)
  const rowsToRender = editRowId && !rows.some(r => r.id === editRowId) 
    ? [...rows, editRowData] 
    : rows;

  return (
    <div className="relative mb-4">
      <div className="absolute left-0 top-0 h-full w-2 rounded-l-lg bg-[var(--color-accent)] dark:bg-[var(--color-button-blue)]"></div>
      <button
        // ✨ DIUBAH: hover dihilangkan
        className="absolute top-3 right-3 p-1 text-gray-400 transition-colors z-10"
        aria-label="Hapus Tabel"
        title="Hapus Tabel"
        onClick={() => onRemove(id)}
        type="button"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>

      <div className="ml-2 bg-white dark:bg-[var(--color-card-bg)] rounded-lg shadow-elevated px-6 pt-5 pb-6 border border-transparent">
        <h3 className="text-lg font-bold mb-0.5 text-[var(--color-button-blue)]">{title}</h3>
        <p className="text-[13px] mb-4 text-[var(--color-button-blue)]">{description}</p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm mb-4 table-fixed">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-600">
                <th className="text-left p-2 font-bold text-[var(--color-button-blue)]">Nama</th>
                <th className="text-left p-2 font-bold text-[var(--color-button-blue)]">Title</th>
                <th className="text-left p-2 font-bold text-[var(--color-button-blue)]">Text</th>
                <th className="text-center p-2 font-bold text-[var(--color-button-blue)] w-24">Action</th>
              </tr>
            </thead>
            <tbody>
              {rowsToRender.map((row) => {
                const isEditing = row.id === editRowId;
                const displayData = isEditing ? editRowData : row;

                return isEditing ? (
                  // Baris dalam mode Edit
                  <tr key={displayData.id} className="align-top">
                    <td className="p-2 border-b border-gray-200 dark:border-gray-500"><input type="text" value={displayData.nama} onChange={e => handleInputChange('nama', e.target.value)} className="w-full px-2 py-1 rounded border focus:outline-none bg-transparent text-[var(--color-button-blue)]" /></td>
                    <td className="p-2 border-b border-gray-200 dark:border-gray-500"><input type="text" value={displayData.title} onChange={e => handleInputChange('title', e.target.value)} className="w-full px-2 py-1 rounded border focus:outline-none bg-transparent text-[var(--color-button-blue)]" /></td>
                    <td className="p-2 border-b border-gray-200 dark:border-gray-500"><input type="text" value={displayData.text} onChange={e => handleInputChange('text', e.target.value)} className="w-full px-2 py-1 rounded border focus:outline-none bg-transparent text-[var(--color-button-blue)]" /></td>
                    <td className="p-2 text-center border-b border-gray-200 dark:border-gray-500">
                      <div className="flex justify-center gap-2">
                        <button title="Simpan" className="p-1 rounded" onClick={handleSave}><CheckIcon className="w-5 h-5 text-green-500 dark:text-green-400" /></button>
                        <button title="Batal" className="p-1 rounded" onClick={handleCancel}><XMarkIcon className="w-5 h-5 text-gray-500" /></button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  // Baris dalam mode Lihat
                  <tr key={row.id} className="border-b border-gray-200 dark:border-gray-500 align-top">
                    <td className="p-2 text-[var(--color-button-blue)]">{row.nama}</td>
                    <td className="p-2 text-[var(--color-button-blue)]">{row.title}</td>
                    <td className="p-2 text-[var(--color-button-blue)]">{row.text}</td>
                    <td className="p-2 text-center">
                      <div className="flex justify-center gap-2">
                        <button title="Edit" className="p-1 rounded" onClick={() => handleEdit(row)}><PencilSquareIcon className="w-5 h-5 text-yellow-500" /></button>
                        <button title="Hapus" className="p-1 rounded" onClick={() => handleDelete(row.id, row.nama)}><TrashIcon className="w-5 h-5 text-red-500" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* ✨ DIUBAH: Tombol 'Tambah Baris' yang lebih intuitif */}
          <button onClick={handleAdd} className="mt-2 flex items-center gap-2 text-[var(--color-button-blue)] font-semibold text-sm">
            <PlusIcon className="w-5 h-5" />
            <span>Tambah Baris</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceContentCard;