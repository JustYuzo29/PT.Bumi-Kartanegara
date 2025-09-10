import React from 'react';
import CardHeader from './CardHeader';

const BannerUploadCard = ({ id, onSave, onDelete }) => (
  <div className="bg-white shadow-sm border border-gray-200 dark:border-gray-700 rounded">
    <div className="p-4">
      <CardHeader 
        title="Banner" 
        onSave={onSave}
        onDelete={() => onDelete(id)}
      />
      <div className="space-y-3">
        <input
          type="text"
          className="w-full bg-gray-50 border border-gray-200 text-gray-700 rounded-sm px-3 py-2 text-sm"
          placeholder="No file chosen"
          readOnly
        />
        <button 
          className="w-full text-xs bg-[var(--color-button-blue)] text-white py-1.5 rounded-sm hover:opacity-80"
        >
          Choose File
        </button>
      </div>
    </div>
  </div>
);

export default BannerUploadCard;
