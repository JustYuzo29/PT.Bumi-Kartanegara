import React, { useState, useEffect } from "react";
import {
  PlusIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";

import BannerCard from "./components/BannerCard";
import TextInputCard from "./components/TextInputCard";
import ButtonLinkCard from "./components/ButtonLinkCard";
import { homeContentAPI } from "../../../lib/apiSelector";

const componentMap = {
  "Upload Banner": BannerCard,
  "Title": TextInputCard,
  "Text": TextInputCard,
  "Button Link": ButtonLinkCard,
};

const dropdownOptions = ["Upload Banner", "Title", "Text", "Button Link"];

const BannerSection = () => {
  // --- State from localStorage and API
  const [contents, setContents] = useState(() => {
    const saved = localStorage.getItem("banner_contents");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedFiles, setSelectedFiles] = useState({});
  const [isExpanded, setIsExpanded] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load content from API on component mount
  useEffect(() => {
    const loadBannerContent = async () => {
      try {
        setLoading(true);
        const data = await homeContentAPI.getAll();
        if (data.results && data.results.length > 0) {
          // Convert API data to component format
          const apiContent = data.results.map((item, index) => ({
            id: item.id,
            type: "Banner",
            title: item.title,
            description: item.description,
            image_path: item.image_path,
          }));
          setContents(apiContent);
        }
      } catch (err) {
        console.error('Failed to load banner content:', err);
        setError('Failed to load content from server');
      } finally {
        setLoading(false);
      }
    };

    loadBannerContent();
  }, []);

  // Save to localStorage when contents change
  useEffect(() => {
    localStorage.setItem("banner_contents", JSON.stringify(contents));
  }, [contents]);

  // Save content to API
  const saveContentToAPI = async (contentData) => {
    try {
      await homeContentAPI.create(contentData);
    } catch (err) {
      console.error('Failed to save content:', err);
      setError('Failed to save content to server');
    }
  };

  const handleAddContent = (type) => {
    const id = Date.now() + Math.random();
    setContents((prev) => [...prev, { id, type }]);
    setShowDropdown(false);
  };

  const handleRemoveContent = (id) => {
    setContents((prev) => prev.filter((c) => c.id !== id));
    setSelectedFiles((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const handleFileChange = (event, id) => {
    if (!event) {
      setSelectedFiles((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
      return;
    }

    const file = event.target.files?.[0];
    if (file) {
      setSelectedFiles((prev) => ({
        ...prev,
        [id]: file,
      }));
    }
  };

  return (
    <section className="mb-10">
      {/* HEADER SECTION */}
      <div className="flex items-center gap-2 pl-3 mb-4">
        <h2 className="text-lg font-bold text-[var(--color-button-blue)] dark:text-white tracking-wide">
          BANNER CONTENT
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

      {/* DROPDOWN ADD */}
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

      {/* CARD CONTENT */}
      {isExpanded && (
        <>
          {contents.length === 0 ? (
            <div className="bg-white dark:bg-[var(--color-card-secondary)] border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-sm text-center text-gray-500 dark:text-black">
              Belum ada layanan ditambahkan.
            </div>
          ) : (
            <div className="space-y-4">
              {contents.map((content) => {
                const Component = componentMap[content.type];
                if (!Component) return null;

                const commonProps = {
                  key: content.id,
                  id: content.id,
                  onRemove: handleRemoveContent,
                };

                const specificProps = {
                  "Upload Banner": {
                    selectedFile: selectedFiles[content.id],
                    onFileChange: handleFileChange,
                  },
                  "Title": { type: "Title" },
                  "Text": { type: "Text" },
                  "Button Link": {},
                };

                return <Component {...commonProps} {...specificProps[content.type]} />;
              })}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default BannerSection;
