import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const ContactTitleCard = ({ id, onRemove, titleIdx }) => (
  <div className="relative mb-4">
    <div className="absolute left-0 top-0 h-full w-2 rounded-l-lg bg-[var(--color-accent)] dark:bg-[var(--color-button-blue)]"></div>
    <button
      onClick={() => onRemove(id)}
      className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-500 z-10"
      title="Hapus Title"
      aria-label="Hapus Title"
      type="button"
    >
      <XMarkIcon className="w-5 h-5" />
    </button>
    <div className="ml-2 bg-white dark:bg-[var(--color-card-bg)] rounded-lg shadow-elevated px-6 pt-5 pb-6">
      <h3 className="text-lg font-bold mb-1 text-[var(--color-button-blue)]">
        Title {titleIdx}
      </h3>
      <p className="text-[13px] mb-4 text-[var(--color-button-blue)]">lorem ipsum wkwkwkwkwkw</p>
      <div className="border-b border-gray-200 dark:border-gray-600 mb-3" />
      <p className="font-bold text-[var(--color-button-blue)] text-sm mb-2">LOREM IPSUM WMMMMMKVWMKWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMW</p>
      <div className="flex gap-4 mt-4">
        <button className="btn-primary rounded-full shadow min-w-[100px]">simpan</button>
        <button className="btn-primary rounded-full shadow min-w-[100px]" onClick={() => onRemove(id)}>
          hapus
        </button>
      </div>
    </div>
  </div>
);

export default ContactTitleCard;
