import React, { useState, useEffect } from "react";
import {
  XMarkIcon, TrashIcon, CheckIcon, PencilSquareIcon, PlusIcon
} from "@heroicons/react/24/solid";

const DirectorProfileCard = ({ id, onRemove, profileNo, initialData, onDataChange }) => {
  // Initialize state from props or defaults
  const [pictureRows, setPictureRows] = useState(() => {
    return initialData?.pictureRows || [
      { id: Date.now() + Math.random(), nama: "", file: null, isEditing: true },
    ];
  });
  
  const [titleRows, setTitleRows] = useState(() => {
    return initialData?.titleRows || [
      { id: Date.now() + Math.random(), nama: "", isEditing: true },
    ];
  });
  
  const [descRows, setDescRows] = useState(() => {
    return initialData?.descRows || [
      { id: Date.now() + Math.random(), nama: "", isEditing: true },
    ];
  });

  // Notify parent component when data changes
  useEffect(() => {
    if (onDataChange) {
      onDataChange(id, {
        pictureRows,
        titleRows,
        descRows,
      });
    }
  }, [pictureRows, titleRows, descRows, id, onDataChange]);

  // Picture row handler
  const handlePictureName = (rowId, value) => {
    setPictureRows((prev) =>
      prev.map((row) => row.id === rowId ? { ...row, nama: value } : row)
    );
  };
  const handlePictureFile = (rowId, e) => {
    const file = e.target.files[0];
    setPictureRows((prev) =>
      prev.map((row) => row.id === rowId ? { ...row, file, isEditing: true } : row)
    );
  };
  const savePictureRow = (rowId) => {
    setPictureRows((prev) =>
      prev.map((row) => row.id === rowId ? { ...row, isEditing: false } : row)
    );
  };
  const editPictureRow = (rowId) => {
    setPictureRows((prev) =>
      prev.map((row) => row.id === rowId ? { ...row, isEditing: true } : row)
    );
  };
  const deletePictureRow = (rowId) => {
    setPictureRows((prev) => prev.filter((row) => row.id !== rowId));
  };
  const addPictureRow = () => {
    setPictureRows((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), nama: "", file: null, isEditing: true },
    ]);
  };

  // Title row handler (bisa multi jika perlu, persis title)
  const handleTitleName = (rowId, value) => {
    setTitleRows((prev) =>
      prev.map((row) => row.id === rowId ? { ...row, nama: value } : row)
    );
  };
  const saveTitleRow = (rowId) => {
    setTitleRows((prev) =>
      prev.map((row) => row.id === rowId ? { ...row, isEditing: false } : row)
    );
  };
  const editTitleRow = (rowId) => {
    setTitleRows((prev) =>
      prev.map((row) => row.id === rowId ? { ...row, isEditing: true } : row)
    );
  };
  const addTitleRow = () => {
    setTitleRows((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), nama: "", isEditing: true },
    ]);
  };

  // Description row handler (bisa multi jika perlu, persis desc)
  const handleDescName = (rowId, value) => {
    setDescRows((prev) =>
      prev.map((row) => row.id === rowId ? { ...row, nama: value } : row)
    );
  };
  const saveDescRow = (rowId) => {
    setDescRows((prev) =>
      prev.map((row) => row.id === rowId ? { ...row, isEditing: false } : row)
    );
  };
  const editDescRow = (rowId) => {
    setDescRows((prev) =>
      prev.map((row) => row.id === rowId ? { ...row, isEditing: true } : row)
    );
  };
  const addDescRow = () => {
    setDescRows((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), nama: "", isEditing: true },
    ]);
  };

  return (
    <div className="relative mb-4">
      <div className="absolute left-0 top-0 h-full w-2 rounded-l-lg bg-[var(--color-accent)] dark:bg-[var(--color-button-blue)]"></div>
      <button
        onClick={() => onRemove(id)}
        className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 z-10"
        title="Hapus Profile"
        aria-label="Hapus Profile"
        type="button"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>
      <div className="ml-2 bg-white dark:bg-[var(--color-card-bg)] rounded-lg shadow-elevated px-6 pt-5 pb-6">
        <h3 className="text-lg font-bold mb-1 text-[var(--color-button-blue)]">
          Profile {profileNo}
        </h3>
        <p className="text-[13px] mb-4 text-[var(--color-button-blue)]">
          
        </p>

        {/* === Table Picture === */}
        <table className="w-full text-sm mb-2 border-collapse">
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-600">
              <th className="p-2 font-semibold text-left text-[var(--color-button-blue)]">Picture</th>
              <th className="p-2 font-semibold text-left text-[var(--color-button-blue)]">nama</th>
              <th className="p-2 font-semibold text-left text-[var(--color-button-blue)]">title</th>
              <th className="p-2 font-semibold text-center text-[var(--color-button-blue)]">action</th>
            </tr>
          </thead>
          <tbody>
            {pictureRows.map((row) => (
              <tr key={row.id} className="border-b border-gray-200 dark:border-gray-500">
                <td className="p-2 font-semibold text-[var(--color-button-blue)]">picture</td>
                <td className="p-2">
                  {row.isEditing ? (
                    <input
                      type="text"
                      className="w-full px-2 py-1 rounded border focus:outline-none text-[var(--color-button-blue)]"
                      value={row.nama}
                      onChange={(e) => handlePictureName(row.id, e.target.value)}
                      placeholder="nama"
                    />
                  ) : (
                    <span className="text-[var(--color-button-blue)]">{row.nama}</span>
                  )}
                </td>
                <td className="p-2">
                  {row.isEditing ? (
                    <>
                      <label className="inline-block cursor-pointer px-3 py-1 bg-[var(--color-button-blue)] text-white rounded text-xs">
                        Pilih Gambar
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={e => handlePictureFile(row.id, e)}
                        />
                      </label>
                      {row.file && (
                        <span className="ml-2 text-[var(--color-button-blue)]">{row.file.name}</span>
                      )}
                    </>
                  ) : (
                    row.file ? (
                      <span className="text-[var(--color-button-blue)]">{row.file.name}</span>
                    ) : (
                      <span className="italic text-gray-400">Belum ada gambar</span>
                    )
                  )}
                </td>
                <td className="p-2 flex gap-2 justify-center">
                  {row.isEditing ? (
                    <button
                      onClick={() => savePictureRow(row.id)}
                      className="p-1 rounded hover:bg-green-100"
                      title="Simpan"
                    >
                      <CheckIcon className="w-5 h-5 text-green-500" />
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => editPictureRow(row.id)}
                        className="p-1 rounded hover:bg-[var(--color-accent)]"
                        title="Edit"
                      >
                        <PencilSquareIcon className="w-5 h-5 text-yellow-500" />
                      </button>
                      <button
                        onClick={() => deletePictureRow(row.id)}
                        className="p-1 rounded hover:bg-red-100"
                        title="Hapus"
                      >
                        <TrashIcon className="w-5 h-5 text-red-500" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={addPictureRow}
          type="button"
          className="flex items-center gap-2 text-[var(--color-button-blue)] hover:text-[var(--color-accent)] font-semibold mb-3"
        >
          <PlusIcon className="w-5 h-5" />
          Tambah Baris Picture
        </button>

        {/* === Table Title === */}
        <table className="w-full text-sm mb-2 border-collapse">
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-600">
              <th className="p-2 font-semibold text-left text-[var(--color-button-blue)]">Title</th>
              <th className="p-2 font-semibold text-left text-[var(--color-button-blue)]">nama</th>
              <th className="p-2 font-semibold text-center text-[var(--color-button-blue)]">action</th>
            </tr>
          </thead>
          <tbody>
            {titleRows.map((row) => (
              <tr key={row.id} className="border-b border-gray-200 dark:border-gray-500">
                <td className="p-2 font-semibold text-[var(--color-button-blue)]">title</td>
                <td className="p-2">
                  {row.isEditing ? (
                    <input
                      type="text"
                      className="w-full px-2 py-1 rounded border focus:outline-none text-[var(--color-button-blue)]"
                      value={row.nama}
                      onChange={(e) => handleTitleName(row.id, e.target.value)}
                      placeholder="nama"
                    />
                  ) : (
                    <span className="text-[var(--color-button-blue)]">{row.nama}</span>
                  )}
                </td>
                <td className="p-2 flex gap-2 justify-center">
                  {row.isEditing ? (
                    <button
                      onClick={() => saveTitleRow(row.id)}
                      className="p-1 rounded hover:bg-green-100"
                      title="Simpan"
                    >
                      <CheckIcon className="w-5 h-5 text-green-500" />
                    </button>
                  ) : (
                    <button
                      onClick={() => editTitleRow(row.id)}
                      className="p-1 rounded hover:bg-[var(--color-accent)]"
                      title="Edit"
                    >
                      <PencilSquareIcon className="w-5 h-5 text-yellow-500" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={addTitleRow}
          type="button"
          className="flex items-center gap-2 text-[var(--color-button-blue)] hover:text-[var(--color-accent)] font-semibold mb-3"
        >
          <PlusIcon className="w-5 h-5" />
          Tambah Baris Title
        </button>

        {/* === Table Description === */}
        <table className="w-full text-sm mb-2 border-collapse">
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-600">
              <th className="p-2 font-semibold text-left text-[var(--color-button-blue)]">Description</th>
              <th className="p-2 font-semibold text-left text-[var(--color-button-blue)]">nama</th>
              <th className="p-2 font-semibold text-center text-[var(--color-button-blue)]">action</th>
            </tr>
          </thead>
          <tbody>
            {descRows.map((row) => (
              <tr key={row.id} className="border-b border-gray-200 dark:border-gray-500">
                <td className="p-2 font-semibold text-[var(--color-button-blue)]">desc</td>
                <td className="p-2">
                  {row.isEditing ? (
                    <textarea
                      rows={2}
                      className="w-full px-2 py-1 rounded border focus:outline-none text-[var(--color-button-blue)] resize-none"
                      value={row.nama}
                      onChange={(e) => handleDescName(row.id, e.target.value)}
                      placeholder="nama"
                    />
                  ) : (
                    <span className="text-[var(--color-button-blue)]">{row.nama}</span>
                  )}
                </td>
                <td className="p-2 flex gap-2 justify-center">
                  {row.isEditing ? (
                    <button
                      onClick={() => saveDescRow(row.id)}
                      className="p-1 rounded hover:bg-green-100"
                      title="Simpan"
                    >
                      <CheckIcon className="w-5 h-5 text-green-500" />
                    </button>
                  ) : (
                    <button
                      onClick={() => editDescRow(row.id)}
                      className="p-1 rounded hover:bg-[var(--color-accent)]"
                      title="Edit"
                    >
                      <PencilSquareIcon className="w-5 h-5 text-yellow-500" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={addDescRow}
          type="button"
          className="flex items-center gap-2 text-[var(--color-button-blue)] hover:text-[var(--color-accent)] font-semibold"
        >
          <PlusIcon className="w-5 h-5" />
          Tambah Baris Desc
        </button>
      </div>
    </div>
  );
};

export default DirectorProfileCard;
