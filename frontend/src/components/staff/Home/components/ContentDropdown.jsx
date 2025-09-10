import React from 'react';

const ContentDropdown = ({ show, options, onSelect, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0" onClick={onClose}>
      <div 
        className="absolute left-0 top-8 bg-white shadow-lg border border-gray-200 rounded w-60"
        onClick={e => e.stopPropagation()}
      >
        {options.map((option) => (
          <div 
            key={option} 
            className="hover:bg-gray-50 border-b border-gray-200 last:border-b-0"
          >
            <div className="flex items-center justify-between p-3">
              <span className="text-sm text-gray-700">{option}</span>
              <button
                onClick={() => onSelect(option)}
                className="px-3 py-1 text-xs bg-[var--color-button-blue)] text-white rounded-sm hover:opacity-80"
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentDropdown;
