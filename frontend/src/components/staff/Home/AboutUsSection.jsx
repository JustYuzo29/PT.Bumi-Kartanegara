import React, { useState, useEffect } from "react";
import { PlusIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import AboutUsTitleCard from "./components/AboutUsTitleCard";
import AboutUsPictureCard from "./components/AboutUsPictureCard";
import AboutUsDescriptionCard from "./components/AboutUsDescriptionCard";
import { aboutUsAPI } from "../../../services/api";

const componentMap = {
  "Title": AboutUsTitleCard,
  "Picture": AboutUsPictureCard,
  "Description": AboutUsDescriptionCard,
};
const dropdownOptions = ["Title", "Picture", "Description"];

const dummyPictureRows = [
  { id: 1, content: "content 1", title: "gambar 1", file: "picture1.jpg" },
  { id: 2, content: "content 2", title: "gambar 2", file: "picture2.jpg" },
];

const AboutUsSection = () => {
  const [contents, setContents] = useState(() => {
    const saved = localStorage.getItem("aboutus_contents");
    return saved ? JSON.parse(saved) : [];
  });
  const [isExpanded, setIsExpanded] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [aboutUsData, setAboutUsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load about us data from API
  useEffect(() => {
    const loadAboutUsData = async () => {
      try {
        setLoading(true);
        const data = await aboutUsAPI.getAll();
        if (data.results && data.results.length > 0) {
          setAboutUsData(data.results[0]);
          // Show the data in content if it exists
          if (contents.length === 0) {
            const apiContent = [];
            if (data.results[0].description) {
              apiContent.push({
                id: 'api_description',
                type: 'Description',
                content: data.results[0].description
              });
            }
            if (data.results[0].vision || data.results[0].mission) {
              apiContent.push({
                id: 'api_vision_mission',
                type: 'Title',
                title: 'Vision & Mission',
                vision: data.results[0].vision,
                mission: data.results[0].mission
              });
            }
            if (apiContent.length > 0) {
              setContents(apiContent);
            }
          }
        }
      } catch (err) {
        console.error('Failed to load about us data:', err);
        setError('Failed to load about us data');
      } finally {
        setLoading(false);
      }
    };

    loadAboutUsData();
  }, []);

  useEffect(() => {
    localStorage.setItem("aboutus_contents", JSON.stringify(contents));
  }, [contents]);

  // Tambah card baru
  const handleAddContent = (type) => {
    const id = Date.now() + Math.random();
    let initialData = {};
    if (type === "Picture") {
      initialData = { rows: dummyPictureRows };
    }
    setContents(prev => [...prev, { id, type, ...initialData }]);
    setShowDropdown(false);
  };

  // Hapus card
  const handleRemoveContent = (id) => {
    setContents(prev => prev.filter(c => c.id !== id));
  };

  // Untuk PictureCard, edit row handler
  const handleChangePictureRows = (id, rows) => {
    setContents(prev =>
      prev.map(card =>
        card.id === id ? { ...card, rows } : card
      )
    );
  };

  return (
    <section className="mb-10">
      <div className="flex items-center gap-2 pl-3 mb-4">
        <h2 className="text-lg font-bold text-[var(--color-button-blue)] dark:text-white tracking-wide">
          ABOUT US
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
            {isExpanded ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
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
          {/* Display API data if available */}
          {aboutUsData && (
            <div className="mb-4 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">
                Data from Backend API:
              </h3>
              {aboutUsData.description && (
                <div className="mb-2">
                  <strong className="text-blue-700 dark:text-blue-300">Description:</strong>
                  <p className="text-blue-600 dark:text-blue-400 text-sm">{aboutUsData.description}</p>
                </div>
              )}
              {aboutUsData.vision && (
                <div className="mb-2">
                  <strong className="text-blue-700 dark:text-blue-300">Vision:</strong>
                  <p className="text-blue-600 dark:text-blue-400 text-sm">{aboutUsData.vision}</p>
                </div>
              )}
              {aboutUsData.mission && (
                <div className="mb-2">
                  <strong className="text-blue-700 dark:text-blue-300">Mission:</strong>
                  <p className="text-blue-600 dark:text-blue-400 text-sm">{aboutUsData.mission}</p>
                </div>
              )}
            </div>
          )}
          
          {loading && (
            <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 text-center">
              <p className="text-yellow-800 dark:text-yellow-200">Loading data from backend...</p>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4 text-center">
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          {contents.length === 0 && !loading && !aboutUsData ? (
            <div className="bg-white dark:bg-[var(--color-card-secondary)] border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-sm text-center text-gray-500 dark:text-black">
              Belum ada layanan ditambahkan.
            </div>
          ) : (
            <div className="space-y-4">
              {contents.map((content) => {
                const Component = componentMap[content.type];
                if (!Component) return null;
                if (content.type === "Picture") {
                  return (
                    <Component
                      key={content.id}
                      id={content.id}
                      rows={content.rows || []}
                      onChangeRows={(rows) => handleChangePictureRows(content.id, rows)}
                      onRemove={handleRemoveContent}
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
            </div>
          )}
        </>
      )}
    </section>
  );
};
export default AboutUsSection;
