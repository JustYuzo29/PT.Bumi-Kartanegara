import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-ocean text-white py-10">
      {/* Upper: Company Info & Site Map */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-heading mb-2">
            PT. BUMI KARTANEGARA
          </h3>
          <p className="text-sm leading-relaxed mb-4">
            lorem ipsum DOLOR SIT AMET wkwkwkwkwkkw lorem, <br />
            wwwwww 1234, Indonesia
          </p>
          <p className="text-sm mb-1">123456789123</p>
          <p className="text-sm mb-1">123456789123</p>
        </div>

        {/* Site Map */}
        <div>
          <h3 className="text-xl font-heading mb-2">Site Map</h3>
          <ul className="space-y-2 text-sm">
            {['ABOUT US', 'MEDIA', 'SERVICE', 'CONTACT'].map(link => (
              <li key={link}>
                <a
                  href={`/${link.toLowerCase().replace(/ /g, '-')}`}
                  className="text-snow hover:text-tahiti transition"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Divider & Copyright */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-cloud mt-8 pt-4">
        <p className="text-sm">
          © {new Date().getFullYear()} PT. BUMI KARTANEGARA. All rights reserved.
        </p>
      </div>
    </footer>
  );
}