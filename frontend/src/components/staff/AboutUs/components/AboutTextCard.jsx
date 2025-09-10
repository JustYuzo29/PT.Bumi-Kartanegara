import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const AboutTextCard = ({ id, onRemove }) => {
  const [text, setText] = useState("");

  return (
    <div className="relative mb-4">
      <div className="absolute left-0 top-0 h-full w-2 rounded-l-lg bg-[var(--color-accent)] dark:bg-[var(--color-button-blue)]"></div>

      <button
        onClick={() => onRemove(id)}
        className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 z-10"
        title="Hapus Text"
        aria-label="Hapus Text"
        type="button"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>

      <div className="ml-2 bg-white dark:bg-[var(--color-card-bg)] rounded-lg shadow-elevated px-6 pt-5 pb-6">
        <h3 className="text-lg font-bold mb-1 text-[var(--color-button-blue)]">Text</h3>
        <p className="text-[13px] mb-4 text-[var(--color-button-blue)]">
          
        </p>
        <textarea
          placeholder="Masukkan teks di sini..."
          rows={5}
          className="w-full px-4 py-2 bg-gray-100 dark:bg-[var(--color-card-secondary)] border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none text-[var(--color-button-blue)] resize-none mb-4"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex gap-4">
          <button className="btn-primary rounded-full shadow min-w-[100px]">Simpan</button>
          <button
            className="btn-primary rounded-full shadow min-w-[100px]"
            onClick={() => onRemove(id)}
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutTextCard;
