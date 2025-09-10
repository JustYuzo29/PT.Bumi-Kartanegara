import React, { useState } from "react";
import { PlusIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import MapCard from "./components/MapCard";

const SectionMap = () => {
  const [maps, setMaps] = useState([{ id: Date.now() + Math.random() }]);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleAddCard = () => {
    setMaps(prev => [...prev, { id: Date.now() + Math.random() }]);
  };
  const handleRemoveCard = (id) => {
    setMaps(prev => prev.filter(card => card.id !== id));
  };

  return (
    <section className="mb-10">
      <div className="flex items-center gap-2 pl-3 mb-4">
        <h2 className="text-2xl font-bold text-[var(--color-button-blue)] dark:text-white tracking-wide uppercase">MAP</h2>
        <button
          onClick={handleAddCard}
          title="Tambah Map"
          className="text-[var(--color-button-blue)] dark:text-white hover:text-[var(--color-accent)]"
        >
          <PlusIcon className="w-6 h-6" />
        </button>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          title="Sembunyikan / Tampilkan"
          className="text-[var(--color-button-blue)] dark:text-white hover:text-[var(--color-accent)]"
        >
          {isExpanded ? (
            <ChevronUpIcon className="w-6 h-6" />
          ) : (
            <ChevronDownIcon className="w-6 h-6" />
          )}
        </button>
      </div>
      {isExpanded && (
        <div className="space-y-4">
          {maps.map((m) => (
            <MapCard key={m.id} id={m.id} onRemove={handleRemoveCard} />
          ))}
        </div>
      )}
    </section>
  );
};

export default SectionMap;
