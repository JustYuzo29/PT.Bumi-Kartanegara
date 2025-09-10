import React from "react";

const TitleSection = () => {
  return (
    <section className="bg-white rounded-xl p-4 shadow-md border border-gray-200 dark:bg-[var(--color-card-bg)] dark:border-none">
      <h2 className="text-sm font-semibold text-[var(--color-sidebar)] dark:text-[var(--color-text-light)] mb-1">
        Title
      </h2>
      <p className="text-xs text-gray-500 mb-2"></p>

      <input
        type="text"
        placeholder="LOREM IPSUM WMAMAMAMAMAKKWKWKWKWKWKWKWKW"
        className="w-full mb-3 px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-black dark:bg-[var(--color-card-bg)] dark:text-white dark:border-gray-600"
      />

      <div className="flex justify-start gap-3">
        <button className="bg-[var(--color-button-blue)] text-white text-sm px-4 py-1 rounded-md">
          Simpan
        </button>
        <button className="bg-[var(--color-sidebar)] text-white text-sm px-4 py-1 rounded-md">
          Hapus
        </button>
      </div>
    </section>
  );
};

export default TitleSection;
