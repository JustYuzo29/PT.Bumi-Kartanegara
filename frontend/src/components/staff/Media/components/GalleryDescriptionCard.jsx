import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const GalleryDescriptionCard = ({ id, onRemove }) => {
  const [description, setDescription] = useState("");

  const handleSave = () => {
    if (!description.trim()) {
      alert("Deskripsi tidak boleh kosong.");
      return;
    }
    console.log("Data untuk disimpan:", { cardId: id, content: description });
    alert(`Deskripsi untuk card ID: ${id} telah disimpan!`);
  };

  return (
    <div className="relative mb-4">
      <div className="absolute left-0 top-0 h-full w-2 rounded-l-lg bg-[var(--color-accent)] dark:bg-[var(--color-button-blue)]"></div>
      <button
        onClick={() => onRemove(id)}
        className="absolute top-3 right-3 p-1 text-gray-400 z-10"
        title="Hapus Description"
        aria-label="Hapus Description"
        type="button"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>
      <div className="ml-2 bg-white dark:bg-[var(--color-card-bg)] rounded-lg shadow-elevated px-6 pt-5 pb-6">
        <h3 className="text-lg font-bold mb-1 text-[var(--color-button-blue)]">
          Description
        </h3>
        <p className="text-[13px] mb-4 text-[var(--color-button-blue)]">
          Isi atau ubah deskripsi untuk galeri Anda di bawah ini.
        </p>

        <textarea
          // ✨ DIUBAH: Menambahkan 'outline-none' untuk hapus garis tepi bawaan browser
          className="w-full bg-gray-100 dark:bg-[var(--color-card-secondary)] rounded p-3 mb-4 text-[var(--color-button-blue)] resize-none outline-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder="Tulis deskripsi lengkap untuk galeri Anda di sini. Anda bisa menjelaskan detail, cerita, atau informasi penting lainnya."
        />

        <div className="flex gap-4">
          <button
            className="btn-primary rounded-full shadow min-w-[100px]"
            onClick={handleSave}
          >
            simpan
          </button>
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

export default GalleryDescriptionCard;