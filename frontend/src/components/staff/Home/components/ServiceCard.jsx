import React from 'react';

const ServiceCard = ({ number, onRemove, selectedFiles, onFileChange }) => {
  return (
    <div className="bg-white dark:bg-[var(--color-sidebar)] border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <h3 className="text-black dark:text-white font-semibold mb-4">Card {number}</h3>
      
      <div className="space-y-4">
        {/* Picture */}
        <div>
          <h4 className="text-black dark:text-white text-sm mb-2">Picture</h4>
          <div className="space-y-2">
            <div className="flex gap-2 items-center">
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id={`picture1-${number}`}
                  onChange={(e) => onFileChange(e, `picture1-${number}`)}
                />
                <input
                  type="text"
                  className="w-full bg-gray-50 dark:bg-[var(--color-bg-light)] border border-gray-200 dark:border-gray-600 text-black dark:text-white rounded px-3 py-2 text-sm"
                  placeholder="No file chosen"
                  value={selectedFiles[`picture1-${number}`]?.name || ""}
                  readOnly
                />
              </div>
              <div className="flex gap-1">
                <label
                  htmlFor={`picture1-${number}`}
                  className="text-xs px-3 py-1.5 bg-green-500 text-white rounded hover:opacity-80 cursor-pointer"
                >
                  ✓
                </label>
                <button className="text-xs px-3 py-1.5 bg-red-500 text-white rounded hover:opacity-80">
                  ✕
                </button>
              </div>
            </div>
            
            <div className="flex gap-2 items-center">
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id={`picture2-${number}`}
                  onChange={(e) => onFileChange(e, `picture2-${number}`)}
                />
                <input
                  type="text"
                  className="w-full bg-gray-50 dark:bg-[var(--color-bg-light)] border border-gray-200 dark:border-gray-600 text-black dark:text-white rounded px-3 py-2 text-sm"
                  placeholder="No file chosen"
                  value={selectedFiles[`picture2-${number}`]?.name || ""}
                  readOnly
                />
              </div>
              <div className="flex gap-1">
                <label
                  htmlFor={`picture2-${number}`}
                  className="text-xs px-3 py-1.5 bg-green-500 text-white rounded hover:opacity-80 cursor-pointer"
                >
                  ✓
                </label>
                <button className="text-xs px-3 py-1.5 bg-red-500 text-white rounded hover:opacity-80">
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Text */}
        <div>
          <h4 className="text-black dark:text-white text-sm mb-2">Text</h4>
          <div className="space-y-2">
            <textarea
              className="w-full bg-gray-50 dark:bg-[var(--color-bg-light)] border border-gray-200 dark:border-gray-600 text-black dark:text-white rounded px-3 py-2 text-sm"
              rows="2"
              placeholder="Text 1"
            />
            <textarea
              className="w-full bg-gray-50 dark:bg-[var(--color-bg-light)] border border-gray-200 dark:border-gray-600 text-black dark:text-white rounded px-3 py-2 text-sm"
              rows="2"
              placeholder="Text 2"
            />
          </div>
        </div>

        {/* Position */}
        <div>
          <h4 className="text-black dark:text-white text-sm mb-2">Position</h4>
          <input
            type="text"
            className="w-full bg-gray-50 dark:bg-[var(--color-bg-light)] border border-gray-200 dark:border-gray-600 text-black dark:text-white rounded px-3 py-2 text-sm"
            placeholder="Enter position"
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button className="text-xs px-4 py-1.5 bg-[var(--color-button-blue)] text-white rounded hover:opacity-80">
            Simpan
          </button>
          <button 
            onClick={onRemove}
            className="text-xs px-4 py-1.5 bg-[var(--color-button-blue)] text-white rounded hover:opacity-80">
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
