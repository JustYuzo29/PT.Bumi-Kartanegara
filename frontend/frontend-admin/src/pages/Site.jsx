// src/pages/Site.jsx
import React from "react";

const Site = () => {
  const updates = [
    {
      text: "kwqkqkjaklnajdknDKLJH | xjkanajdhnsk | jhbasusdgabdaj",
      datetime: "15-08-2025/14.00",
      editedBy: "samsul",
    },
    {
      text: "kwqkqkjaklnajdknDKLJH | xjkanajdhnsk | jhbasusdgabdaj",
      datetime: "15-08-2025/14.00",
      editedBy: "udin",
    },
  ];

  return (
    <div className="text-white space-y-10">
      {/* VISIT SITE */}
      <div>
        <h1 className="text-2xl font-extrabold mb-4">VISIT SITE</h1>

        <div className="w-full max-w-screen-xl mx-auto">
          <a
            href="https://blog.site.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-[var(--color-midnight)] text-white hover:bg-[var(--color-snow)] hover:text-black font-semibold text-sm py-4 rounded-xl shadow transition"
          >
            VISIT BLOG SITE
          </a>
        </div>
      </div>

      {/* UPDATES */}
      <div>
        <h1 className="text-2xl font-extrabold mb-4">UPDATES</h1>

        <div className="bg-[var(--color-snow)] w-full max-w-screen-xl mx-auto px-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-black pt-4">Recent Updates</h2>
          <p className="text-sm mb-6 text-black">lorem ipsum wkwkwkkwkw</p>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr className="text-black font-semibold border-b border-black">
                  <th className="py-2 px-4">no.</th>
                  <th className="py-2 px-4">updates</th>
                  <th className="py-2 px-4">date/time</th>
                  <th className="py-2 px-4">edited by</th>
                </tr>
              </thead>
              <tbody className="text-black">
                {updates.map((item, idx) => (
                  <tr
                    key={idx}
                    className="bg-[var(--color-snow)] rounded-lg shadow"
                  >
                    <td className="py-2 px-4">{`${idx + 1}.`}</td>
                    <td className="py-2 px-4">{item.text}</td>
                    <td className="py-2 px-4">{item.datetime}</td>
                    <td className="py-2 px-4">{item.editedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Site;
