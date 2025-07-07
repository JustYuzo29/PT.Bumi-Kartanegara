// src/pages/admin/Dashboard.jsx
import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Kunjungi Situs</h1>
      <button className="bg-blue-600 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-lg mb-10">
        Kunjungi Situs Blog
      </button>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pembaruan Terbaru</h2>
      <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pembaruan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal/Waktu</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diperbarui Oleh</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1.</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">lagiyupdates:la:p | djsjhdsfhsk | nndnawhdqweu</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">01-08-2025 15:00</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">admin</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2.</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">naghiyupdates | qpsaqpkdsk | qpwghqwioq</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">01-08-2025 15:00</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">admin</td>
            </tr>
             <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">3.</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Konten baru ditambahkan ke halaman utama</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">30-07-2025 11:23</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">user_hamm</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
