// src/pages/admin/Dashboard.jsx
import React, { useState } from 'react'; // <-- Tambahkan useState di sini
import { PencilSquareIcon } from '@heroicons/react/24/outline';

// Dashboard menerima isDarkMode sebagai prop dari App.jsx
const Dashboard = ({ isDarkMode }) => {
  // Data untuk tabel updates (disesuaikan agar lebih mirip gambar)
  const updates = [
    {
      no: 1,
      content: 'lorem ipsum wikwkwk/wkw', // Sesuai gambar
      date: '15-08-2025/14.00',
      user: 'samsul'
    },
    {
      no: 2,
      content: 'kwqkjajdxjmcJDKLH | xjuanajdhnsk jhbasudgadjbaj', // Sesuai gambar
      date: '15-08-2025/14.00',
      user: 'uslin'
    },
  ];

  // Data dummy untuk metrik utama (KPIs)
  const keyMetrics = [
    {
      title: 'Pengunjung Hari Ini',
      value: '1.250',
      trend: '+15%',
      trendColor: 'text-green-500',
      description: 'dari kemarin'
    },
    {
      title: 'Postingan Aktif',
      value: '85',
      trend: 'Stabil',
      trendColor: 'text-gray-500',
      description: 'minggu ini'
    },
    {
      title: 'Komentar Baru',
      value: '12',
      trend: '-5%',
      trendColor: 'text-red-500',
      description: 'dari kemarin'
    },
    {
      title: 'Postingan Terpopuler',
      value: 'Judul Postingan Teratas Ini',
      trend: '5.2K views',
      trendColor: 'text-blue-500',
      description: ''
    },
  ];

  // Kelas CSS dinamis berdasarkan prop isDarkMode
  const contentSectionBgClass = isDarkMode ? 'bg-card-dark-bg' : 'bg-card-light-bg'; // Background kotak konten
  const titleColorClass = isDarkMode ? 'text-primary-text-dark' : 'text-primary-text-light'; // Warna teks judul besar
  const subtitleColorClass = isDarkMode ? 'text-secondary-text-dark' : 'text-secondary-text-light'; // Warna teks sub-judul & detail

  // Kelas untuk tombol VISIT BLOG SITE
  const visitButtonBgClass = isDarkMode ? 'bg-blue-700' : 'bg-blue-600';
  const visitButtonHoverClass = isDarkMode ? 'hover:bg-blue-800' : 'hover:bg-blue-700';

  // Kelas untuk tabel
  const tableHeaderBgClass = isDarkMode ? 'bg-gray-600' : 'bg-gray-50'; // Background header tabel
  const tableHeaderTextColorClass = isDarkMode ? 'text-gray-200' : 'text-gray-500'; // Teks header tabel
  const tableRowBgClass = isDarkMode ? 'bg-card-dark-bg' : 'bg-card-light-bg'; // Background baris tabel
  const tableRowTextColorClass = isDarkMode ? 'text-primary-text-dark' : 'text-primary-text-light'; // Teks baris tabel
  const tableDivideColorClass = isDarkMode ? 'divide-gray-600' : 'divide-gray-200'; // Pembatas baris tabel
  const tableHoverClass = isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-50';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUpdate, setEditingUpdate] = useState(null);

  const handleEditClick = (update) => {
    setEditingUpdate(update);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingUpdate(null);
  };

  const handleSaveEdit = () => {
    // Logika untuk menyimpan perubahan ke backend (ini masih placeholder)
    console.log("Saving changes for:", editingUpdate);
    // Di sini Anda akan mengirim data editingUpdate ke API backend Anda
    // Contoh: fetch('/api/update-content', { method: 'POST', body: JSON.stringify(editingUpdate) })
    //         .then(response => response.json())
    //         .then(data => { /* handle success */ })
    //         .catch(error => { /* handle error */ });

    // Tutup modal setelah menyimpan
    handleModalClose();
  };

  return (
    <div className="p-8"> {/* Padding untuk konten halaman */}

      {/* Section: VISIT SITE */}
      <div className={`mb-8 p-6 rounded-lg shadow-lg flex flex-col items-center ${contentSectionBgClass}`}>
        <h2 className={`text-2xl font-semibold mb-4 ${titleColorClass}`}>VISIT SITE</h2>
        <button className={`font-bold py-2 px-6 rounded-md shadow-md transition duration-300 text-white ${visitButtonBgClass} ${visitButtonHoverClass}`}>
          VISIT BLOG SITE
        </button>
      </div>

      {/* New Section: Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {keyMetrics.map((metric, index) => (
          <div key={index} className={`p-4 rounded-lg shadow-md ${contentSectionBgClass}`}>
            <h3 className={`text-md font-semibold ${subtitleColorClass}`}>{metric.title}</h3>
            {metric.title === 'Postingan Terpopuler' ? (
              <p className={`text-lg font-bold ${titleColorClass} mt-2`}>
                {metric.value}
              </p>
            ) : (
              <p className={`text-3xl font-bold ${titleColorClass} mt-2`}>
                {metric.value}
              </p>
            )}
            <p className={`text-sm ${subtitleColorClass} mt-1`}>
              <span className={metric.trendColor}>{metric.trend}</span> {metric.description}
            </p>
          </div>
        ))}
      </div>

      {/* Section: UPDATES */}
      <div className={`p-6 rounded-lg shadow-lg ${contentSectionBgClass}`}>
        <h2 className={`text-xl font-semibold mb-4 ${titleColorClass}`}>UPDATES</h2>
        <h3 className={`text-lg font-medium mb-4 ${subtitleColorClass}`}>Recent Updates</h3>
        <div className={`rounded-lg overflow-hidden ${isDarkMode ? 'border border-gray-600' : ''}`}>
          <table className={`min-w-full divide-y ${tableDivideColorClass}`}>
            <thead className={tableHeaderBgClass}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium ${tableHeaderTextColorClass} uppercase tracking-wider`}>No</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${tableHeaderTextColorClass} uppercase tracking-wider`}>Pembaruan</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${tableHeaderTextColorClass} uppercase tracking-wider`}>Tanggal/Waktu</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${tableHeaderTextColorClass} uppercase tracking-wider`}>Diperbarui Oleh</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${tableHeaderTextColorClass} uppercase tracking-wider`}>Aksi</th>
              </tr>
            </thead>
            <tbody className={`${tableRowBgClass} divide-y ${tableDivideColorClass}`}>
              {updates.map((item) => (
                <tr key={item.no} className={tableHoverClass}>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${tableRowTextColorClass}`}>{item.no}.</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${tableRowTextColorClass}`}>{item.content}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${tableRowTextColorClass}`}>{item.date}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${tableRowTextColorClass}`}>{item.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="text-blue-500 hover:text-blue-700 transition duration-150 ease-in-out"
                      title="Quick Edit"
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Quick Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className={`${contentSectionBgClass} p-6 rounded-lg shadow-xl w-11/12 md:w-1/2 lg:w-1/3`}>
            <h3 className={`text-xl font-semibold mb-4 ${titleColorClass}`}>Edit Pembaruan</h3>
            {editingUpdate && (
              <>
                <div className="mb-4">
                  <label htmlFor="content" className={`block text-sm font-medium ${subtitleColorClass} mb-1`}>Konten:</label>
                  <input
                    type="text"
                    id="content"
                    value={editingUpdate.content}
                    onChange={(e) => setEditingUpdate({ ...editingUpdate, content: e.target.value })}
                    className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                               ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={handleModalClose}
                    className={`py-2 px-4 rounded-md transition duration-300
                               ${isDarkMode ? 'bg-gray-600 hover:bg-gray-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className={`py-2 px-4 rounded-md transition duration-300 text-white
                               ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}`}
                  >
                    Simpan
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;