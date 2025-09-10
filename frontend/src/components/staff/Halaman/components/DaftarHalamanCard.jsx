import React, { useState } from "react";
import { TrashIcon, PlusIcon } from "@heroicons/react/24/solid";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

// Daftar semua halaman yang mungkin bisa ditambahkan
const allAvailablePages = [
  "BANNER CONTENT",
  "SERVICE",
  "ABOUT US",
  "OUR JOURNEY",
  "VISI & MISI", // Contoh tambahan
];

const DaftarHalamanCard = ({
  title = "Daftar Halaman",
  desc = "Kelola urutan dan section menu Daftar Halaman di bawah ini.",
}) => {
  // State dimulai dengan array kosong
  const [pages, setPages] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ open: false, severity: 'info', message: '' });

  const showAlert = (severity, message) => {
    setAlertInfo({ open: true, severity, message });
    setTimeout(() => setAlertInfo({ open: false, severity: 'info', message: '' }), 3000);
  };

  // Fungsi untuk menambah halaman dari dropdown
  const handleAddPage = (pageName) => {
    // Cek lagi untuk mencegah duplikasi jika ada interaksi cepat
    if (pages.some(p => p.name === pageName)) {
      showAlert('warning', `Halaman "${pageName}" sudah ada.`);
      return;
    }
    
    const newPage = { id: Date.now(), name: pageName };
    setPages(prev => [...prev, newPage]);
    setShowDropdown(false);
    showAlert('success', `Halaman "${pageName}" berhasil ditambahkan.`);
    // TODO: Kirim info penambahan halaman baru ke backend
  };

  const handleCodeButtonClick = (pageName) => {
    // Logika untuk navigasi ke editor halaman terkait
    alert(`Navigasi ke editor untuk halaman: ${pageName}`);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus halaman "${name}"?`)) {
      setPages(prev => prev.filter(p => p.id !== id));
      showAlert('error', `Halaman "${name}" telah dihapus.`);
      // TODO: Kirim request hapus halaman ke backend
    }
  };
  
  // Filter halaman yang tersedia untuk ditampilkan di dropdown
  const availablePagesForDropdown = allAvailablePages.filter(
    (ap) => !pages.some((p) => p.name === ap)
  );

  return (
    <div className="relative mb-4">
      {/* Accent kiri */}
      <div className="absolute left-0 top-0 h-full w-2 rounded-l-lg bg-[var(--color-accent)] dark:bg-[var(--color-button-blue)]"></div>
      {/* Card */}
      <div className="ml-2 bg-white dark:bg-[var(--color-card-bg)] rounded-lg shadow-elevated px-6 pt-5 pb-6">
        <div className="flex items-center mb-2">
          <h3 className="text-xl font-bold text-[var(--color-button-blue)] mr-2">{title}</h3>
          {/* Tombol Plus sekarang mengontrol dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(prev => !prev)}
              className="text-[var(--color-accent)] ml-1"
              title="Tambah Halaman"
            >
              <PlusIcon className="w-5 h-5" />
            </button>
            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-600">
                <div className="py-1">
                  {availablePagesForDropdown.length > 0 ? (
                    availablePagesForDropdown.map(pageName => (
                      <a
                        key={pageName}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddPage(pageName);
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200"
                      >
                        {pageName}
                      </a>
                    ))
                  ) : (
                    <p className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">Semua halaman sudah ditambahkan.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <p className="text-[13px] mb-3 text-[var(--color-button-blue)]">{desc}</p>
        
        {alertInfo.open && (
            <Stack sx={{ width: '100%', my: 2 }} spacing={2}>
              <Alert severity={alertInfo.severity}>{alertInfo.message}</Alert>
            </Stack>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-600">
                <th className="text-left p-2 font-bold text-[var(--color-button-blue)] w-[40%]">nama</th>
                <th className="text-center p-2 font-bold text-[var(--color-button-blue)] w-[20%]">edit</th>
                <th className="text-center p-2 font-bold text-[var(--color-button-blue)] w-[20%]">action</th>
              </tr>
            </thead>
            <tbody>
              {pages.length > 0 ? pages.map((page) => (
                <tr key={page.id} className="border-b border-gray-200 dark:border-gray-500">
                  <td className="p-2 font-semibold text-[var(--color-button-blue)]">{page.name}</td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => handleCodeButtonClick(page.name)}
                      className="bg-[var(--color-button-blue)] text-white px-6 py-1 rounded-full font-semibold shadow"
                    >
                      Code
                    </button>
                  </td>
                  <td className="p-2 text-center">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleDelete(page.id, page.name)}
                        className="p-1 rounded"
                        title="Hapus"
                      >
                        <TrashIcon className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                    <td colSpan="3" className="p-4 text-center text-gray-400">
                        Belum ada halaman. Klik ikon '+' untuk menambahkan.
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DaftarHalamanCard;
