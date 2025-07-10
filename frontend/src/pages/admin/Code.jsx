// src/pages/admin/Code.jsx
import React, { useState, useCallback } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
// Import bahasa yang Anda butuhkan (harus sudah diimpor secara global di App.jsx/index.js juga)
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup'; // Untuk HTML
import 'prismjs/components/prism-json'; // Misalnya untuk konfigurasi JSON

// Ini adalah data dummy untuk kode. Dalam aplikasi nyata, ini akan diambil dari backend.
const initialCodeSnippets = {
  blogSite: `<script>
  console.log('Blog site loaded!');
  // Add your analytics code here
  // gtag('config', 'GA_MEASUREMENT_ID');
</script>

<style>
  /* Custom CSS for Blog */
  .blog-post-title {
    color: #336699;
    font-family: 'Georgia', serif;
  }
</style>
`,
  anakPerusahaanSite: `// JavaScript for Anak Perusahaan Site
(function() {
  const companyName = "Anak Perusahaan A";
  console.log(\`Welcome to \${companyName} Site!\`);

  // Initialize specific features
  // initFeatureX();
})();

/* CSS Khusus Anak Perusahaan */
.company-logo {
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
`,
  staff: `{
  "staff_settings": {
    "enable_login_audit": true,
    "max_failed_attempts": 5,
    "session_timeout_minutes": 60
  },
  "permissions": {
    "default_staff_role": "viewer",
    "can_upload_files": false
  }
}`,
  admin: `{
  "admin_panel_config": {
    "dashboard_widgets": ["analytics", "updates", "users"],
    "alert_thresholds": {
      "low_disk_space_gb": 10
    }
  },
  "security": {
    "mfa_required": true,
    "password_complexity": "strong"
  }
}`,
};


const Code = ({ isDarkMode }) => {
  // State untuk menyimpan konten kode per bagian
  const [codeContent, setCodeContent] = useState(initialCodeSnippets);
  // State untuk melacak bagian mana yang sedang aktif/terbuka
  const [activeSection, setActiveSection] = useState(null); // 'blogSite', 'anakPerusahaanSite', 'staff', 'admin'
  // State untuk melacak apakah ada perubahan yang belum disimpan
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState({});

  // Kelas CSS dinamis berdasarkan prop isDarkMode
  const contentSectionBgClass = isDarkMode ? 'bg-card-dark-bg' : 'bg-card-light-bg';
  const titleColorClass = isDarkMode ? 'text-primary-text-dark' : 'text-primary-text-light';
  const buttonBgClass = isDarkMode ? 'bg-blue-700' : 'bg-blue-600';
  const buttonHoverClass = isDarkMode ? 'hover:bg-blue-800' : 'hover:bg-blue-700';
  const editorBgClass = isDarkMode ? 'bg-gray-800' : 'bg-gray-100'; // Background editor kode
  const editorTextColorClass = isDarkMode ? 'text-gray-200' : 'text-gray-800'; // Warna teks editor
  const borderColorClass = isDarkMode ? 'border-gray-600' : 'border-gray-300';
  const warningTextColorClass = isDarkMode ? 'text-yellow-300' : 'text-yellow-700';

  // Fungsi untuk mendapatkan bahasa highlight berdasarkan section
  const getLanguage = (section) => {
    switch (section) {
      case 'blogSite':
      case 'anakPerusahaanSite':
        return languages.markup; // Untuk HTML dan JavaScript inline
      case 'staff':
      case 'admin':
        return languages.json; // Untuk konfigurasi JSON
      default:
        return languages.js; // Default JavaScript
    }
  };

  // Fungsi yang dipanggil saat editor berubah
  const handleCodeChange = useCallback((section, newCode) => {
    setCodeContent(prev => ({ ...prev, [section]: newCode }));
    setHasUnsavedChanges(prev => ({ ...prev, [section]: true }));
  }, []);

  // Fungsi untuk menyimpan kode
  const handleSaveCode = (section) => {
    // Logika nyata: Kirim codeContent[section] ke backend API
    console.log(`Saving code for ${section}:`, codeContent[section]);
    alert(`Kode untuk ${section} berhasil disimpan! (Dummy Save)`);
    setHasUnsavedChanges(prev => ({ ...prev, [section]: false }));
    // Di sini Anda akan menambahkan logika untuk memicu deployment atau penerapan perubahan.
  };

  // Fungsi untuk membatalkan perubahan
  const handleCancelEdit = (section) => {
    // Kembalikan kode ke initialCodeSnippets atau versi terakhir yang disimpan dari backend
    setCodeContent(prev => ({ ...prev, [section]: initialCodeSnippets[section] }));
    setHasUnsavedChanges(prev => ({ ...prev, [section]: false }));
  };

  // Fungsi untuk membuka/menutup editor
  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const renderCodeSection = (sectionKey, title, buttonText) => (
    <div className={`mb-4 p-6 rounded-lg shadow-lg ${contentSectionBgClass}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-xl font-semibold ${titleColorClass}`}>{title}</h2>
        <button
          onClick={() => toggleSection(sectionKey)}
          className={`py-3 px-8 rounded-lg text-lg font-semibold text-white transition duration-300 ${buttonBgClass} ${buttonHoverClass}`}
        >
          {activeSection === sectionKey ? 'CLOSE EDITOR' : buttonText}
        </button>
      </div>

      {activeSection === sectionKey && (
        <div className="mt-4">
          <p className={`text-sm mb-4 ${warningTextColorClass}`}>
            **PERINGATAN:** Mengedit kode secara langsung dapat mempengaruhi fungsionalitas situs Anda. Pastikan Anda memahami apa yang Anda lakukan.
          </p>
          <div className={`border rounded-md overflow-hidden font-mono text-sm ${borderColorClass}`}>
            <Editor
              value={codeContent[sectionKey]}
              onValueChange={newCode => handleCodeChange(sectionKey, newCode)}
              highlight={code => highlight(code, getLanguage(sectionKey), sectionKey === 'staff' || sectionKey === 'admin' ? 'json' : 'markup')}
              padding={10}
              style={{
                fontFamily: '"Fira Code", "Fira Mono", monospace',
                fontSize: 14,
                lineHeight: '1.5em',
                backgroundColor: editorBgClass.replace('bg-', '#'), // Mengambil warna heksa dari Tailwind class
                color: editorTextColorClass.replace('text-', '#'), // Mengambil warna heksa dari Tailwind class
                minHeight: '200px',
                maxHeight: '400px',
                overflowY: 'auto'
              }}
              className={`prism-editor ${editorBgClass} ${editorTextColorClass}`}
            />
          </div>
          <div className="flex justify-end space-x-3 mt-4">
            {hasUnsavedChanges[sectionKey] && (
              <span className={`text-sm ${warningTextColorClass} flex items-center mr-auto`}>
                *Ada perubahan yang belum disimpan!
              </span>
            )}
            <button
              onClick={() => handleCancelEdit(sectionKey)}
              className={`py-2 px-4 rounded-md transition duration-300
                         ${isDarkMode ? 'bg-gray-600 hover:bg-gray-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
            >
              Batal
            </button>
            <button
              onClick={() => handleSaveCode(sectionKey)}
              className={`py-2 px-4 rounded-md transition duration-300 text-white
                         ${buttonBgClass} ${buttonHoverClass}`}
            >
              Simpan
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-8">
      {renderCodeSection('blogSite', 'BLOG SITE', 'CODE BLOG SITE')}
      {renderCodeSection('anakPerusahaanSite', 'ANAK PERUSAHAAN SITE', 'CODE ANAK PERUSAHAAN')}
      {renderCodeSection('staff', 'STAFF', 'CODE STAFF')}
      {renderCodeSection('admin', 'ADMIN', 'CODE ADMIN')}
    </div>
  );
};

export default Code;