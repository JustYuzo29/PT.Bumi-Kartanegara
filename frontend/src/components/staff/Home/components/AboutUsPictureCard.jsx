import React, { useState, useEffect } from "react";
import { XMarkIcon, PencilSquareIcon, TrashIcon, PlusIcon, CheckIcon } from "@heroicons/react/24/solid";

const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1MB

const AboutUsPictureCard = ({
  id,
  onRemove,
  rows = [],
  onChangeRows,
}) => {
  const [editRowId, setEditRowId] = useState(null);
  const [editRowData, setEditRowData] = useState(null);
  const [modalImg, setModalImg] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (editRowData?.preview) {
        URL.revokeObjectURL(editRowData.preview);
      }
    };
  }, [editRowData]);

  const handleFileChange = (e) => {
    setError("");
    const file = e.target.files[0];
    e.target.value = null;
    if (!file) return;

    if (file.size > MAX_IMAGE_SIZE) {
      setError("Ukuran file maksimal 1MB");
      return;
    }

    if (editRowData.preview) {
      URL.revokeObjectURL(editRowData.preview);
    }
    
    const preview = URL.createObjectURL(file);
    setEditRowData(prev => ({ ...prev, file, preview, fileName: file.name }));
  };

  const handleEdit = (row) => {
    if (editRowId) {
      setError("Selesaikan proses edit yang sedang berjalan.");
      return;
    }
    setEditRowId(row.id);
    setEditRowData({ ...row });
    setError("");
  };
  
  const handleAdd = () => {
    if (editRowId) {
        setError("Selesaikan proses edit yang sedang berjalan.");
        return;
    }
    const newId = Date.now();
    setEditRowId(newId);
    setEditRowData({ id: newId, content: "", title: "", file: null, preview: "", fileName: "" });
    setError("");
  };

  const handleSave = () => {
    if (!editRowData.content?.trim() || !editRowData.title?.trim()) {
        setError("Kolom Content dan Title wajib diisi.");
        return;
    }
    if (!editRowData.file && !editRowData.preview) {
        setError("File gambar wajib diunggah.");
        return;
    }

    const isUpdating = rows.some(row => row.id === editRowId);
    let newRows;
    if (isUpdating) {
      newRows = rows.map(row => (row.id === editRowId ? editRowData : row));
    } else {
      newRows = [...rows, editRowData];
    }
    
    onChangeRows(newRows);
    setEditRowId(null);
    setEditRowData(null);
    setError("");
  };

  const handleCancel = () => {
    setEditRowId(null);
    setEditRowData(null);
    setError("");
  };

  // ✨ DIUBAH: Menambahkan parameter 'rowTitle' untuk pesan konfirmasi
  const handleDelete = (rowIdToDelete, rowTitle) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus "${rowTitle}"?`)) {
      onChangeRows(rows.filter(row => row.id !== rowIdToDelete));
      setError("");
    }
  };

  const handleRemoveImage = () => {
    if (editRowData.preview) {
      URL.revokeObjectURL(editRowData.preview);
    }
    setEditRowData(prev => ({ ...prev, file: null, preview: "", fileName: "" }));
  };

  const handleInputChange = (field, value) => {
    setEditRowData(prev => ({...prev, [field]: value}));
  }

  const rowsToRender = editRowId && !rows.some(r => r.id === editRowId) 
    ? [...rows, editRowData] 
    : rows;

  return (
    <div className="relative mb-4">
      <div className="absolute left-0 top-0 h-full w-2 rounded-l-lg bg-[var(--color-accent)] dark:bg-[var(--color-button-blue)]"></div>
      <button
        className="absolute top-3 right-3 p-1 text-gray-400 z-10"
        aria-label="Hapus Picture"
        title="Hapus Picture"
        onClick={() => onRemove(id)}
        type="button"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>

      <div className="ml-2 bg-white dark:bg-[var(--color-card-bg)] rounded-lg shadow-elevated px-6 pt-5 pb-6">
        <h3 className="text-lg font-bold mb-0.5 text-[var(--color-button-blue)]">Picture</h3>
        <p className="text-[13px] mb-4 text-[var(--color-button-blue)]">Tambah data gambar berikut:</p>
        {error && <div className="mb-2 text-sm text-red-600 font-medium">{error}</div>}
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm mb-4 table-fixed">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-600">
                <th className="text-left p-2 font-bold text-[var(--color-button-blue)] w-[25%]">Content</th>
                <th className="text-left p-2 font-bold text-[var(--color-button-blue)] w-[25%]">Title</th>
                <th className="text-left p-2 font-bold text-[var(--color-button-blue)] w-[35%]">File</th>
                <th className="text-center p-2 font-bold text-[var(--color-button-blue)] w-[15%]">Action</th>
              </tr>
            </thead>
            <tbody>
              {rowsToRender.map((row) => {
                const isEditing = row.id === editRowId;
                const displayData = isEditing ? editRowData : row;

                return isEditing ? (
                  // ✨ DIUBAH: Menghapus warna latar belakang dari baris edit
                  <tr key={displayData.id} className="border-b border-gray-200 dark:border-gray-500 align-top">
                    <td className="p-2"><input type="text" className="w-full px-2 py-1 rounded border focus:outline-none text-[var(--color-button-blue)] bg-transparent" value={displayData.content} onChange={e => handleInputChange('content', e.target.value)} placeholder="Isi content"/></td>
                    <td className="p-2"><input type="text" className="w-full px-2 py-1 rounded border focus:outline-none text-[var(--color-button-blue)] bg-transparent" value={displayData.title} onChange={e => handleInputChange('title', e.target.value)} placeholder="Isi title"/></td>
                    <td className="p-2">
                      <div className="flex items-start gap-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                          <span className="px-3 py-1 bg-[var(--color-button-blue)] text-white rounded text-xs">Pilih Foto</span>
                        </label>
                        {displayData.preview && (
                          <div className="flex items-center gap-1">
                            <img src={displayData.preview} alt="preview" className="w-10 h-10 rounded object-cover border cursor-pointer" title="Klik untuk preview" onClick={() => setModalImg(displayData.preview)} />
                            <span className="text-[var(--color-button-blue)] text-xs truncate w-20" title={displayData.fileName}>{displayData.fileName}</span>
                            <button type="button" className="p-0.5" title="Hapus gambar" onClick={handleRemoveImage}><TrashIcon className="w-4 h-4 text-red-400" /></button>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-2 text-center">
                        <div className="flex justify-center gap-2">
                            {/* ✨ DIUBAH: Menyesuaikan warna ikon centang untuk dark mode */}
                            <button className="p-1 rounded" title="Save" onClick={handleSave}><CheckIcon className="w-5 h-5 text-green-500 dark:text-green-400" /></button>
                            <button className="p-1 rounded" title="Cancel" onClick={handleCancel}><XMarkIcon className="w-5 h-5 text-red-500" /></button>
                        </div>
                    </td>
                  </tr>
                ) : (
                  <tr key={row.id} className="border-b border-gray-200 dark:border-gray-500 align-top">
                    <td className="p-2 text-[var(--color-button-blue)]">{row.content}</td>
                    <td className="p-2 text-[var(--color-button-blue)]">{row.title}</td>
                    <td className="p-2 text-[var(--color-button-blue)]">
                      {row.preview && <img src={row.preview} alt={row.fileName} className="inline w-10 h-10 rounded object-cover border mr-2 cursor-pointer" title="Klik untuk preview" onClick={() => setModalImg(row.preview)} />}
                      <span>{row.fileName}</span>
                    </td>
                    <td className="p-2 text-center">
                        <div className="flex justify-center gap-2">
                           <button className="p-1 rounded" title="Edit" onClick={() => handleEdit(row)}><PencilSquareIcon className="w-5 h-5 text-yellow-500" /></button>
                           {/* ✨ DIUBAH: Memanggil handleDelete dengan parameter 'title' */}
                           <button className="p-1 rounded" title="Delete" onClick={() => handleDelete(row.id, row.title)}><TrashIcon className="w-5 h-5 text-red-500" /></button>
                        </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <button onClick={handleAdd} className="flex items-center gap-2 text-[var(--color-button-blue)] font-semibold text-sm">
          <PlusIcon className="w-5 h-5" />
          <span>Tambah Baris</span>
        </button>

        {modalImg && (
          <div className="fixed z-50 inset-0 bg-black/70 flex items-center justify-center" onClick={() => setModalImg(null)}>
            <img src={modalImg} alt="Preview" className="max-h-[60vh] max-w-[90vw] rounded-lg shadow-2xl border-4 border-white" onClick={e => e.stopPropagation()} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutUsPictureCard;