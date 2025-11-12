import React, { useState, useEffect } from "react";
import { PlusIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import GalleryTitleCard from "./components/GalleryTitleCard";
import GalleryPictureCard from "./components/GalleryPictureCard";
import EnhancedGalleryPictureCard from "./components/EnhancedGalleryPictureCard";
import GalleryDescriptionCard from "./components/GalleryDescriptionCard";
import { galleryAPI } from "../../../lib/apiSelector";
import { useDebounce, migrateLocalStorageData, getCurrentCompanyId } from "../../../utils/contentUtils";

const componentMap = {
  Title: GalleryTitleCard,
  Picture: GalleryPictureCard,
  "Enhanced Picture": EnhancedGalleryPictureCard,
  Description: GalleryDescriptionCard,
};

const dropdownOptions = ["Title", "Enhanced Picture", "Description"];

const GallerySection = () => {
  const [gallery, setGallery] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);
  const [uiContents, setUiContents] = useState([]); // For Title/Description cards
  const [isExpanded, setIsExpanded] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [saveStatus, setSaveStatus] = useState('idle');

  // Create debounced save function for text edits
  const debouncedSave = useDebounce(async (itemId, data) => {
    try {
      setSaveStatus('saving');
      await galleryAPI.items.update(gallery.id, itemId, data);
      setSaveStatus('saved');
    } catch (err) {
      console.error('Debounced save failed:', err);
      setSaveStatus('error');
    }
  }, 800);

  // Migrate localStorage data to Gallery API
  const migrateGalleryData = async () => {
    const transformFn = async (localStorageContents) => {
      const uiItems = [];
      const galleryItems = [];
      
      for (const content of localStorageContents) {
        if (content.type === 'Enhanced Picture' && content.selectedMedia) {
          galleryItems.push({
            media: content.selectedMedia.id,
            name: content.selectedMedia.title || content.selectedMedia.file_name,
            title: content.selectedMedia.alt_text || '',
            ordering: galleryItems.length
          });
        } else if (content.type === 'Title' || content.type === 'Description') {
          uiItems.push(content);
        }
      }
      
      return { uiItems, galleryItems };
    };

    const saveFn = async ({ uiItems, galleryItems }) => {
      // Get or create gallery
      const currentGallery = await galleryAPI.getOrCreate(getCurrentCompanyId());
      
      // Save gallery items
      for (const itemData of galleryItems) {
        await galleryAPI.items.add(currentGallery.id, itemData);
      }
      
      // Keep UI items for local rendering
      return { gallery: currentGallery, uiItems };
    };

    try {
      const result = await migrateLocalStorageData('gallery_contents', transformFn, saveFn);
      if (result) {
        return result;
      }
    } catch (error) {
      console.warn('Migration failed:', error);
    }
    
    return null;
  };

  // Load gallery content from API
  const loadGalleryContent = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try migration first
      const migrationResult = await migrateGalleryData();
      
      let currentGallery;
      if (migrationResult) {
        currentGallery = migrationResult.gallery;
        setUiContents(migrationResult.uiItems);
      } else {
        // Get or create gallery for current company
        currentGallery = await galleryAPI.getOrCreate(getCurrentCompanyId());
        
        // Load any remaining UI content from localStorage
        const saved = localStorage.getItem("gallery_contents");
        if (saved) {
          const parsedContents = JSON.parse(saved);
          const uiItems = parsedContents.filter(content => 
            content.type === 'Title' || content.type === 'Description'
          );
          setUiContents(uiItems);
          
          // Clean up localStorage if only UI content remains
          if (uiItems.length === 0) {
            localStorage.removeItem("gallery_contents");
          }
        }
      }
      
      setGallery(currentGallery);
      
      // Load gallery items
      const items = await galleryAPI.items.list(currentGallery.id);
      setGalleryItems(items);
      
    } catch (err) {
      console.error('Failed to load gallery content:', err);
      setError('Failed to load gallery content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGalleryContent();
  }, []);

  const handleAddContent = async (type) => {
    if (type === 'Enhanced Picture') {
      // This will be handled by EnhancedGalleryPictureCard when media is selected
      const newUiContent = { 
        id: Date.now() + Math.random(), 
        type,
        awaitingMediaSelection: true 
      };
      setUiContents([...uiContents, newUiContent]);
    } else {
      // Add UI content (Title/Description)
      const newContent = { id: Date.now() + Math.random(), type };
      setUiContents([...uiContents, newContent]);
    }
    setShowDropdown(false);
  };

  const handleRemoveContent = async (id) => {
    // Check if it's a gallery item or UI content
    const galleryItem = galleryItems.find(item => item.id === id);
    if (galleryItem) {
      try {
        setSaving(true);
        await galleryAPI.items.remove(gallery.id, id);
        setGalleryItems(galleryItems.filter(item => item.id !== id));
      } catch (err) {
        console.error('Failed to delete gallery item:', err);
        setError('Failed to delete gallery item.');
      } finally {
        setSaving(false);
      }
    } else {
      // Remove UI content
      setUiContents(uiContents.filter(content => content.id !== id));
    }
  };

  // Handle media selection from EnhancedGalleryPictureCard
  const handleMediaSelected = async (uiContentId, selectedMedia) => {
    try {
      setSaving(true);
      
      // Create gallery item
      const newItem = await galleryAPI.items.add(gallery.id, {
        media: selectedMedia.id,
        name: selectedMedia.title || selectedMedia.file_name,
        title: selectedMedia.alt_text || '',
        ordering: galleryItems.length
      });
      
      setGalleryItems([...galleryItems, newItem]);
      
      // Remove the UI content placeholder
      setUiContents(uiContents.filter(content => content.id !== uiContentId));
      
    } catch (err) {
      console.error('Failed to add gallery item:', err);
      setError('Failed to add gallery item.');
    } finally {
      setSaving(false);
    }
  };

  // Handle item updates (title/name changes)
  const handleItemDataChange = async (itemId, data) => {
    // Update local state immediately
    setGalleryItems(galleryItems.map(item => 
      item.id === itemId ? { ...item, ...data } : item
    ));
    
    // Debounced save to API
    debouncedSave(itemId, data);
  };

  return (
    <section className="mb-10">
      <div className="flex items-center gap-2 pl-3 mb-4">
        <h2 className="text-lg font-bold text-[var(--color-button-blue)] dark:text-white tracking-wide">
          GALLERY
        </h2>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            title="Tambah Konten"
            className="text-[var(--color-button-blue)] dark:text-white hover:text-[var(--color-accent)]"
          >
            <PlusIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            title="Sembunyikan / Tampilkan"
            className="text-[var(--color-button-blue)] dark:text-white hover:text-[var(--color-accent)]"
          >
            {isExpanded ? (
              <ChevronUpIcon className="w-5 h-5" />
            ) : (
              <ChevronDownIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {showDropdown && (
        <div className="mb-4 bg-white dark:bg-[var(--color-sidebar)] border border-gray-200 dark:border-gray-700 rounded-lg p-3 w-fit shadow-md">
          {dropdownOptions.map((option) => (
            <button
              key={option}
              onClick={() => handleAddContent(option)}
              className="block w-full text-left text-sm text-[var(--color-sidebar)] dark:text-white hover:text-[var(--color-accent)] py-1 px-3"
            >
              + {option}
            </button>
          ))}
        </div>
      )}

      {isExpanded && (
        <>
          {/* Error state */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-4">
              <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 text-red-600 dark:text-red-400 underline text-sm"
              >
                Reload page
              </button>
            </div>
          )}

          {/* Save status indicator */}
          {saveStatus === 'saving' && (
            <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-3 text-center mb-4">
              <p className="text-blue-800 dark:text-blue-200 text-sm">Saving changes...</p>
            </div>
          )}
          {saveStatus === 'saved' && (
            <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-3 text-center mb-4">
              <p className="text-green-800 dark:text-green-200 text-sm">Saved ✓</p>
            </div>
          )}
          {saveStatus === 'error' && (
            <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-3 text-center mb-4">
              <p className="text-red-800 dark:text-red-200 text-sm">Save failed ✗</p>
            </div>
          )}

          {/* Saving indicator */}
          {saving && (
            <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-3 text-center mb-4">
              <p className="text-blue-800 dark:text-blue-200 text-sm">Saving changes...</p>
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 text-center mb-4">
              <p className="text-yellow-800 dark:text-yellow-200">Loading gallery content...</p>
            </div>
          )}

          {galleryItems.length === 0 && uiContents.length === 0 && !loading ? (
            <div className="bg-white dark:bg-[var(--color-card-secondary)] border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-sm text-center text-gray-500 dark:text-black">
              Belum ada konten Gallery. Klik tombol ➕ di atas.
            </div>
          ) : (
            <div className="space-y-4">
              {/* Render UI content (Title/Description cards) */}
              {uiContents.map((content) => {
                const Component = componentMap[content.type];
                if (!Component) return null;
                
                if (content.type === 'Enhanced Picture' && content.awaitingMediaSelection) {
                  return (
                    <EnhancedGalleryPictureCard
                      key={content.id}
                      id={content.id}
                      onRemove={handleRemoveContent}
                      onMediaSelected={(selectedMedia) => handleMediaSelected(content.id, selectedMedia)}
                    />
                  );
                }
                
                return (
                  <Component
                    key={content.id}
                    id={content.id}
                    onRemove={handleRemoveContent}
                  />
                );
              })}
              
              {/* Render Gallery items with media */}
              {galleryItems.map((item) => (
                <EnhancedGalleryPictureCard
                  key={item.id}
                  id={item.id}
                  onRemove={handleRemoveContent}
                  initialMedia={item.media_info}
                  initialTitle={item.title}
                  initialName={item.name}
                  onDataChange={(data) => handleItemDataChange(item.id, data)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default GallerySection;
