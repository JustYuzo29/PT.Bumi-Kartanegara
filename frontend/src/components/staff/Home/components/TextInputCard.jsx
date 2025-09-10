import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const TextInputCard = ({ id, type, onRemove }) => {
  // type: "Title" atau "Text"
  const description =
    type === "Title"
      ? "Masukkan judul banner di bawah ini."
      : "Tulis deskripsi banner secara singkat.";

  return (
    <div className="relative mb-4">
      {/* Garis aksen kiri */}
      <div className="absolute left-0 top-0 h-full w-2 rounded-l-lg bg-[var(--color-accent)] dark:bg-[var(--color-button-blue)]"></div>

      {/* Tombol X kanan atas */}
      <button
        className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors z-10"
        aria-label={`Hapus ${type}`}
        title={`Hapus ${type}`}
        onClick={() => onRemove(id)}
        type="button"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>

      {/* Card */}
      <div className="ml-2 bg-white dark:bg-[var(--color-card-bg)] rounded-lg shadow-elevated px-6 pt-5 pb-6 border border-transparent">
        {/* Judul & deskripsi */}
        <h3 className="text-lg font-bold mb-0.5 text-[var(--color-button-blue)]">{type}</h3>
        <p className="text-[13px] mb-4 text-[var(--color-button-blue)]">
          {description}
        </p>

        {/* Textarea */}
        <textarea
          placeholder={`Masukkan ${type.toLowerCase()} di sini...`}
          className="w-full px-4 py-2 bg-gray-100 dark:bg-[var(--color-card-secondary)] border border-gray-300 dark:border-gray-600 text-black dark:text-black rounded-xl focus:outline-none resize-none mb-4"
          rows={type === "Text" ? 3 : 1}
        />

        {/* Tombol aksi */}
        <div className="flex gap-4">
          <button className="btn-primary rounded-full shadow min-w-[100px]">simpan</button>
          <button
            className="btn-primary rounded-full shadow min-w-[100px]"
            onClick={() => onRemove(id)}
          >
            hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextInputCard;
