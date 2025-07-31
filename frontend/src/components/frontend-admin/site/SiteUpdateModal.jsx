// components/site/EditModal.jsx
import React from "react";

const EditModal = ({ isOpen, editedText, onChange, onClose, onSave }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-[var(--color-ocean)] p-6 rounded-lg shadow-xl w-11/12 md:w-1/2 lg:w-1/3">
        <h3 className="text-xl font-semibold mb-4 text-[var(--color-navy)] dark:text-white">Edit Pembaruan</h3>
        <input
          type="text"
          value={editedText}
          onChange={onChange}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm dark:bg-gray-700 dark:text-white"
        />
        <div className="flex justify-end space-x-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-md hover:bg-gray-400 dark:hover:bg-gray-700 transition"
          >
            Batal
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
