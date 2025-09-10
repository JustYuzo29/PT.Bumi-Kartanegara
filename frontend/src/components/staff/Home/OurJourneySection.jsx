import React, { useState, useEffect } from "react";
import { PlusIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import JourneyTitleCard from "./components/JourneyTitleCard";
import JourneyCard from "./components/JourneyCard";
import JourneyDescriptionCard from "./components/JourneyDescriptionCard";
import JourneyButtonLinkCard from "./components/JourneyButtonLinkCard";

const componentMap = {
  "Title": JourneyTitleCard,
  "Card": JourneyCard,
  "Description": JourneyDescriptionCard,
  "Button Link": JourneyButtonLinkCard,
};
const dropdownOptions = ["Title", "Card", "Description", "Button Link"];

const OurJourneySection = () => {
  const [contents, setContents] = useState(() => {
    const saved = localStorage.getItem("ourjourney_contents");
    return saved ? JSON.parse(saved) : [];
  });
  const [isExpanded, setIsExpanded] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    localStorage.setItem("ourjourney_contents", JSON.stringify(contents));
  }, [contents]);

  // Tambah card baru
  const handleAddContent = (type) => {
    const id = Date.now() + Math.random();
    setContents(prev => [...prev, { id, type }]);
    setShowDropdown(false);
  };

  // Hapus card
  const handleRemoveContent = (id) => {
    setContents(prev => prev.filter(c => c.id !== id));
  };

  return (
    <section className="mb-10">
      <div className="flex items-center gap-2 pl-3 mb-4">
        <h2 className="text-lg font-bold text-[var(--color-button-blue)] dark:text-white tracking-wide">
          OUR JOURNEY
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
          {contents.length === 0 ? (
            <div className="bg-white dark:bg-[var(--color-card-secondary)] border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-sm text-center text-gray-500 dark:text-black">
              Belum ada layanan ditambahkan.
            </div>
          ) : (
            <div className="space-y-4">
              {contents.map((content) => {
                const Component = componentMap[content.type];
                if (!Component) return null;
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
export default OurJourneySection;
