import React, { useState, useEffect } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import MediaButton from "../MediaButton";

const EnhancedGalleryPictureCard = ({ 
  id, 
  onRemove, 
  onMediaSelected,
  initialMedia = null,
  initialTitle = '',
  initialName = '',
  onDataChange 
}) => {
  const [selectedMedia, setSelectedMedia] = useState(initialMedia);
  const [title, setTitle] = useState(initialTitle);
  const [name, setName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(!initialMedia); // Start editing if no initial media
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialMedia) {
      setSelectedMedia(initialMedia);
      setTitle(initialTitle);
      setName(initialName);
      setIsEditing(false);
    }
  }, [initialMedia, initialTitle, initialName]);

  const handleMediaSelect = (media) => {
    setSelectedMedia(media);
    if (!name && !title) {
      setName(media.title || media.file_name || '');
      setTitle(media.alt_text || media.title || media.file_name || '');
    }
    
    // If this is a new item (no initialMedia), call onMediaSelected
    if (!initialMedia && onMediaSelected) {
      onMediaSelected(media);
    }
  };

  const handleMediaRemove = () => {
    setSelectedMedia(null);
    setName('');
    setTitle('');
  };

  const handleSave = () => {
    if (!selectedMedia) {
      setError("Pilih gambar terlebih dahulu.");
      return;
    }
    
    if (!name.trim()) {
      setError("Nama tidak boleh kosong.");
      return;
    }

    // Save changes if this is an existing item
    if (initialMedia && onDataChange) {
      onDataChange({
        title: title.trim(),
        name: name.trim()
      });
    }

    setIsEditing(false);
    setError("");
  };

  const handleCancel = () => {
    if (initialMedia) {
      // Reset to initial values
      setSelectedMedia(initialMedia);
      setTitle(initialTitle);
      setName(initialName);
      setIsEditing(false);
    } else {
      // If no initial media, remove this component
      onRemove(id);
    }
    setError("");
  };

  const handleEdit = () => {
    setIsEditing(true);
    setError("");
  };

  return (
    <div className="relative mb-4">
      <div className="absolute left-0 top-0 h-full w-2 rounded-l-lg bg-[var(--color-accent)] dark:bg-[var(--color-button-blue)]"></div>
      <button
        onClick={() => onRemove(id)}
        className="absolute top-3 right-3 p-1 text-gray-400 z-10"
        title="Hapus Kartu Picture"
        type="button"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>

      <div className="ml-2 bg-white dark:bg-[var(--color-card-bg)] rounded-lg shadow-elevated px-6 pt-5 pb-6">
        <h3 className="text-lg font-bold mb-1 text-[var(--color-button-blue)]">Gallery Picture</h3>
        <p className="text-[13px] mb-4 text-[var(--color-button-blue)]">
          {isEditing ? "Pilih gambar dan isi detail untuk galeri." : "Detail gambar galeri."}
        </p>
        
        {error && (
          <p className="text-red-600 dark:text-red-400 mb-4 text-sm font-semibold">{error}</p>
        )}

        <div className="space-y-4">
          {/* Media Selection */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-button-blue)] mb-2">
              Gambar
            </label>
            {isEditing ? (
              <MediaButton
                selectedMedia={selectedMedia}
                onMediaSelect={handleMediaSelect}
                onMediaRemove={handleMediaRemove}
                fileTypes={['image']}
                buttonText="Pilih Gambar"
                showPreview={true}
                className="w-full"
              />
            ) : (
              selectedMedia ? (
                <div className="flex items-center space-x-3">
                  <img 
                    src={selectedMedia.thumbnail_url || selectedMedia.file_url} 
                    alt={selectedMedia.alt_text || name} 
                    className="w-16 h-16 rounded object-cover border" 
                  />
                  <div>
                    <p className="text-sm font-medium">{selectedMedia.title || selectedMedia.file_name}</p>
                    <p className="text-xs text-gray-500">{selectedMedia.file_name}</p>
                  </div>
                </div>
              ) : (
                <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-xs text-gray-500">No Image</span>
                </div>
              )
            )}
          </div>

          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-button-blue)] mb-2">
              Nama
            </label>
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded text-sm"
                placeholder="Nama gambar"
              />
            ) : (
              <p className="text-sm text-[var(--color-button-blue)]">{name || 'Tidak ada nama'}</p>
            )}
          </div>

          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-button-blue)] mb-2">
              Title
            </label>
            {isEditing ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded text-sm"
                placeholder="Title gambar"
              />
            ) : (
              <p className="text-sm text-[var(--color-button-blue)]">{title || 'Tidak ada title'}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                  title="Simpan"
                >
                  <CheckIcon className="w-4 h-4" />
                  Simpan
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
                  title="Batal"
                >
                  <XMarkIcon className="w-4 h-4" />
                  Batal
                </button>
              </>
            ) : (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-3 py-2 bg-[var(--color-button-blue)] text-white rounded text-sm hover:bg-blue-700"
                title="Edit"
              >
                <PencilSquareIcon className="w-4 h-4" />
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedGalleryPictureCard;