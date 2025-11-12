import React, { useState, useEffect } from "react";
import {
  PlusIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";

import ServiceTitleCard from "./components/ServiceTitleCard";
// Ganti nama import agar lebih jelas dan sesuai dengan fungsinya (menampilkan tabel)
import ServiceTableCard from "./components/ServiceContentCard"; 
import { serviceAPI, contentAPI } from "../../../lib/apiSelector"; 

const componentMap = {
  "Title": ServiceTitleCard,
  "Table": ServiceTableCard, // Gunakan nama yang lebih deskriptif
};

const dropdownOptions = ["Title", "Table"];

const ServiceSection = () => {
  const [contents, setContents] = useState([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Load services and content from API
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Load both services data and content configuration
        const [servicesResponse, contentResponse] = await Promise.all([
          serviceAPI.getAll().catch(() => ({ results: [] })),
          contentAPI.services.get().catch(() => ({ contents: [] }))
        ]);
        
        if (servicesResponse.results) {
          setServicesData(servicesResponse.results);
        }
        
        // Load content configuration from API, fallback to localStorage for migration
        if (contentResponse.contents && contentResponse.contents.length > 0) {
          setContents(contentResponse.contents);
        } else {
          // Migration: try to load from localStorage and save to API
          const saved = localStorage.getItem("service_contents");
          if (saved) {
            const parsedContents = JSON.parse(saved);
            setContents(parsedContents);
            // Save to API for migration
            if (parsedContents.length > 0) {
              try {
                await contentAPI.services.save({ contents: parsedContents });
                localStorage.removeItem("service_contents"); // Clean up after migration
              } catch (err) {
                console.warn('Failed to migrate localStorage to API:', err);
              }
            }
          }
        }
      } catch (err) {
        console.error('Failed to load services data:', err);
        setError('Failed to load services data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Save content to API instead of localStorage
  const saveContentToAPI = async (newContents) => {
    if (saving) return; // Prevent multiple simultaneous saves
    
    try {
      setSaving(true);
      await contentAPI.services.save({ contents: newContents });
    } catch (err) {
      console.error('Failed to save content to API:', err);
      setError('Failed to save changes. Please try again.');
      // Still update local state for better UX
    } finally {
      setSaving(false);
    }
  };

  const handleAddContent = async (type) => {
    const id = Date.now() + Math.random();
    let newContent = { id, type };

    if (type === "Table") {
      const tableCount = contents.filter(c => c.type === "Table").length;
      newContent.title = `Content ${tableCount + 1}`;
      newContent.description = "Masukkan data layanan pada tabel di bawah.";
      newContent.rows = []; // Mulai dengan baris kosong
    }
    
    const newContents = [...contents, newContent];
    setContents(newContents);
    setShowDropdown(false);
    
    // Save to API
    await saveContentToAPI(newContents);
  };

  const handleRemoveContent = async (id) => {
    const newContents = contents.filter((c) => c.id !== id);
    setContents(newContents);
    
    // Save to API
    await saveContentToAPI(newContents);
  };

  const handleContentChange = async (contentId, updatedRows) => {
    const newContents = contents.map(card =>
      card.id === contentId ? { ...card, rows: updatedRows } : card
    );
    setContents(newContents);
    
    // Save to API
    await saveContentToAPI(newContents);
  };

  return (
    <section className="mb-10">
      <div className="flex items-center gap-2 pl-3 mb-4">
        <h2 className="text-lg font-bold text-[var(--color-button-blue)] dark:text-white tracking-wide">SERVICE</h2>
        <div className="flex items-center gap-1">
          <button onClick={() => setShowDropdown(!showDropdown)} title="Tambah Konten" className="text-[var(--color-button-blue)] dark:text-white"><PlusIcon className="w-5 h-5" /></button>
          <button onClick={() => setIsExpanded(!isExpanded)} title="Sembunyikan / Tampilkan" className="text-[var(--color-button-blue)] dark:text-white">
            {isExpanded ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {showDropdown && (
        <div className="mb-4 bg-white dark:bg-[var(--color-sidebar)] border border-gray-200 dark:border-gray-700 rounded-lg p-3 w-fit shadow-md">
          {dropdownOptions.map((option) => (
            <button key={option} onClick={() => handleAddContent(option)} className="block w-full text-left text-sm text-[var(--color-sidebar)] dark:text-white py-1 px-3">
              + {option}
            </button>
          ))}
        </div>
      )}

      {isExpanded && (
        <div className="space-y-4">
          {/* Error state */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4">
              <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 text-red-600 dark:text-red-400 underline text-sm"
              >
                Reload page
              </button>
            </div>
          )}

          {/* Saving indicator */}
          {saving && (
            <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-3 text-center">
              <p className="text-blue-800 dark:text-blue-200 text-sm">Saving changes...</p>
            </div>
          )}

          {/* Display API data if available */}
          {servicesData.length > 0 && (
            <div className="mb-4 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-green-800 dark:text-green-200 mb-3">
                Services from Backend API:
              </h3>
              <div className="space-y-2">
                {servicesData.map((service) => (
                  <div key={service.id} className="border-l-4 border-green-400 pl-3">
                    <h4 className="font-medium text-green-700 dark:text-green-300">{service.title}</h4>
                    {service.description && (
                      <p className="text-green-600 dark:text-green-400 text-sm">{service.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {loading && (
            <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 text-center">
              <p className="text-yellow-800 dark:text-yellow-200">Loading services from backend...</p>
            </div>
          )}

          {contents.length > 0 ? (
            contents.map((content) => {
              const Component = componentMap[content.type];
              if (!Component) return null;

              return (
                <Component
                  key={content.id}
                  id={content.id}
                  onRemove={handleRemoveContent}
                  // ✨ BAGIAN PENTING: Pastikan semua props ini diteruskan!
                  title={content.title}
                  description={content.description}
                  rows={content.rows}
                  onChangeRows={(updatedRows) => handleContentChange(content.id, updatedRows)}
                />
              );
            })
          ) : servicesData.length === 0 && !loading ? (
            <div className="bg-white dark:bg-[var(--color-card-secondary)] border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-sm text-center text-gray-500">
              Belum ada layanan ditambahkan. Klik ikon '+' untuk memulai.
            </div>
          ) : null}
        </div>
      )}
    </section>
  );
};

export default ServiceSection;