import React, { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import DaftarHalamanAboutUsCard from "./components/DaftarHalamanAboutUsCard";

const SectionAboutUsHalaman = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <section className="mb-10">
      <div className="flex items-center gap-2 pl-3 mb-4">
        <h2 className="text-2xl font-bold text-[var(--color-button-blue)] dark:text-white tracking-wide uppercase">
          ABOUT US
        </h2>
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
        <DaftarHalamanAboutUsCard />
      )}
    </section>
  );
};

export default SectionAboutUsHalaman;
