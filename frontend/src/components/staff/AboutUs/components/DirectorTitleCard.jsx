import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const DirectorTitleCard = ({ id, onRemove }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <div className="relative mb-4">
      {/* Accent kiri */}
      <div className="absolute left-0 top-0 h-full w-2 rounded-l-lg bg-[var(--color-accent)] dark:bg-[var(--color-button-blue)]"></div>
      {/* Tombol hapus */}
      <button
        onClick={() => onRemove(id)}
        className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 z-10"
        title="Hapus Title"
        aria-label="Hapus Title"
        type="button"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>
      {/* Card */}
      <div className="ml-2 bg-white dark:bg-[var(--color-card-bg)] rounded-lg shadow-elevated px-6 pt-5 pb-6">
        <h3 className="text-lg font-bold mb-1 text-[var(--color-button-blue)]">Title</h3>
        <p className="text-[13px] mb-4 text-[var(--color-button-blue)]"></p>
        <input
          type="text"
          placeholder="Masukkan title"
          className="w-full px-4 py-2 bg-gray-100 dark:bg-[var(--color-card-secondary)] border border-gray-300 dark:border-gray-600 text-[var(--color-button-blue)] rounded-xl mb-4 focus:outline-none"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Masukkan deskripsi..."
          className="w-full px-4 py-2 bg-gray-100 dark:bg-[var(--color-card-secondary)] border border-gray-300 dark:border-gray-600 text-[var(--color-button-blue)] rounded-xl mb-4 resize-none focus:outline-none"
          value={desc}
          rows={2}
          onChange={e => setDesc(e.target.value)}
        />
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

export default DirectorTitleCard;
