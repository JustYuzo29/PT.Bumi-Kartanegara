// src/pages/admin/Configuration.jsx
import React, { useState, useMemo } from 'react';
import { CheckCircleIcon, XCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'; // Impor ikon

const Configuration = ({ isDarkMode }) => {
  // Data awal untuk tabel Admin Access (gunakan id unik dan deskripsi akses yang realistis)
  const initialAdminAccessData = [
    { id: 1, name: 'awang', akses: 'Manajemen Pengguna, Laporan Analitik, Pengaturan Sistem' },
    { id: 2, name: 'arham', akses: 'Manajemen Konten, Pengaturan Dasar Aplikasi' },
    { id: 3, name: 'budi', akses: 'Manajemen Keuangan, Laporan Penjualan' },
  ];

  // Data awal untuk tabel Staff Induk Perusahaan Access
  const initialStaffIndukAccessData = [
    { id: 101, name: 'aksaf', akses: 'Lihat Laporan Penjualan, Edit Profil Pribadi' },
    { id: 102, name: 'bang jack', akses: 'Buat Konten Blog, Moderasi Komentar' },
    { id: 103, name: 'citra', akses: 'Input Data Produk, Update Inventaris' },
  ];

  // Data awal untuk tabel Staff Anak Perusahaan Access
  const initialStaffAnakAccessData = [
    { id: 201, name: 'dina', akses: 'Lihat Laporan Operasional, Verifikasi Data' },
    { id: 202, name: 'eko', akses: 'Manajemen Pesanan, Dukungan Pelanggan' },
    { id: 203, name: 'fajar', akses: 'Entri Data Absensi, Laporan Kinerja Harian' },
  ];

  // State untuk mengelola data akses dan status checkbox (Setiap item memiliki properti 'checked')
  // Menggunakan fungsi inisialisasi untuk useState agar data awal hanya dihitung sekali
  const [adminAccess, setAdminAccess] = useState(() => initialAdminAccessData.map(item => ({ ...item, checked: true })));
  const [staffIndukAccess, setStaffIndukAccess] = useState(() => initialStaffIndukAccessData.map(item => ({ ...item, checked: true })));
  const [staffAnakAccess, setStaffAnakAccess] = useState(() => initialStaffAnakAccessData.map(item => ({ ...item, checked: true })));

  // State untuk melacak perubahan yang belum disimpan per bagian
  const [hasUnsavedChangesAdmin, setHasUnsavedChangesAdmin] = useState(false);
  const [hasUnsavedChangesStaffInduk, setHasUnsavedChangesStaffInduk] = useState(false);
  const [hasUnsavedChangesStaffAnak, setHasUnsavedChangesStaffAnak] = useState(false);

  // State untuk modal konfirmasi
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [sectionToSave, setSectionToSave] = useState(null); // Bagian mana yang akan disimpan

  // State untuk pencarian
  const [adminSearchTerm, setAdminSearchTerm] = useState('');
  const [staffIndukSearchTerm, setStaffIndukSearchTerm] = useState('');
  const [staffAnakSearchTerm, setStaffAnakSearchTerm] = useState('');


  // Fungsi handler untuk checkbox
  const handleCheckboxChange = (sectionKey, id, checkedStatus) => {
    let setStateFunc, setUnsavedChangesFunc;
    switch (sectionKey) {
      case 'admin':
        setStateFunc = setAdminAccess;
        setUnsavedChangesFunc = setHasUnsavedChangesAdmin;
        break;
      case 'staffInduk':
        setStateFunc = setStaffIndukAccess;
        setUnsavedChangesFunc = setHasUnsavedChangesStaffInduk;
        break;
      case 'staffAnak':
        setStateFunc = setStaffAnakAccess;
        setUnsavedChangesFunc = setHasUnsavedChangesStaffAnak;
        break;
      default:
        return;
    }

    setStateFunc(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, checked: checkedStatus } : item
      )
    );
    setUnsavedChangesFunc(true); // Set status perubahan belum disimpan
  };

  // Fungsi untuk memicu modal konfirmasi sebelum menyimpan
  const handleSaveClick = (section) => {
    setSectionToSave(section);
    setIsConfirmModalOpen(true);
  };

  // Fungsi untuk menyimpan perubahan (setelah konfirmasi)
  const handleConfirmSave = () => {
    // Logika nyata: Kirim data ke backend API
    console.log(`Saving changes for ${sectionToSave}:`);
    let dataToSave;
    let setUnsavedChangesFunc;

    switch (sectionToSave) {
      case 'admin':
        dataToSave = adminAccess;
        setUnsavedChangesFunc = setHasUnsavedChangesAdmin;
        break;
      case 'staffInduk':
        dataToSave = staffIndukAccess;
        setUnsavedChangesFunc = setHasUnsavedChangesStaffInduk;
        break;
      case 'staffAnak':
        dataToSave = staffAnakAccess;
        setUnsavedChangesFunc = setHasUnsavedChangesStaffAnak;
        break;
      default:
        break;
    }

    console.log("Data to save:", dataToSave);
    // Di sini Anda akan menambahkan panggilan API, contoh:
    // fetch('/api/save-access', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ section: sectionToSave, data: dataToSave })
    // }).then(response => response.json())
    //   .then(data => {
    //     alert(`Perubahan untuk ${sectionToSave} berhasil disimpan!`);
    //     setUnsavedChangesFunc(false);
    //     setIsConfirmModalOpen(false);
    //     setSectionToSave(null);
    //   }).catch(error => {
    //     console.error('Error saving:', error);
    //     alert('Gagal menyimpan perubahan. Silakan coba lagi.');
    //     setIsConfirmModalOpen(false);
    //     setSectionToSave(null);
    //   });

    alert(`Perubahan untuk ${sectionToSave} berhasil disimpan! (Dummy Save)`); // Ganti dengan notifikasi toast
    setUnsavedChangesFunc(false); // Reset status perubahan
    setIsConfirmModalOpen(false);
    setSectionToSave(null);
  };

  // Fungsi untuk membatalkan perubahan
  const handleCancelClick = (sectionKey) => {
    let initialDataArray, setStateFunc, setUnsavedChangesFunc;
    switch (sectionKey) {
      case 'admin':
        initialDataArray = initialAdminAccessData;
        setStateFunc = setAdminAccess;
        setUnsavedChangesFunc = setHasUnsavedChangesAdmin;
        break;
      case 'staffInduk':
        initialDataArray = initialStaffIndukAccessData;
        setStateFunc = setStaffIndukAccess;
        setUnsavedChangesFunc = setHasUnsavedChangesStaffInduk;
        break;
      case 'staffAnak':
        initialDataArray = initialStaffAnakAccessData;
        setStateFunc = setStaffAnakAccess;
        setUnsavedChangesFunc = setHasUnsavedChangesStaffAnak;
        break;
      default:
        return;
    }
    // Kembali ke state awal dengan properti 'checked' diatur ke true
    setStateFunc(initialDataArray.map(item => ({ ...item, checked: true })));
    setUnsavedChangesFunc(false); // Reset status perubahan
  };

  // Filter data berdasarkan search term
  const filteredAdminAccess = useMemo(() => {
    return adminAccess.filter(item =>
      item.name.toLowerCase().includes(adminSearchTerm.toLowerCase()) ||
      item.akses.toLowerCase().includes(adminSearchTerm.toLowerCase())
    );
  }, [adminAccess, adminSearchTerm]);

  const filteredStaffIndukAccess = useMemo(() => {
    return staffIndukAccess.filter(item =>
      item.name.toLowerCase().includes(staffIndukSearchTerm.toLowerCase()) ||
      item.akses.toLowerCase().includes(staffIndukSearchTerm.toLowerCase())
    );
  }, [staffIndukAccess, staffIndukSearchTerm]);

  const filteredStaffAnakAccess = useMemo(() => {
    return staffAnakAccess.filter(item =>
      item.name.toLowerCase().includes(staffAnakSearchTerm.toLowerCase()) ||
      item.akses.toLowerCase().includes(staffAnakSearchTerm.toLowerCase())
    );
  }, [staffAnakAccess, staffAnakSearchTerm]);


  // Kelas CSS dinamis berdasarkan prop isDarkMode
  const contentSectionBgClass = isDarkMode ? 'bg-card-dark-bg' : 'bg-card-light-bg';
  const titleColorClass = isDarkMode ? 'text-primary-text-dark' : 'text-primary-text-light';
  const subtitleColorClass = isDarkMode ? 'text-secondary-text-dark' : 'text-secondary-text-light';
  const tableHeaderBgClass = isDarkMode ? 'bg-gray-700' : 'bg-gray-100'; // Sedikit lebih gelap/terang
  const tableHeaderTextColorClass = isDarkMode ? 'text-gray-200' : 'text-gray-600';
  const tableRowBgClass = isDarkMode ? 'bg-card-dark-bg' : 'bg-card-light-bg';
  const tableRowTextColorClass = isDarkMode ? 'text-primary-text-dark' : 'text-primary-text-light';
  const tableDivideColorClass = isDarkMode ? 'divide-gray-600' : 'divide-gray-200';
  const tableHoverClass = isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-50';
  const inputBgClass = isDarkMode ? 'bg-gray-700' : 'bg-white';
  const inputBorderClass = isDarkMode ? 'border-gray-600' : 'border-gray-300';
  const inputTextColorClass = isDarkMode ? 'text-white' : 'text-gray-900';
  const warningTextColorClass = isDarkMode ? 'text-yellow-300' : 'text-yellow-700';


  // Komponen render helper untuk setiap bagian tabel
  const renderAccessSection = (sectionKey, title, subtitle, data, searchTerm, setSearchTerm, hasUnsavedChanges) => (
    <div className={`mb-8 p-6 rounded-lg shadow-lg ${contentSectionBgClass}`}>
      <h2 className={`text-xl font-semibold mb-4 ${titleColorClass}`}>{title}</h2>
      <h3 className={`text-lg font-medium mb-4 ${subtitleColorClass}`}>{subtitle}</h3>

      {/* Search Bar */}
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Cari nama atau akses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full pl-10 pr-4 py-2 rounded-md border ${inputBgClass} ${inputBorderClass} ${inputTextColorClass} focus:ring-blue-500 focus:border-blue-500`}
        />
        <MagnifyingGlassIcon className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${subtitleColorClass}`} />
      </div>

      {/* Tabel Akses */}
      <div className={`rounded-lg overflow-hidden ${isDarkMode ? 'border border-gray-600' : 'border border-gray-200'}`}>
        <table className={`min-w-full divide-y ${tableDivideColorClass}`}>
          <thead className={tableHeaderBgClass}>
            <tr>
              <th className={`px-6 py-3 text-left text-xs font-medium ${tableHeaderTextColorClass} uppercase tracking-wider`}>nama</th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${tableHeaderTextColorClass} uppercase tracking-wider`}>Akses</th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${tableHeaderTextColorClass} uppercase tracking-wider`}>action</th>
            </tr>
          </thead>
          <tbody className={`${tableRowBgClass} divide-y ${tableDivideColorClass}`}>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id} className={tableHoverClass}>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${tableRowTextColorClass}`}>{item.name}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${tableRowTextColorClass}`}>{item.akses}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <input
                      type="checkbox"
                      checked={item.checked} // Menggunakan item.checked langsung dari state data
                      onChange={(e) => handleCheckboxChange(sectionKey, item.id, e.target.checked)}
                      className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer
                                 dark:bg-gray-700 dark:border-gray-500 dark:checked:bg-blue-500 dark:checked:border-transparent"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className={`px-6 py-4 text-center ${tableRowTextColorClass}`}>Tidak ada data ditemukan.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Tombol Simpan/Batal */}
      <div className="flex justify-end space-x-3 mt-6">
        {hasUnsavedChanges && (
          <span className={`text-sm ${warningTextColorClass} flex items-center mr-auto`}>
            <XCircleIcon className="w-5 h-5 mr-1" /> Ada perubahan yang belum disimpan!
          </span>
        )}
        <button
          onClick={() => handleCancelClick(sectionKey)}
          className={`py-2 px-4 rounded-md transition duration-300
                     ${isDarkMode ? 'bg-gray-600 hover:bg-gray-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
        >
          Batal
        </button>
        <button
          onClick={() => handleSaveClick(sectionKey)}
          className={`py-2 px-4 rounded-md transition duration-300 text-white
                     ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}
                     ${!hasUnsavedChanges ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!hasUnsavedChanges}
        >
          <CheckCircleIcon className="w-5 h-5 inline-block mr-2" /> Simpan Perubahan
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <h1 className={`text-3xl font-bold mb-6 ${titleColorClass}`}>HAK AKSES ADMIN & STAFF</h1>

      {renderAccessSection(
        'admin',
        'ADMIN',
        'Hak Akses',
        filteredAdminAccess,
        adminSearchTerm,
        setAdminSearchTerm,
        hasUnsavedChangesAdmin
      )}

      {renderAccessSection(
        'staffInduk',
        'STAFF INDUK PERUSAHAAN',
        'Hak Akses',
        filteredStaffIndukAccess,
        staffIndukSearchTerm,
        setStaffIndukSearchTerm,
        hasUnsavedChangesStaffInduk
      )}

      {renderAccessSection(
        'staffAnak',
        'STAFF ANAK PERUSAHAAN',
        'Hak Akses',
        filteredStaffAnakAccess,
        staffAnakSearchTerm,
        setStaffAnakSearchTerm,
        hasUnsavedChangesStaffAnak
      )}

      {/* Modal Konfirmasi Simpan */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className={`${contentSectionBgClass} p-6 rounded-lg shadow-xl w-11/12 md:w-1/3`}>
            <h3 className={`text-xl font-semibold mb-4 ${titleColorClass}`}>Konfirmasi Simpan Perubahan</h3>
            <p className={`${subtitleColorClass} mb-6`}>
              Anda akan menyimpan perubahan hak akses untuk bagian **
              {sectionToSave === 'admin' ? 'ADMIN' :
               sectionToSave === 'staffInduk' ? 'STAFF INDUK PERUSAHAAN' :
               'STAFF ANAK PERUSAHAAN'}
              **. Apakah Anda yakin?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsConfirmModalOpen(false);
                  setSectionToSave(null);
                }}
                className={`py-2 px-4 rounded-md transition duration-300
                           ${isDarkMode ? 'bg-gray-600 hover:bg-gray-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
              >
                Batal
              </button>
              <button
                onClick={handleConfirmSave}
                className={`py-2 px-4 rounded-md transition duration-300 text-white
                           bg-blue-600 hover:bg-blue-700`}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Configuration;