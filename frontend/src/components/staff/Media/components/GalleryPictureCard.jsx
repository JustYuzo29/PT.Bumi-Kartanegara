import React, { useState, useEffect } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";

// --- Konstanta untuk validasi ---
const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const GalleryPictureCard = ({ id, onRemove }) => {
  // State utama untuk menyimpan data baris yang sudah tersimpan
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");

  // State untuk menangani proses edit secara terisolasi
  const [editingRowId, setEditingRowId] = useState(null);
  const [editingRowData, setEditingRowData] = useState(null);

  // Efek untuk membersihkan preview URL saat komponen tidak lagi digunakan
  useEffect(() => {
    return () => {
      rows.forEach((row) => {
        if (row.preview) URL.revokeObjectURL(row.preview);
      });
      if (editingRowData?.preview) {
        URL.revokeObjectURL(editingRowData.preview);
      }
    };
  }, [rows, editingRowData]);

  // --- Fungsi-fungsi Handler ---

  const handleEdit = (row) => {
    if (editingRowId) {
      setError("Harap selesaikan proses edit yang sedang berjalan.");
      return;
    }
    setError("");
    setEditingRowId(row.id);
    setEditingRowData({ ...row });
  };

  const handleCancel = () => {
    if (editingRowData?.preview) {
      // Hanya revoke jika ini adalah baris baru yang belum disimpan
      const isNew = !rows.find(r => r.id === editingRowData.id);
      if(isNew) URL.revokeObjectURL(editingRowData.preview);
    }
    setEditingRowId(null);
    setEditingRowData(null);
    setError("");
  };

  const handleSave = () => {
    // Validasi
    if (!editingRowData.nama?.trim() || !editingRowData.title?.trim()) {
      setError("Nama dan Title wajib diisi.");
      return;
    }
    if (!editingRowData.file) {
      setError("Wajib mengunggah gambar.");
      return;
    }

    // Cek apakah ini baris baru atau update baris lama
    const isUpdating = rows.some(row => row.id === editingRowId);
    if (isUpdating) {
      setRows(prev => prev.map(row => row.id === editingRowId ? editingRowData : row));
    } else {
      setRows(prev => [...prev, editingRowData]);
    }
    
    console.log("Menyimpan data:", editingRowData);
    handleCancel();
  };

  const handleDelete = (rowId, rowName) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus "${rowName}"?`)) {
      const rowToDelete = rows.find((r) => r.id === rowId);
      if (rowToDelete?.preview) URL.revokeObjectURL(rowToDelete.preview);
      setRows((prev) => prev.filter((row) => row.id !== rowId));
    }
  };
  
  const addRow = () => {
    if (editingRowId) {
      setError("Harap selesaikan proses edit yang sedang berjalan.");
      return;
    }
    const newId = Date.now();
    const newRow = { id: newId, nama: "", title: "", file: null, preview: "" };
    setEditingRowId(newId);
    setEditingRowData(newRow);
    setError("");
  };
  
  const handleInputChange = (field, value) => {
    setEditingRowData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    e.target.value = null; // Reset input file untuk memungkinkan re-upload file yang sama
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Format gambar harus JPG, PNG, atau WEBP.");
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setError("Ukuran gambar maksimal 1MB.");
      return;
    }
    
    if (editingRowData.preview) URL.revokeObjectURL(editingRowData.preview);
    
    const preview = URL.createObjectURL(file);
    setError("");
    setEditingRowData(prev => ({ ...prev, file, preview, title: file.name })); // Otomatis isi title dengan nama file
  };

  const removeImage = () => {
    if (editingRowData.preview) URL.revokeObjectURL(editingRowData.preview);
    setEditingRowData(prev => ({ ...prev, file: null, preview: "", title: "" }));
  };

  // --- Render Komponen ---
  const rowsToRender = [...rows, editingRowData].filter(Boolean);

  return (
    <div className="relative mb-4">
      <div className="absolute left-0 top-0 h-full w-2 rounded-l-lg bg-[var(--color-accent)] dark:bg-[var(--color-button-blue)]"></div>
      <button
        onClick={() => onRemove(id)}
        className="absolute top-3 right-3 p-1 text-gray-400 z-10"
        title="Hapus Kartu Picture"
        type="button"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>

      <div className="ml-2 bg-white dark:bg-[var(--color-card-bg)] rounded-lg shadow-elevated px-6 pt-5 pb-6">
        <h3 className="text-lg font-bold mb-1 text-[var(--color-button-blue)]">Picture</h3>
        <p className="text-[13px] mb-4 text-[var(--color-button-blue)]">
          Kelola daftar gambar untuk galeri Anda.
        </p>
        {error && (
          <p className="text-red-600 dark:text-red-400 mb-4 text-sm font-semibold">{error}</p>
        )}

        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse table-fixed">
            <thead>
              <tr className="text-[var(--color-button-blue)] font-bold">
                <th className="text-left p-2 border-b border-gray-300 dark:border-gray-600 w-[25%]">Nama</th>
                <th className="text-left p-2 border-b border-gray-300 dark:border-gray-600 w-[30%]">Title / Nama File</th>
                <th className="text-left p-2 border-b border-gray-300 dark:border-gray-600 w-[25%]">Gambar</th>
                <th className="text-center p-2 border-b border-gray-300 dark:border-gray-600 w-[20%]">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {rowsToRender.map((row) => {
                const isEditing = row.id === editingRowId;
                const displayData = isEditing ? editingRowData : row;

                return (
                  <tr key={row.id} className="align-top border-b border-gray-200 dark:border-gray-500">
                    {/* NAMA & TITLE */}
                    {['nama', 'title'].map(field => (
                      <td key={field} className="p-2">
                        {isEditing ? (
                          <input
                            type="text"
                            className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 focus:outline-none text-[var(--color-button-blue)] bg-transparent"
                            value={displayData[field]}
                            onChange={(e) => handleInputChange(field, e.target.value)}
                            placeholder={`Masukkan ${field}`}
                          />
                        ) : (
                          <span className="text-[var(--color-button-blue)] truncate" title={displayData[field]}>{displayData[field]}</span>
                        )}
                      </td>
                    ))}

                    {/* GAMBAR */}
                    <td className="p-2">
                      {isEditing ? (
                        <div className="flex flex-wrap items-center gap-2">
                          <label className="inline-block cursor-pointer px-3 py-1 bg-[var(--color-button-blue)] text-white rounded text-xs">
                            Pilih Gambar
                            <input type="file" accept={ALLOWED_TYPES.join(',')} className="hidden" onChange={handleFileChange} />
                          </label>
                          {displayData.preview && <img src={displayData.preview} alt="preview" className="w-14 h-14 rounded object-cover border" />}
                          {displayData.file && <button onClick={removeImage} className="text-red-500 p-1" title="Hapus gambar"><TrashIcon className="w-5 h-5" /></button>}
                        </div>
                      ) : (
                        displayData.preview && <img src={displayData.preview} alt={displayData.title} className="w-14 h-14 rounded object-cover border" />
                      )}
                    </td>

                    {/* AKSI */}
                    <td className="p-2 text-center">
                      <div className="flex justify-center gap-2">
                        {isEditing ? (
                          <>
                            <button onClick={handleSave} className="p-1 rounded" title="Simpan"><CheckIcon className="w-5 h-5 text-green-500" /></button>
                            <button onClick={handleCancel} className="p-1 rounded" title="Batal"><XMarkIcon className="w-5 h-5 text-gray-500" /></button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => handleEdit(row)} className="p-1 rounded" title="Edit"><PencilSquareIcon className="w-5 h-5 text-yellow-500" /></button>
                            <button onClick={() => handleDelete(row.id, row.nama)} className="p-1 rounded" title="Hapus"><TrashIcon className="w-5 h-5 text-red-500" /></button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <button
          onClick={addRow}
          className="flex items-center gap-2 text-[var(--color-button-blue)] font-semibold"
          title="Tambah Baris"
          type="button"
        >
          <PlusIcon className="w-5 h-5" />
          Tambah Baris
        </button>
      </div>
    </div>
  );
};

export default GalleryPictureCard;