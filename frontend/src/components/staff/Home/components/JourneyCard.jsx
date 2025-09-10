import React, { useState, useEffect } from "react";
import { XMarkIcon, PencilSquareIcon, TrashIcon, PlusIcon, CheckIcon } from "@heroicons/react/24/solid";

// --- Konstanta Validasi ---
const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1MB
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

// ===================================================================================
// ✨ SUB-KOMPONEN TABEL YANG BISA DIGUNAKAN KEMBALI (REUSABLE)
// ===================================================================================
const EditableTable = ({ title, rows, setRows, columns, renderCell }) => {
  const [editRowId, setEditRowId] = useState(null);
  const [editRowData, setEditRowData] = useState(null);
  const [error, setError] = useState("");

  const handleEdit = (row) => {
    if (editRowId) return;
    setEditRowId(row.id);
    setEditRowData({ ...row });
  };

  const handleAdd = () => {
    if (editRowId) return;
    const newId = Date.now();
    const newRow = columns.reduce((acc, col) => ({ ...acc, [col.key]: col.default || '' }), { id: newId });
    setEditRowId(newId);
    setEditRowData(newRow);
  };

  const handleCancel = () => {
    setEditRowId(null);
    setEditRowData(null);
    setError("");
  };

  const handleSave = () => {
    if (!editRowData.nama?.trim()) {
        setError("Kolom 'nama' tidak boleh kosong.");
        return;
    }

    const isUpdating = rows.some(r => r.id === editRowId);
    let newRows = isUpdating ? rows.map(r => (r.id === editRowId ? editRowData : r)) : [...rows, editRowData];
    setRows(newRows);
    handleCancel();
  };

  const handleDelete = (rowId, rowName) => {
    if (window.confirm(`Yakin ingin menghapus "${rowName || 'item ini'}"?`)) {
      setRows(rows.filter(r => r.id !== rowId));
    }
  };

  const handleInputChange = (field, value) => {
    setEditRowData(prev => ({ ...prev, [field]: value }));
  };

  const rowsToRender = editRowId && !rows.some(r => r.id === editRowId) ? [...rows, editRowData] : rows;
  
  return (
    <div className="mb-6">
        <div className="font-semibold text-[var(--color-button-blue)] mb-2">{title}</div>
        {error && <p className="text-xs text-red-600 mb-2">{error}</p>}
        <table className="w-full text-sm">
            <thead>
                <tr className="border-b border-gray-300 dark:border-gray-600">
                    {columns.map(col => <th key={col.key} className="text-left p-2 font-bold text-[var(--color-button-blue)]">{col.header}</th>)}
                    <th className="text-center p-2 font-bold text-[var(--color-button-blue)] w-24">Action</th>
                </tr>
            </thead>
            <tbody>
                {rowsToRender.map(row => {
                    const isEditing = row.id === editRowId;
                    const data = isEditing ? editRowData : row;
                    return (
                        <tr key={row.id} className="border-b border-gray-200 dark:border-gray-500 align-top">
                            {columns.map(col => (
                                <td key={col.key} className="p-2">
                                    {renderCell({ data, isEditing, field: col.key, handleInputChange, setEditRowData, setError })}
                                </td>
                            ))}
                            <td className="p-2 text-center">
                                <div className="flex justify-center gap-2">
                                {isEditing ? (
                                    <>
                                        <button title="Simpan" onClick={handleSave}><CheckIcon className="w-5 h-5 text-green-500 dark:text-green-400" /></button>
                                        <button title="Batal" onClick={handleCancel}><XMarkIcon className="w-5 h-5 text-gray-500" /></button>
                                    </>
                                ) : (
                                    <>
                                        <button title="Edit" onClick={() => handleEdit(row)}><PencilSquareIcon className="w-5 h-5 text-yellow-500" /></button>
                                        <button title="Hapus" onClick={() => handleDelete(row.id, row.nama)}><TrashIcon className="w-5 h-5 text-red-500" /></button>
                                    </>
                                )}
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        <button onClick={handleAdd} className="mt-2 flex items-center gap-2 text-[var(--color-button-blue)] font-semibold text-sm">
            <PlusIcon className="w-5 h-5" />
            <span>Tambah Baris {title}</span>
        </button>
    </div>
  );
};


// ===================================================================================
// ✨ KOMPONEN UTAMA JOURNEY CARD
// ===================================================================================
const JourneyCard = ({ id, onRemove }) => {
  const [pictureRows, setPictureRows] = useState([]);
  const [iconRows, setIconRows] = useState([]);
  const [textRows, setTextRows] = useState([]);
  const [numberRows, setNumberRows] = useState([]);
  const [modalImg, setModalImg] = useState(null);

  const renderFileCell = ({ data, isEditing, field, handleInputChange, setEditRowData, setError }) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        e.target.value = null;
        if (!file) return;

        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
            setError("Format harus JPG, PNG, atau WEBP.");
            return;
        }
        if (file.size > MAX_IMAGE_SIZE) {
            setError("Ukuran maksimal 1MB.");
            return;
        }

        if (data.preview) URL.revokeObjectURL(data.preview);
        const preview = URL.createObjectURL(file);
        setEditRowData(prev => ({ ...prev, file, preview, title: file.name }));
        setError("");
    };

    if (isEditing) {
        return (
            <div className="flex items-center gap-2">
                <label className="cursor-pointer px-3 py-1 bg-[var(--color-button-blue)] text-white rounded text-xs">
                    Pilih File
                    <input type="file" accept={ALLOWED_IMAGE_TYPES.join(",")} className="hidden" onChange={handleFileChange} />
                </label>
                {data.preview && <img src={data.preview} alt="preview" className="w-10 h-10 object-cover rounded border" />}
                <span className="text-xs truncate" title={data.title}>{data.title}</span>
            </div>
        );
    }
    return (
        <div className="flex items-center gap-2">
            {data.preview && <img src={data.preview} alt={data.title} onClick={() => setModalImg(data.preview)} className="w-10 h-10 object-cover rounded border cursor-pointer" />}
            {/* ✨ DIUBAH: Menambahkan class warna pada teks */}
            <span className="text-[var(--color-button-blue)]">{data.title}</span>
        </div>
    );
  };

  return (
    <div className="relative mb-4">
      <div className="absolute left-0 top-0 h-full w-2 rounded-l-lg bg-[var(--color-accent)] dark:bg-[var(--color-button-blue)]"></div>
      <button
        className="absolute top-3 right-3 p-1 text-gray-400 z-10"
        aria-label="Hapus Card"
        title="Hapus Card"
        onClick={() => onRemove(id)}
        type="button"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>

      <div className="ml-2 bg-white dark:bg-[var(--color-card-bg)] rounded-lg shadow-elevated px-6 pt-5 pb-6">
        <h3 className="text-lg font-bold mb-0.5 text-[var(--color-button-blue)]">Card Perjalanan</h3>
        <p className="text-[13px] mb-4 text-[var(--color-button-blue)]">Tambah konten perjalanan di bawah ini.</p>

        {/* --- Tabel Picture & Icon --- */}
        {[
            { title: "Picture", rows: pictureRows, setRows: setPictureRows },
            { title: "Icon", rows: iconRows, setRows: setIconRows }
        ].map(section => (
            <EditableTable
                key={section.title}
                title={section.title}
                rows={section.rows}
                setRows={section.setRows}
                columns={[{ key: 'nama', header: 'Nama' }, { key: 'title', header: 'File' }]}
                renderCell={({ data, isEditing, field, handleInputChange, setEditRowData, setError }) => {
                    if (field === 'title') return renderFileCell({ data, isEditing, field, handleInputChange, setEditRowData, setError });
                    // ✨ DIUBAH: Menambahkan class warna pada teks
                    return isEditing ? <input type="text" value={data[field]} onChange={e => handleInputChange(field, e.target.value)} className="w-full px-2 py-1 rounded border focus:outline-none text-[var(--color-button-blue)] bg-transparent"/> : <span className="text-[var(--color-button-blue)]">{data[field]}</span>
                }}
            />
        ))}

        {/* --- Tabel Text --- */}
        <EditableTable
            title="Text"
            rows={textRows}
            setRows={setTextRows}
            columns={[{ key: 'nama', header: 'Nama' }, { key: 'title', header: 'Title', default: '' }]}
            renderCell={({ data, isEditing, field, handleInputChange }) => 
                isEditing ? (
                    <textarea value={data[field]} onChange={e => handleInputChange(field, e.target.value)} rows={field === 'title' ? 3 : 1} className="w-full px-2 py-1 rounded border focus:outline-none text-[var(--color-button-blue)] bg-transparent resize-none"/>
                // ✨ DIUBAH: Menambahkan class warna pada teks
                ) : <span className="text-[var(--color-button-blue)]">{data[field]}</span>
            }
        />

        {/* --- Tabel Number --- */}
        <EditableTable
            title="Number"
            rows={numberRows}
            setRows={setNumberRows}
            columns={[{ key: 'nama', header: 'Nama' }, { key: 'title', header: 'Title', default: 0 }]}
            renderCell={({ data, isEditing, field, handleInputChange }) => 
                isEditing ? (
                    <input type={field === 'title' ? "number" : "text"} value={data[field]} onChange={e => handleInputChange(field, e.target.value)} className="w-full px-2 py-1 rounded border focus:outline-none text-[var(--color-button-blue)] bg-transparent"/>
                // ✨ DIUBAH: Menambahkan class warna pada teks
                ) : <span className="text-[var(--color-button-blue)]">{data[field]}</span>
            }
        />

        {/* Modal Preview */}
        {modalImg && (
          <div className="fixed z-50 inset-0 bg-black/70 flex items-center justify-center" onClick={() => setModalImg(null)}>
            <img src={modalImg} alt="Preview" className="max-h-[60vh] max-w-[90vw] rounded-lg shadow-2xl border-4 border-white" onClick={e => e.stopPropagation()} />
          </div>
        )}
      </div>
    </div>
  );
};

export default JourneyCard;