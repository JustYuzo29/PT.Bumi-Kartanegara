// src/pages/admin/User.jsx
import React, { useState, useMemo } from 'react'; // Tambahkan useMemo untuk optimisasi
import { PlusCircleIcon, PencilSquareIcon, TrashIcon, UserIcon, FolderIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'; // Impor ikon dari Heroicons

const User = ({ isDarkMode }) => {
  // Data untuk tabel Admin (dummy data, di real app dari API)
  const initialAdminUsers = [
    { id: 1, name: 'Budi Santoso', email: 'budi.santoso@example.com', role: 'Super Admin' },
    { id: 2, name: 'Siti Aminah', email: 'siti.aminah@example.com', role: 'Admin' },
    { id: 3, name: 'Joko Susilo', email: 'joko.susilo@example.com', role: 'Admin' },
    { id: 4, name: 'Anisa Putri', email: 'anisa.putri@example.com', role: 'Admin' },
    { id: 5, name: 'Rudi Wijaya', email: 'rudi.wijaya@example.com', role: 'Admin' },
    { id: 6, name: 'Dewi Lestari', email: 'dewi.lestari@example.com', role: 'Admin' },
  ];

  // Data untuk tabel Staff (dummy data, di real app dari API)
  const initialStaffUsers = [
    { id: 101, name: 'Andi Pratama', email: 'andi.pratama@perusahaan1.com', company: 'Anak Perusahaan 1', role: 'Editor' },
    { id: 102, name: 'Citra Kirana', email: 'citra.kirana@perusahaan1.com', company: 'Anak Perusahaan 1', role: 'Viewer' },
    { id: 103, name: 'Doni Saputra', email: 'doni.saputra@perusahaan2.com', company: 'Anak Perusahaan 2', role: 'Editor' },
    { id: 104, name: 'Eka Nurani', email: 'eka.nurani@perusahaan1.com', company: 'Anak Perusahaan 1', role: 'Moderator' },
    { id: 105, name: 'Fajar Kurniawan', email: 'fajar.kurniawan@perusahaan3.com', company: 'Anak Perusahaan 3', role: 'Viewer' },
    { id: 106, name: 'Gita Permata', email: 'gita.permata@perusahaan2.com', company: 'Anak Perusahaan 2', role: 'Editor' },
    { id: 107, name: 'Hari Santoso', email: 'hari.santoso@perusahaan1.com', company: 'Anak Perusahaan 1', role: 'Viewer' },
    { id: 108, name: 'Indah Jaya', email: 'indah.jaya@perusahaan3.com', company: 'Anak Perusahaan 3', role: 'Editor' },
  ];

  // State manajemen pengguna
  const [adminUsers, setAdminUsers] = useState(initialAdminUsers);
  const [staffUsers, setStaffUsers] = useState(initialStaffUsers);

  // State untuk modal
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // User yang sedang diedit/dihapus
  const [userTypeForModal, setUserTypeForModal] = useState(''); // 'admin' atau 'staff'

  // State untuk dropdown Staff
  const [selectedCompany, setSelectedCompany] = useState('Semua Perusahaan'); // Default untuk filter
  const companies = ['Semua Perusahaan', 'Anak Perusahaan 1', 'Anak Perusahaan 2', 'Anak Perusahaan 3'];

  // State untuk pencarian
  const [adminSearchTerm, setAdminSearchTerm] = useState('');
  const [staffSearchTerm, setStaffSearchTerm] = useState('');

  // State untuk paginasi
  const [adminCurrentPage, setAdminCurrentPage] = useState(1);
  const [staffCurrentPage, setStaffCurrentPage] = useState(1);
  const usersPerPage = 5; // Jumlah user per halaman

  // Kelas CSS dinamis berdasarkan prop isDarkMode
  const contentSectionBgClass = isDarkMode ? 'bg-card-dark-bg' : 'bg-card-light-bg';
  const titleColorClass = isDarkMode ? 'text-primary-text-dark' : 'text-primary-text-light';
  const subtitleColorClass = isDarkMode ? 'text-secondary-text-dark' : 'text-secondary-text-light';
  const tableHeaderBgClass = isDarkMode ? 'bg-gray-600' : 'bg-gray-50';
  const tableHeaderTextColorClass = isDarkMode ? 'text-gray-200' : 'text-gray-500';
  const tableRowBgClass = isDarkMode ? 'bg-card-dark-bg' : 'bg-card-light-bg';
  const tableRowTextColorClass = isDarkMode ? 'text-primary-text-dark' : 'text-primary-text-light';
  const tableDivideColorClass = isDarkMode ? 'divide-gray-600' : 'divide-gray-200';
  const tableHoverClass = isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-50';
  const selectBgClass = isDarkMode ? 'bg-gray-600' : 'bg-white';
  const selectBorderClass = isDarkMode ? 'border-gray-500' : 'border-gray-300';
  const selectTextColorClass = isDarkMode ? 'text-white' : 'text-gray-800';
  const inputBgClass = isDarkMode ? 'bg-gray-700' : 'bg-white';
  const inputBorderClass = isDarkMode ? 'border-gray-600' : 'border-gray-300';
  const inputTextColorClass = isDarkMode ? 'text-white' : 'text-gray-900';

  // --- Fungsi untuk Modal ---
  const handleAddUser = (type) => {
    setUserTypeForModal(type);
    setSelectedUser({ name: '', email: '', role: type === 'admin' ? 'Admin' : 'Editor', company: type === 'staff' ? (selectedCompany !== 'Semua Perusahaan' ? selectedCompany : '') : '' });
    setIsAddUserModalOpen(true);
  };

  const handleEditUser = (user, type) => {
    setUserTypeForModal(type);
    setSelectedUser({ ...user }); // Buat salinan untuk diedit di modal
    setIsEditUserModalOpen(true);
  };

  const handleDeleteUser = (user, type) => {
    setUserTypeForModal(type);
    setSelectedUser(user);
    setIsDeleteUserModalOpen(true);
  };

  const handleSaveUser = () => {
    // Logika nyata: kirim data ke backend API untuk menambah/mengedit user
    console.log("Saving user:", selectedUser, "Type:", userTypeForModal);
    if (userTypeForModal === 'admin') {
      if (selectedUser.id) { // Edit user
        setAdminUsers(adminUsers.map(u => u.id === selectedUser.id ? selectedUser : u));
      } else { // Add new user
        setAdminUsers([...adminUsers, { ...selectedUser, id: adminUsers.length > 0 ? Math.max(...adminUsers.map(u => u.id)) + 1 : 1 }]);
      }
    } else if (userTypeForModal === 'staff') {
      if (selectedUser.id) { // Edit user
        setStaffUsers(staffUsers.map(u => u.id === selectedUser.id ? selectedUser : u));
      } else { // Add new user
        setStaffUsers([...staffUsers, { ...selectedUser, id: staffUsers.length > 0 ? Math.max(...staffUsers.map(u => u.id)) + 1 : 1 }]);
      }
    }
    setIsAddUserModalOpen(false);
    setIsEditUserModalOpen(false);
    setSelectedUser(null);
    setUserTypeForModal('');
  };

  const handleConfirmDelete = () => {
    // Logika nyata: kirim perintah hapus ke backend API
    console.log("Deleting user:", selectedUser, "Type:", userTypeForModal);
    if (userTypeForModal === 'admin') {
      setAdminUsers(adminUsers.filter(u => u.id !== selectedUser.id));
    } else if (userTypeForModal === 'staff') {
      setStaffUsers(staffUsers.filter(u => u.id !== selectedUser.id));
    }
    setIsDeleteUserModalOpen(false);
    setSelectedUser(null);
    setUserTypeForModal('');
  };

  // --- Fungsi Pencarian & Filter ---
  const filteredAdminUsers = useMemo(() => {
    return adminUsers.filter(user =>
      user.name.toLowerCase().includes(adminSearchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(adminSearchTerm.toLowerCase())
    );
  }, [adminUsers, adminSearchTerm]);

  const filteredStaffUsers = useMemo(() => {
    const searchFiltered = staffUsers.filter(user =>
      user.name.toLowerCase().includes(staffSearchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(staffSearchTerm.toLowerCase())
    );

    if (selectedCompany === 'Semua Perusahaan') {
      return searchFiltered;
    }
    return searchFiltered.filter(user => user.company === selectedCompany);
  }, [staffUsers, staffSearchTerm, selectedCompany]);

  // --- Fungsi Paginasi ---
  const getPaginatedUsers = (users, currentPage) => {
    const startIndex = (currentPage - 1) * usersPerPage;
    return users.slice(startIndex, startIndex + usersPerPage);
  };

  const paginatedAdminUsers = getPaginatedUsers(filteredAdminUsers, adminCurrentPage);
  const paginatedStaffUsers = getPaginatedUsers(filteredStaffUsers, staffCurrentPage);

  const totalAdminPages = Math.ceil(filteredAdminUsers.length / usersPerPage);
  const totalStaffPages = Math.ceil(filteredStaffUsers.length / usersPerPage);

  const renderPaginationButtons = (totalPages, currentPage, setPage) => (
    <div className="flex justify-center mt-4 space-x-2">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => setPage(i + 1)}
          className={`px-3 py-1 rounded-md transition duration-300
                      ${currentPage === i + 1 ? 'bg-blue-600 text-white' : (isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300')}`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );

  return (
    <div className="p-8">

      {/* Section: ADMIN */}
      <div className={`mb-8 p-6 rounded-lg shadow-lg ${contentSectionBgClass}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <UserIcon className={`w-6 h-6 mr-2 ${subtitleColorClass}`} />
            <h2 className={`text-xl font-semibold ${titleColorClass}`}>ADMIN</h2>
          </div>
          <button
            onClick={() => handleAddUser('admin')}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            <PlusCircleIcon className="w-5 h-5 mr-1" /> Add New Admin
          </button>
        </div>
        <h3 className={`text-lg font-medium mb-4 ${subtitleColorClass}`}>Admin Settings</h3>

        {/* Search Bar for Admin */}
        <div className="mb-4 relative">
          <input
            type="text"
            placeholder="Cari admin berdasarkan nama atau email..."
            value={adminSearchTerm}
            onChange={(e) => setAdminSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-md border ${inputBgClass} ${inputBorderClass} ${inputTextColorClass} focus:ring-blue-500 focus:border-blue-500`}
          />
          <MagnifyingGlassIcon className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${subtitleColorClass}`} />
        </div>

        {/* Tabel Admin */}
        <div className={`rounded-lg overflow-hidden ${isDarkMode ? 'border border-gray-600' : ''}`}>
          <table className={`min-w-full divide-y ${tableDivideColorClass}`}>
            <thead className={tableHeaderBgClass}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium ${tableHeaderTextColorClass} uppercase tracking-wider`}>No.</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${tableHeaderTextColorClass} uppercase tracking-wider`}>Nama</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${tableHeaderTextColorClass} uppercase tracking-wider`}>Email</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${tableHeaderTextColorClass} uppercase tracking-wider`}>Role</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${tableHeaderTextColorClass} uppercase tracking-wider`}>Aksi</th>
              </tr>
            </thead>
            <tbody className={`${tableRowBgClass} divide-y ${tableDivideColorClass}`}>
              {paginatedAdminUsers.length > 0 ? (
                paginatedAdminUsers.map((user) => (
                  <tr key={user.id} className={tableHoverClass}>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${tableRowTextColorClass}`}>{user.id}.</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${tableRowTextColorClass}`}>{user.name}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${tableRowTextColorClass}`}>{user.email}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${tableRowTextColorClass}`}>{user.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center space-x-2">
                      <button
                        onClick={() => handleEditUser(user, 'admin')}
                        className="text-yellow-600 hover:text-yellow-800"
                        title="Edit Admin"
                      >
                        <PencilSquareIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user, 'admin')}
                        className="text-red-600 hover:text-red-800"
                        title="Delete Admin"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className={`px-6 py-4 text-center ${tableRowTextColorClass}`}>Tidak ada data admin ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {renderPaginationButtons(totalAdminPages, adminCurrentPage, setAdminCurrentPage)}
      </div>

      {/* Section: STAFF */}
      <div className={`p-6 rounded-lg shadow-lg ${contentSectionBgClass}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <UserIcon className={`w-6 h-6 mr-2 ${subtitleColorClass}`} /> {/* Menggunakan ikon UserIcon untuk Staff juga */}
            <h2 className={`text-xl font-semibold ${titleColorClass}`}>STAFF</h2>
          </div>
          <button
            onClick={() => handleAddUser('staff')}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            <PlusCircleIcon className="w-5 h-5 mr-1" /> Add New Staff
          </button>
        </div>

        {/* Dropdown Anak Perusahaan & Search Bar for Staff */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
          <div className="flex items-center w-full md:w-auto">
            <FolderIcon className={`w-6 h-6 mr-2 ${subtitleColorClass}`} />
            <div className="relative inline-block w-full md:w-auto">
              <select
                className={`appearance-none rounded-md shadow-sm pl-3 pr-8 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 w-full
                            ${selectBgClass} ${selectBorderClass} ${selectTextColorClass}`}
                value={selectedCompany}
                onChange={(e) => {
                  setSelectedCompany(e.target.value);
                  setStaffCurrentPage(1); // Reset paginasi saat filter berubah
                }}
              >
                {companies.map(company => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <svg className={`fill-current h-4 w-4 ${selectTextColorClass}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9l4.5 4.5z"/></svg>
              </div>
            </div>
          </div>
          <div className="relative w-full md:flex-1">
            <input
              type="text"
              placeholder="Cari staff berdasarkan nama atau email..."
              value={staffSearchTerm}
              onChange={(e) => {
                setStaffSearchTerm(e.target.value);
                setStaffCurrentPage(1); // Reset paginasi saat search berubah
              }}
              className={`w-full pl-10 pr-4 py-2 rounded-md border ${inputBgClass} ${inputBorderClass} ${inputTextColorClass} focus:ring-blue-500 focus:border-blue-500`}
            />
            <MagnifyingGlassIcon className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${subtitleColorClass}`} />
          </div>
        </div>

        <h3 className={`text-lg font-medium mb-4 ${subtitleColorClass}`}>Staff Settings</h3>

        {/* Tabel Staff */}
        <div className={`rounded-lg overflow-hidden ${isDarkMode ? 'border border-gray-600' : ''}`}>
          <table className={`min-w-full divide-y ${tableDivideColorClass}`}>
            <thead className={tableHeaderBgClass}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium ${tableHeaderTextColorClass} uppercase tracking-wider`}>No.</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${tableHeaderTextColorClass} uppercase tracking-wider`}>Nama</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${tableHeaderTextColorClass} uppercase tracking-wider`}>Email</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${tableHeaderTextColorClass} uppercase tracking-wider`}>Perusahaan</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${tableHeaderTextColorClass} uppercase tracking-wider`}>Role</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${tableHeaderTextColorClass} uppercase tracking-wider`}>Aksi</th>
              </tr>
            </thead>
            <tbody className={`${tableRowBgClass} divide-y ${tableDivideColorClass}`}>
              {paginatedStaffUsers.length > 0 ? (
                paginatedStaffUsers.map((user) => (
                  <tr key={user.id} className={tableHoverClass}>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${tableRowTextColorClass}`}>{user.id}.</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${tableRowTextColorClass}`}>{user.name}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${tableRowTextColorClass}`}>{user.email}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${tableRowTextColorClass}`}>{user.company}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${tableRowTextColorClass}`}>{user.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center space-x-2">
                      <button
                        onClick={() => handleEditUser(user, 'staff')}
                        className="text-yellow-600 hover:text-yellow-800"
                        title="Edit Staff"
                      >
                        <PencilSquareIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user, 'staff')}
                        className="text-red-600 hover:text-red-800"
                        title="Delete Staff"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className={`px-6 py-4 text-center ${tableRowTextColorClass}`}>Tidak ada data staff ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {renderPaginationButtons(totalStaffPages, staffCurrentPage, setStaffCurrentPage)}
      </div>

      {/* Modal: Add/Edit User */}
      {(isAddUserModalOpen || isEditUserModalOpen) && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className={`${contentSectionBgClass} p-6 rounded-lg shadow-xl w-11/12 md:w-1/2 lg:w-1/3`}>
            <h3 className={`text-xl font-semibold mb-4 ${titleColorClass}`}>
              {isAddUserModalOpen ? `Tambah User ${userTypeForModal === 'admin' ? 'Admin' : 'Staff'} Baru` : `Edit User ${userTypeForModal === 'admin' ? 'Admin' : 'Staff'}`}
            </h3>
            <div className="mb-4">
              <label htmlFor="name" className={`block text-sm font-medium ${subtitleColorClass} mb-1`}>Nama:</label>
              <input
                type="text"
                id="name"
                value={selectedUser.name}
                onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                           ${inputBgClass} ${inputBorderClass} ${inputTextColorClass}`}
                placeholder="Masukkan nama"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className={`block text-sm font-medium ${subtitleColorClass} mb-1`}>Email:</label>
              <input
                type="email"
                id="email"
                value={selectedUser.email}
                onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                           ${inputBgClass} ${inputBorderClass} ${inputTextColorClass}`}
                placeholder="Masukkan email"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="role" className={`block text-sm font-medium ${subtitleColorClass} mb-1`}>Role:</label>
              <select
                id="role"
                value={selectedUser.role}
                onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                           ${selectBgClass} ${selectBorderClass} ${selectTextColorClass}`}
              >
                {userTypeForModal === 'admin' ? (
                  <>
                    <option value="Super Admin">Super Admin</option>
                    <option value="Admin">Admin</option>
                  </>
                ) : (
                  <>
                    <option value="Editor">Editor</option>
                    <option value="Moderator">Moderator</option>
                    <option value="Viewer">Viewer</option>
                  </>
                )}
              </select>
            </div>
            {userTypeForModal === 'staff' && (
              <div className="mb-4">
                <label htmlFor="company" className={`block text-sm font-medium ${subtitleColorClass} mb-1`}>Perusahaan:</label>
                <select
                  id="company"
                  value={selectedUser.company}
                  onChange={(e) => setSelectedUser({ ...selectedUser, company: e.target.value })}
                  className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                             ${selectBgClass} ${selectBorderClass} ${selectTextColorClass}`}
                >
                  {companies.filter(c => c !== 'Semua Perusahaan').map(company => ( // Jangan tampilkan "Semua Perusahaan" di form
                    <option key={company} value={company}>{company}</option>
                  ))}
                </select>
              </div>
            )}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setIsAddUserModalOpen(false);
                  setIsEditUserModalOpen(false);
                  setSelectedUser(null);
                  setUserTypeForModal('');
                }}
                className={`py-2 px-4 rounded-md transition duration-300
                           ${isDarkMode ? 'bg-gray-600 hover:bg-gray-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
              >
                Batal
              </button>
              <button
                onClick={handleSaveUser}
                className={`py-2 px-4 rounded-md transition duration-300 text-white
                           ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}`}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Delete User Confirmation */}
      {isDeleteUserModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className={`${contentSectionBgClass} p-6 rounded-lg shadow-xl w-11/12 md:w-1/3`}>
            <h3 className={`text-xl font-semibold mb-4 ${titleColorClass}`}>Konfirmasi Hapus User</h3>
            <p className={`${subtitleColorClass} mb-6`}>
              Apakah Anda yakin ingin menghapus user **{selectedUser.name} ({selectedUser.email})** dari {userTypeForModal === 'admin' ? 'daftar Admin' : 'daftar Staff'}?
              Aksi ini tidak dapat dibatalkan.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsDeleteUserModalOpen(false);
                  setSelectedUser(null);
                  setUserTypeForModal('');
                }}
                className={`py-2 px-4 rounded-md transition duration-300
                           ${isDarkMode ? 'bg-gray-600 hover:bg-gray-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
              >
                Batal
              </button>
              <button
                onClick={handleConfirmDelete}
                className={`py-2 px-4 rounded-md transition duration-300 text-white
                           bg-red-600 hover:bg-red-700`}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;