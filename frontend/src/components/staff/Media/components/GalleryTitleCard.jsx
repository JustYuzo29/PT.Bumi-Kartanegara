import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const GalleryTitleCard = ({ id, onRemove }) => {
  // State untuk menyimpan isi dari input judul, dimulai dengan string kosong
  const [title, setTitle] = useState("");

  // Fungsi yang dipanggil saat tombol "simpan" diklik
  const handleSave = () => {
    // Validasi sederhana agar judul tidak kosong
    if (!title.trim()) {
      alert("Title tidak boleh kosong.");
      return;
    }
    // Di aplikasi nyata, ini adalah tempat untuk mengirim data ke server
    console.log("Data untuk disimpan:", { cardId: id, title: title });
    alert(`Title untuk card ID: ${id} telah disimpan!`);
  };

  return (
    <div className="relative mb-4">
      {/* Garis aksen kiri */}
      <div className="absolute left-0 top-0 h-full w-2 rounded-l-lg bg-[var(--color-accent)] dark:bg-[var(--color-button-blue)]"></div>

      {/* Tombol hapus kartu */}
      <button
        onClick={() => onRemove(id)}
        className="absolute top-3 right-3 p-1 text-gray-400 z-10"
        title="Hapus Title"
        aria-label="Hapus Title"
        type="button"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>

      <div className="ml-2 bg-white dark:bg-[var(--color-card-bg)] rounded-lg shadow-elevated px-6 pt-5 pb-6">
        <h3 className="text-lg font-bold mb-1 text-[var(--color-button-blue)]">
          Title
        </h3>
        {/* Teks instruksi yang lebih jelas */}
        <p className="text-[13px] mb-4 text-[var(--color-button-blue)]">
          Masukkan judul utama untuk galeri Anda di bawah ini.
        </p>

        {/* DIUBAH: Div statis menjadi input field yang bisa diedit */}
        <input
          type="text"
          className="w-full bg-gray-100 dark:bg-[var(--color-card-secondary)] rounded p-3 mb-4 text-[var(--color-button-blue)] outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Masukkan judul galeri Anda di sini"
        />

        <div className="flex gap-4">
          {/* DIUBAH: Tombol simpan kini memiliki fungsi onClick */}
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

export default GalleryTitleCard;