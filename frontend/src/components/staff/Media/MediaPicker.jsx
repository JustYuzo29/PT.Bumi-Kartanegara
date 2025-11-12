import React, { useState, useEffect } from 'react';
import { 
  CloudArrowUpIcon, 
  PhotoIcon, 
  DocumentIcon, 
  TrashIcon,
  MagnifyingGlassIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { mediaAPI } from "../../../lib/apiSelector";

const MediaPicker = ({ 
  isOpen, 
  onClose, 
  onSelect, 
  allowMultiple = false, 
  fileTypes = ['image'], // 'image', 'document', 'video', 'audio'
  title = "Select Media"
}) => {
  const [activeTab, setActiveTab] = useState('library');
  const [mediaFiles, setMediaFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploading, setUploading] = useState(false);

  // Load media files
  useEffect(() => {
    if (isOpen && activeTab === 'library') {
      loadMediaFiles();
    }
  }, [isOpen, activeTab, fileTypes]);

  const loadMediaFiles = async () => {
    setLoading(true);
    try {
      let files = [];
      if (fileTypes.includes('image')) {
        const response = await mediaAPI.getImages();
        files = [...files, ...response.results || response];
      }
      
      // For other file types, we'd filter by type
      for (const type of fileTypes) {
        if (type !== 'image') {
          const response = await mediaAPI.getByType(type);
          files = [...files, ...response.results || response];
        }
      }
      
      setMediaFiles(files);
    } catch (err) {
      setError('Failed to load media files');
      console.error('Error loading media:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (files) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    const uploadedFiles = [];

    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', file.name.split('.')[0]);
        
        const response = await mediaAPI.upload(formData);
        uploadedFiles.push(response);
      } catch (err) {
        console.error('Upload failed for', file.name, err);
        setError(`Failed to upload ${file.name}`);
      }
    }

    if (uploadedFiles.length > 0) {
      setMediaFiles(prev => [...uploadedFiles, ...prev]);
      
      // Auto-select uploaded files
      if (allowMultiple) {
        setSelectedFiles(prev => [...prev, ...uploadedFiles]);
      } else {
        setSelectedFiles([uploadedFiles[0]]);
      }
    }

    setUploading(false);
  };

  const handleFileSelect = (file) => {
    if (allowMultiple) {
      setSelectedFiles(prev => {
        const isSelected = prev.find(f => f.id === file.id);
        if (isSelected) {
          return prev.filter(f => f.id !== file.id);
        } else {
          return [...prev, file];
        }
      });
    } else {
      setSelectedFiles([file]);
    }
  };

  const handleConfirm = () => {
    if (selectedFiles.length > 0) {
      onSelect(allowMultiple ? selectedFiles : selectedFiles[0]);
      onClose();
    }
  };

  const filteredFiles = mediaFiles.filter(file => 
    file.display_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.file_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'image':
        return <PhotoIcon className="w-5 h-5" />;
      default:
        return <DocumentIcon className="w-5 h-5" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('library')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'library'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
            }`}
          >
            Media Library
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'upload'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
            }`}
          >
            Upload Files
          </button>
        </div>

        <div className="p-4 h-96 overflow-y-auto">
          {/* Library Tab */}
          {activeTab === 'library' && (
            <div>
              {/* Search */}
              <div className="mb-4">
                <div className="relative">
                  <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search media files..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>

              {/* Media Grid */}
              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="text-gray-500">Loading media files...</div>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-4">
                  {filteredFiles.map(file => (
                    <div
                      key={file.id}
                      onClick={() => handleFileSelect(file)}
                      className={`relative cursor-pointer rounded-lg border-2 p-2 transition-colors ${
                        selectedFiles.find(f => f.id === file.id)
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 hover:border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      {file.file_type === 'image' && file.thumbnail_urls?.medium ? (
                        <img
                          src={file.thumbnail_urls.medium}
                          alt={file.alt_text || file.display_name}
                          className="w-full h-20 object-cover rounded"
                        />
                      ) : (
                        <div className="w-full h-20 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                          {getFileIcon(file.file_type)}
                        </div>
                      )}
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 truncate">
                        {file.display_name}
                      </p>
                      {selectedFiles.find(f => f.id === file.id) && (
                        <div className="absolute top-1 right-1 bg-blue-500 text-white rounded-full p-1">
                          ✓
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Upload Tab */}
          {activeTab === 'upload' && (
            <div>
              <div
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center"
                onDrop={(e) => {
                  e.preventDefault();
                  const files = Array.from(e.dataTransfer.files);
                  handleFileUpload(files);
                }}
                onDragOver={(e) => e.preventDefault()}
              >
                <CloudArrowUpIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                  Drop files here or click to upload
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Supported formats: JPG, PNG, WEBP, PDF, DOC
                </p>
                <input
                  type="file"
                  multiple={allowMultiple}
                  accept={fileTypes.includes('image') ? 'image/*' : '*/*'}
                  onChange={(e) => handleFileUpload(Array.from(e.target.files))}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
                >
                  Choose Files
                </label>
                
                {uploading && (
                  <div className="mt-4 text-blue-600">Uploading files...</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500">
            {selectedFiles.length > 0 && (
              <span>{selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''} selected</span>
            )}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={selectedFiles.length === 0}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Select {selectedFiles.length > 0 ? `(${selectedFiles.length})` : ''}
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaPicker;