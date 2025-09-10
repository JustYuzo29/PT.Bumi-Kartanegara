import React, { useState, useEffect } from "react";
import { PlusIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import ContactTitleCard from "./components/ContactBannerTitleCard";
import ContactCard from "./components/ContactCard";
import ContactDescriptionCard from "./components/ContactDescriptionCard";

// FIX: Changed 'description' key to 'Description' to match the dropdown option.
const componentMap = {
  Title: ContactTitleCard,
  Card: ContactCard,
  Description: ContactDescriptionCard,
};

const dropdownOptions = ["Title", "Card", "Description"];

const ContactSection = () => {
  const [contents, setContents] = useState(() => {
    const saved = localStorage.getItem("contact_section_contents");
    return saved ? JSON.parse(saved) : [];
  });
  const [isExpanded, setIsExpanded] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    localStorage.setItem("contact_section_contents", JSON.stringify(contents));
  }, [contents]);

  const handleAddContent = (type) => {
    setContents((prev) => [...prev, { id: Date.now() + Math.random(), type }]);
    setShowDropdown(false);
  };

  const handleRemoveContent = (id) => {
    setContents((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <section className="mb-10">
      <div className="flex items-center gap-2 pl-3 mb-4">
        <h2 className="text-lg font-bold text-[var(--color-button-blue)] dark:text-white tracking-wide">
          CONTACT
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
              Belum ada konten Contact. Klik tombol ➕ di atas.
            </div>
          ) : (
            <div className="space-y-4">
              {contents.map((content, idx) => {
                const Component = componentMap[content.type];
                if (!Component) return null;
                
                // This logic numbers titles based on their overall position in the array.
                // If you want to number them sequentially (e.g., Title 1, Title 2)
                // regardless of other components, a different approach is needed.
                const titleNumber = content.type === "Title" 
                  ? contents.filter(c => c.type === 'Title').findIndex(c => c.id === content.id) + 1
                  : undefined;

                return (
                  <Component
                    key={content.id}
                    id={content.id}
                    onRemove={handleRemoveContent}
                    titleIdx={titleNumber}
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

export default ContactSection;