import React, { useState } from 'react';
import { PhotoIcon, DocumentIcon, TrashIcon } from '@heroicons/react/24/outline';
import MediaPicker from './MediaPicker';

const MediaButton = ({ 
  selectedMedia, 
  onMediaSelect, 
  onMediaRemove,
  fileTypes = ['image'],
  allowMultiple = false,
  className = '',
  buttonText = 'Select Media',
  showPreview = true
}) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const handleMediaSelect = (media) => {
    onMediaSelect(media);
    setIsPickerOpen(false);
  };

  const getPreviewComponent = () => {
    if (!selectedMedia || !showPreview) return null;

    const media = Array.isArray(selectedMedia) ? selectedMedia[0] : selectedMedia;
    
    if (media.file_type === 'image' && media.thumbnail_urls?.small) {
      return (
        <div className="relative inline-block">
          <img
            src={media.thumbnail_urls.small}
            alt={media.alt_text || media.display_name}
            className="w-16 h-16 object-cover rounded border"
          />
          {onMediaRemove && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMediaRemove();
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              title="Remove media"
            >
              <TrashIcon className="w-3 h-3" />
            </button>
          )}
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-2 p-2 border rounded bg-gray-50 dark:bg-gray-700">
        <DocumentIcon className="w-5 h-5 text-gray-400" />
        <span className="text-sm text-gray-600 dark:text-gray-300 truncate max-w-32">
          {media.display_name}
        </span>
        {onMediaRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMediaRemove();
            }}
            className="text-red-500 hover:text-red-600"
            title="Remove media"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <button
        onClick={() => setIsPickerOpen(true)}
        className="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
      >
        <PhotoIcon className="w-4 h-4 mr-1" />
        {selectedMedia ? 'Change' : buttonText}
      </button>
      
      {getPreviewComponent()}
      
      {Array.isArray(selectedMedia) && selectedMedia.length > 1 && (
        <span className="text-sm text-gray-500">
          +{selectedMedia.length - 1} more
        </span>
      )}

      <MediaPicker
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        onSelect={handleMediaSelect}
        allowMultiple={allowMultiple}
        fileTypes={fileTypes}
        title={`Select ${fileTypes.includes('image') ? 'Image' : 'File'}`}
      />
    </div>
  );
};

export default MediaButton;