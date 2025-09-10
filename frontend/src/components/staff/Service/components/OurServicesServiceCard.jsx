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
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"]; // Menambahkan SVG untuk ikon

const OurServicesServiceCard = ({ id, onRemove, cardIndex }) => {
  const [pictures, setPictures] = useState([]);
  const [icons, setIcons] = useState([]);
  const [texts, setTexts] = useState([]);
  const [error, setError] = useState(""); // State untuk pesan error

  // Effect untuk membersihkan Object URL saat komponen unmount atau rows berubah
  useEffect(() => {
    return () => {
      [...pictures, ...icons].forEach((row) => {
        if (row.preview) URL.revokeObjectURL(row.preview);
      });
    };
  }, [pictures, icons]);

  // --- Helper untuk Validasi Umum ---
  const validateRow = (row, isFileRequired = false) => {
    if (!row.nama.trim()) {
      return "Nama tidak boleh kosong.";
    }
    if (isFileRequired && !row.file) {
      return "File gambar/ikon wajib diunggah.";
    }
    return null; // Tidak ada error
  };

  const hasUnsavedChangesInAnyTable = () => {
    return (
      pictures.some((row) => row.isEditing) ||
      icons.some((row) => row.isEditing) ||
      texts.some((row) => row.isEditing)
    );
  };

  // --- CRUD Functions for Pictures ---
  const addPictureRow = () => {
    if (hasUnsavedChangesInAnyTable()) {
      setError("Harap simpan perubahan yang ada sebelum menambah baris baru.");
      return;
    }
    setPictures((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), nama: "", file: null, preview: "", isEditing: true },
    ]);
    setError("");
  };

  const handlePictureChange = (rowId, field, value) => {
    setPictures((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, [field]: value } : row))
    );
  };

  const handlePictureFileChange = (rowId, e) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) {
      e.target.value = null; // Reset input file
      return;
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setError("Format gambar harus JPG, PNG, WEBP, atau SVG.");
      e.target.value = null;
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("Ukuran gambar maksimal 1MB.");
      e.target.value = null;
      return;
    }

    const oldRow = pictures.find((r) => r.id === rowId);
    if (oldRow && oldRow.preview) URL.revokeObjectURL(oldRow.preview);

    const preview = URL.createObjectURL(file);
    setError("");
    setPictures((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, file, preview, isEditing: true } : row))
    );
  };

  const savePictureRow = (rowId) => {
    const currentRow = pictures.find((row) => row.id === rowId);
    const validationError = validateRow(currentRow, true); // File wajib ada
    if (validationError) {
      setError(validationError);
      return;
    }
    setPictures((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, isEditing: false } : row))
    );
    setError("");
    // TODO: Kirim data currentRow ke backend untuk gambar
  };

  const editPictureRow = (rowId) => {
    setPictures((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, isEditing: true } : row))
    );
    setError("");
  };

  const deletePictureRow = (rowId) => {
    if (pictures.length <= 1) { // Minimal satu baris gambar
      setError("Tidak dapat menghapus baris gambar terakhir.");
      return;
    }
    const rowToDelete = pictures.find((r) => r.id === rowId);
    if (rowToDelete && rowToDelete.preview) URL.revokeObjectURL(rowToDelete.preview);
    setPictures((prev) => prev.filter((row) => row.id !== rowId));
    setError("");
  };

  const removePictureFile = (rowId) => {
    const rowToClear = pictures.find((r) => r.id === rowId);
    if (rowToClear && rowToClear.preview) URL.revokeObjectURL(rowToClear.preview);
    setPictures((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, file: null, preview: "", isEditing: true } : row))
    );
    setError("");
  };

  // --- CRUD Functions for Icons (Mirip dengan Pictures) ---
  const addIconRow = () => {
    if (hasUnsavedChangesInAnyTable()) {
      setError("Harap simpan perubahan yang ada sebelum menambah baris baru.");
      return;
    }
    setIcons((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), nama: "", file: null, preview: "", isEditing: true },
    ]);
    setError("");
  };

  const handleIconChange = (rowId, field, value) => {
    setIcons((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, [field]: value } : row))
    );
  };

  const handleIconFileChange = (rowId, e) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) {
      e.target.value = null;
      return;
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setError("Format ikon harus JPG, PNG, WEBP, atau SVG.");
      e.target.value = null;
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("Ukuran ikon maksimal 1MB.");
      e.target.value = null;
      return;
    }

    const oldRow = icons.find((r) => r.id === rowId);
    if (oldRow && oldRow.preview) URL.revokeObjectURL(oldRow.preview);

    const preview = URL.createObjectURL(file);
    setError("");
    setIcons((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, file, preview, isEditing: true } : row))
    );
  };

  const saveIconRow = (rowId) => {
    const currentRow = icons.find((row) => row.id === rowId);
    const validationError = validateRow(currentRow, true);
    if (validationError) {
      setError(validationError);
      return;
    }
    setIcons((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, isEditing: false } : row))
    );
    setError("");
    // TODO: Kirim data currentRow ke backend untuk ikon
  };

  const editIconRow = (rowId) => {
    setIcons((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, isEditing: true } : row))
    );
    setError("");
  };

  const deleteIconRow = (rowId) => {
    if (icons.length <= 1) { // Minimal satu baris ikon
      setError("Tidak dapat menghapus baris ikon terakhir.");
      return;
    }
    const rowToDelete = icons.find((r) => r.id === rowId);
    if (rowToDelete && rowToDelete.preview) URL.revokeObjectURL(rowToDelete.preview);
    setIcons((prev) => prev.filter((row) => row.id !== rowId));
    setError("");
  };

  const removeIconFile = (rowId) => {
    const rowToClear = icons.find((r) => r.id === rowId);
    if (rowToClear && rowToClear.preview) URL.revokeObjectURL(rowToClear.preview);
    setIcons((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, file: null, preview: "", isEditing: true } : row))
    );
    setError("");
  };

  // --- CRUD Functions for Texts ---
  const addTextRow = () => {
    if (hasUnsavedChangesInAnyTable()) {
      setError("Harap simpan perubahan yang ada sebelum menambah baris baru.");
      return;
    }
    setTexts((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), nama: "", title: "", isEditing: true },
    ]);
    setError("");
  };

  const handleTextChange = (rowId, field, value) => {
    setTexts((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, [field]: value } : row))
    );
  };

  const saveTextRow = (rowId) => {
    const currentRow = texts.find((row) => row.id === rowId);
    const validationError = validateRow(currentRow); // File tidak wajib untuk teks
    if (validationError) {
      setError(validationError);
      return;
    }
    setTexts((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, isEditing: false } : row))
    );
    setError("");
    // TODO: Kirim data currentRow ke backend untuk teks
  };

  const editTextRow = (rowId) => {
    setTexts((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, isEditing: true } : row))
    );
    setError("");
  };

  const deleteTextRow = (rowId) => {
    if (texts.length <= 1) { // Minimal satu baris teks
      setError("Tidak dapat menghapus baris teks terakhir.");
      return;
    }
    setTexts((prev) => prev.filter((row) => row.id !== rowId));
    setError("");
  };


  return (
    <div className="relative mb-4">
      <div className="absolute left-0 top-0 h-full w-2 rounded-l-lg bg-[var(--color-accent)] dark:bg-[var(--color-button-blue)]"></div>
      <button
        onClick={() => onRemove(id)}
        className="absolute top-3 right-3 p-1 text-gray-400 dark:text-gray-500 z-10" // Tanpa hover
        title="Hapus Card"
        aria-label="Hapus Card"
        type="button"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>
      <div className="ml-2 bg-white dark:bg-[var(--color-card-bg)] rounded-lg shadow-elevated px-6 pt-5 pb-6">
        <h3 className="text-lg font-bold mb-1 text-[var(--color-button-blue)]">
          Card {cardIndex || 1} {/* Menggunakan prop cardIndex */}
        </h3>
        <p className="text-[13px] mb-4 text-[var(--color-button-blue)]">
          Kelola gambar, ikon, dan teks untuk kartu layanan ini.
        </p>

        {/* AREA UNTUK MENAMPILKAN ERROR (Menggunakan MUI Alert) */}
        {error && (
          <Stack sx={{ width: '100%', marginBottom: '1rem' }} spacing={2}>
            <Alert
              severity="warning"
              // onClose={() => setError("")} // Dihapus: Properto onClose
              sx={{
                  backgroundColor: 'var(--color-card-secondary)',
                  color: 'var(--color-button-blue)',
                  '.MuiAlert-icon': {
                      color: 'var(--color-accent) !important',
                  },
                  '.MuiAlert-action': {
                      color: 'var(--color-button-blue) !important',
                  },
              }}
            >
              {error}
            </Alert>
          </Stack>
        )}

        {/* TABEL PICTURE */}
        <h4 className="text-md font-bold mb-2 mt-4 text-[var(--color-button-blue)]">Gambar Layanan</h4>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse table-fixed">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-600 text-[var(--color-button-blue)] font-bold">
                <th className="p-2 text-left w-[20%]">Gambar</th>
                <th className="p-2 text-left w-[30%]">Nama</th>
                <th className="p-2 text-left w-[30%]">Aksi File</th> {/* Nama kolom lebih spesifik */}
                <th className="p-2 text-center w-[20%]">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pictures.map((row) => (
                <tr key={row.id} className="border-b border-gray-200 dark:border-gray-500 align-top">
                  <td className="p-2">
                    {row.isEditing ? (
                      <label className="inline-block cursor-pointer px-3 py-1 bg-[var(--color-button-blue)] text-white rounded text-xs whitespace-nowrap">
                        Pilih
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handlePictureFileChange(row.id, e)}
                        />
                      </label>
                    ) : (
                      row.preview && (
                        <img
                          src={row.preview}
                          alt={row.nama || "gambar"}
                          className="w-14 h-14 rounded object-cover border"
                        />
                      )
                    )}
                  </td>
                  <td className="p-2">
                    {row.isEditing ? (
                      <input
                        type="text"
                        className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 focus:outline-none text-[var(--color-button-blue)] bg-transparent"
                        value={row.nama}
                        onChange={(e) => handlePictureChange(row.id, "nama", e.target.value)}
                        placeholder="Nama gambar"
                      />
                    ) : (
                      <span className="text-[var(--color-button-blue)] whitespace-pre-wrap">{row.nama}</span>
                    )}
                  </td>
                  <td className="p-2 text-[var(--color-button-blue)]">
                    {row.isEditing ? (
                      <div className="flex items-center gap-2 flex-wrap">
                        {row.file && (
                          <>
                            <span className="truncate max-w-[calc(100%-40px)]" title={row.file.name}>{row.file.name}</span>
                            <button
                              onClick={() => removePictureFile(row.id)}
                              className="text-red-500" // Tanpa hover
                              title="Hapus gambar"
                            >
                              <TrashIcon className="inline w-5 h-5" />
                            </button>
                          </>
                        )}
                      </div>
                    ) : (
                      row.file ? (
                        <span className="whitespace-pre-wrap">{row.file.name}</span>
                      ) : (
                        <span className="italic text-gray-400">Belum ada file</span>
                      )
                    )}
                  </td>
                  <td className="p-2">
                    <div className="flex gap-2 justify-center items-center">
                      {row.isEditing ? (
                        <>
                          <button onClick={() => savePictureRow(row.id)} className="p-1 rounded" title="Simpan">
                            <CheckIcon className="w-5 h-5 text-green-500" />
                          </button>
                          <button onClick={() => deletePictureRow(row.id)} className="p-1 rounded" title="Batal">
                            <XMarkIcon className="w-5 h-5 text-red-500" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => editPictureRow(row.id)} className="p-1 rounded" title="Edit">
                            <PencilSquareIcon className="w-5 h-5 text-yellow-500" />
                          </button>
                          <button onClick={() => deletePictureRow(row.id)} className="p-1 rounded" title="Hapus">
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
          <button
            onClick={addPictureRow}
            type="button"
            className="flex items-center gap-2 text-[var(--color-button-blue)] font-semibold text-sm mt-2" // Tanpa hover
            title="Tambah Baris Gambar"
          >
            <PlusIcon className="w-5 h-5" />
            Tambah Baris Gambar
          </button>
        </div>

        {/* TABEL ICON */}
        <h4 className="text-md font-bold mb-2 mt-4 text-[var(--color-button-blue)]">Ikon Layanan</h4>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse table-fixed">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-600 text-[var(--color-button-blue)] font-bold">
                <th className="p-2 text-left w-[20%]">Ikon</th>
                <th className="p-2 text-left w-[30%]">Nama</th>
                <th className="p-2 text-left w-[30%]">Aksi File</th>
                <th className="p-2 text-center w-[20%]">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {icons.map((row) => (
                <tr key={row.id} className="border-b border-gray-200 dark:border-gray-500 align-top">
                  <td className="p-2">
                    {row.isEditing ? (
                      <label className="inline-block cursor-pointer px-3 py-1 bg-[var(--color-button-blue)] text-white rounded text-xs whitespace-nowrap">
                        Pilih
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleIconFileChange(row.id, e)}
                        />
                      </label>
                    ) : (
                      row.preview && (
                        <img
                          src={row.preview}
                          alt={row.nama || "ikon"}
                          className="w-14 h-14 rounded object-cover border"
                        />
                      )
                    )}
                  </td>
                  <td className="p-2">
                    {row.isEditing ? (
                      <input
                        type="text"
                        className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 focus:outline-none text-[var(--color-button-blue)] bg-transparent"
                        value={row.nama}
                        onChange={(e) => handleIconChange(row.id, "nama", e.target.value)}
                        placeholder="Nama ikon"
                      />
                    ) : (
                      <span className="text-[var(--color-button-blue)] whitespace-pre-wrap">{row.nama}</span>
                    )}
                  </td>
                  <td className="p-2 text-[var(--color-button-blue)]">
                    {row.isEditing ? (
                      <div className="flex items-center gap-2 flex-wrap">
                        {row.file && (
                          <>
                            <span className="truncate max-w-[calc(100%-40px)]" title={row.file.name}>{row.file.name}</span>
                            <button
                              onClick={() => removeIconFile(row.id)}
                              className="text-red-500" // Tanpa hover
                              title="Hapus ikon"
                            >
                              <TrashIcon className="inline w-5 h-5" />
                            </button>
                          </>
                        )}
                      </div>
                    ) : (
                      row.file ? (
                        <span className="whitespace-pre-wrap">{row.file.name}</span>
                      ) : (
                        <span className="italic text-gray-400">Belum ada file</span>
                      )
                    )}
                  </td>
                  <td className="p-2">
                    <div className="flex gap-2 justify-center items-center">
                      {row.isEditing ? (
                        <>
                          <button onClick={() => saveIconRow(row.id)} className="p-1 rounded" title="Simpan">
                            <CheckIcon className="w-5 h-5 text-green-500" />
                          </button>
                          <button onClick={() => deleteIconRow(row.id)} className="p-1 rounded" title="Batal">
                            <XMarkIcon className="w-5 h-5 text-red-500" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => editIconRow(row.id)} className="p-1 rounded" title="Edit">
                            <PencilSquareIcon className="w-5 h-5 text-yellow-500" />
                          </button>
                          <button onClick={() => deleteIconRow(row.id)} className="p-1 rounded" title="Hapus">
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
          <button
            onClick={addIconRow}
            type="button"
            className="flex items-center gap-2 text-[var(--color-button-blue)] font-semibold text-sm mt-2" // Tanpa hover
            title="Tambah Baris Ikon"
          >
            <PlusIcon className="w-5 h-5" />
            Tambah Baris Ikon
          </button>
        </div>

        {/* TABEL TEXT */}
        <h4 className="text-md font-bold mb-2 mt-4 text-[var(--color-button-blue)]">Teks Layanan</h4>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse table-fixed">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-600 text-[var(--color-button-blue)] font-bold">
                <th className="p-2 text-left w-[40%]">Nama</th>
                <th className="p-2 text-left w-[40%]">Deskripsi</th>
                <th className="p-2 text-center w-[20%]">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {texts.map((row) => (
                <tr key={row.id} className="border-b border-gray-200 dark:border-gray-500 align-top">
                  <td className="p-2">
                    {row.isEditing ? (
                      <input
                        type="text"
                        className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 focus:outline-none text-[var(--color-button-blue)] bg-transparent"
                        value={row.nama}
                        onChange={(e) => handleTextChange(row.id, "nama", e.target.value)}
                        placeholder="Nama teks"
                      />
                    ) : (
                      <span className="text-[var(--color-button-blue)] whitespace-pre-wrap">{row.nama}</span>
                    )}
                  </td>
                  <td className="p-2">
                    {row.isEditing ? (
                      <textarea
                        rows={2} // Menggunakan textarea untuk deskripsi
                        className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 focus:outline-none text-[var(--color-button-blue)] resize-y bg-transparent"
                        value={row.title}
                        onChange={(e) => handleTextChange(row.id, "title", e.target.value)}
                        placeholder="Isi deskripsi"
                      />
                    ) : (
                      <span className="text-[var(--color-button-blue)] whitespace-pre-wrap">{row.title}</span>
                    )}
                  </td>
                  <td className="p-2">
                    <div className="flex gap-2 justify-center items-center">
                      {row.isEditing ? (
                        <>
                          <button onClick={() => saveTextRow(row.id)} className="p-1 rounded" title="Simpan">
                            <CheckIcon className="w-5 h-5 text-green-500" />
                          </button>
                          <button onClick={() => deleteTextRow(row.id)} className="p-1 rounded" title="Batal">
                            <XMarkIcon className="w-5 h-5 text-red-500" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => editTextRow(row.id)} className="p-1 rounded" title="Edit">
                            <PencilSquareIcon className="w-5 h-5 text-yellow-500" />
                          </button>
                          <button onClick={() => deleteTextRow(row.id)} className="p-1 rounded" title="Hapus">
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
          <button
            onClick={addTextRow}
            type="button"
            className="flex items-center gap-2 text-[var(--color-button-blue)] font-semibold text-sm mt-2" // Tanpa hover
            title="Tambah Baris Teks"
          >
            <PlusIcon className="w-5 h-5" />
            Tambah Baris Teks
          </button>
        </div>
      </div>
    </div>
  );
};

export default OurServicesServiceCard;