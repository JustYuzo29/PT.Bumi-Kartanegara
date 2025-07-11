import React from "react";

const Code = () => {
  return (
    <div className="space-y-10"> {/* Removed text-white from here */}
      {/* BLOG SITE */}
      <div className="w-full max-w-screen-xl mx-auto">
        {/* Header text color for light mode */}
        <h1 className="text-xl font-extrabold mb-4 text-[var(--color-navy)] dark:text-white">
          BLOG SITE
        </h1>
        <a
          href="#"
          className="block text-center bg-[var(--color-midnight)] text-white 
                     hover:bg-[var(--color-snow)] hover:text-[var(--color-navy)] // Updated hover text color for light mode
                     font-semibold text-sm py-4 rounded-xl shadow transition-colors duration-200 ease-in-out
                     dark:hover:text-black" // Keep original hover text for dark mode if needed
        >
          CODE BLOG SITE
        </a>
      </div>

      {/* ANAK PERUSAHAAN SITE */}
      <div className="w-full max-w-screen-xl mx-auto">
        {/* Header text color for light mode */}
        <h1 className="text-xl font-extrabold mb-4 text-[var(--color-navy)] dark:text-white">
          ANAK PERUSAHAAN SITE
        </h1>
        <a
          href="#"
          className="block text-center bg-[var(--color-midnight)] text-white 
                     hover:bg-[var(--color-snow)] hover:text-[var(--color-navy)] // Updated hover text color for light mode
                     font-semibold text-sm py-4 rounded-xl shadow transition-colors duration-200 ease-in-out
                     dark:hover:text-black" // Keep original hover text for dark mode if needed
        >
          CODE ANAK PERUSAHAAN
        </a>
      </div>

      {/* STAFF */}
      <div className="w-full max-w-screen-xl mx-auto">
        {/* Header text color for light mode */}
        <h1 className="text-xl font-extrabold mb-4 text-[var(--color-navy)] dark:text-white">
          STAFF
        </h1>
        <a
          href="#"
          className="block text-center bg-[var(--color-midnight)] text-white 
                     hover:bg-[var(--color-snow)] hover:text-[var(--color-navy)] // Updated hover text color for light mode
                     font-semibold text-sm py-4 rounded-xl shadow transition-colors duration-200 ease-in-out
                     dark:hover:text-black" // Keep original hover text for dark mode if needed
        >
          CODE STAFF
        </a>
      </div>

      {/* ADMIN */}
      <div className="w-full max-w-screen-xl mx-auto">
        {/* Header text color for light mode */}
        <h1 className="text-xl font-extrabold mb-4 text-[var(--color-navy)] dark:text-white">
          ADMIN
        </h1>
        <a
          href="#"
          className="block text-center bg-[var(--color-midnight)] text-white 
                     hover:bg-[var(--color-snow)] hover:text-[var(--color-navy)] // Updated hover text color for light mode
                     font-semibold text-sm py-4 rounded-xl shadow transition-colors duration-200 ease-in-out
                     dark:hover:text-black" // Keep original hover text for dark mode if needed
        >
          CODE ADMIN
        </a>
      </div>
    </div>
  );
};

export default Code;