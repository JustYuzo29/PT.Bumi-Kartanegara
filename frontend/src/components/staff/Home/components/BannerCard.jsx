import React from 'react';
import { XMarkIcon } from "@heroicons/react/24/solid";

const BannerCard = ({ id, onRemove, selectedFile, onFileChange }) => {
  const handleRemove = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this file?');
    if (confirmDelete) {
      onRemove(id);
    }
  };

  return (
    <div className="relative mb-4">
      {/* Aksen kiri: kuning di light, biru navy gelap di dark */}
      <div className="absolute left-0 top-0 h-full w-2 rounded-l-lg bg-[var(--color-accent)] dark:bg-[var(--color-button-blue)]"></div>

      {/* Tombol X kanan atas */}
      <button
        className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors z-10"
        aria-label="Hapus Card"
        title="Hapus Card"
        onClick={handleRemove}
        type="button"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>

      {/* Card */}
      <div className="ml-2 bg-white dark:bg-[var(--color-card-bg)] rounded-lg shadow-elevated px-6 pt-5 pb-6 border border-transparent">
        {/* Judul & deskripsi */}
        <h3 className="text-lg font-bold mb-0.5 text-[var(--color-button-blue)]">Banner</h3>
        <p className="text-[13px] mb-4 text-[var(--color-button-blue)]"></p>

        {/* Input file (bg biru sekunder di darkmode) */}
        <div className="flex w-full mb-5">
          <input
            type="text"
            className="flex-grow px-4 py-2 bg-gray-100 dark:bg-[var(--color-card-secondary)] border border-gray-300 dark:border-gray-600 text-black dark:text-black rounded-l-full focus:outline-none"
            placeholder="No file chosen"
            value={selectedFile?.name || ""}
            readOnly
          />
          <label
            htmlFor={`banner-upload-${id}`}
            className="px-6 py-2 bg-[var(--color-button-blue)] text-white rounded-r-full text-sm font-semibold cursor-pointer flex items-center"
            style={{ marginLeft: '-1px' }}
          >
            pilih file
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id={`banner-upload-${id}`}
              onChange={(e) => onFileChange(e, id)}
            />
          </label>
        </div>

        {/* Tombol aksi */}
        <div className="flex gap-4">
          <button className="btn-primary rounded-full shadow min-w-[100px]">upload</button>
          <button
            className="btn-primary rounded-full shadow min-w-[100px]"
            onClick={() => {
              const confirmDelete = window.confirm('Are you sure you want to delete this file?');
              if (confirmDelete) {
                onFileChange(null, id);
              }
            }}
          >
            hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerCard;
