import React from 'react';

const CardHeader = ({ title, onSave, onDelete }) => (
  <div className="flex justify-between items-center mb-3">
    <h3 className="text-sm font-medium text-gray-700 dark:text-white">
      {title}
    </h3>
    <div className="flex gap-2">
      <button
        onClick={onSave}
        className="px-3 py-1 text-xs bg-[var(--color-button-blue)] text-white rounded-sm hover:opacity-80"
      >
        simpan
      </button>
      <button
        onClick={onDelete}
        className="px-3 py-1 text-xs bg-[var(--color-button-blue)] text-white rounded-sm hover:opacity-80"
      >
        hapus
      </button>
    </div>
  </div>
);

export default CardHeader;
