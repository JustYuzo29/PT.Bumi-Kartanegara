import React, { useState } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  BuildingOffice2Icon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";

const UserFormModal = ({ isOpen, onClose, user, onSave }) => {
  const [formData, setFormData] = useState(user || { id: null, name: "", email: "" });
  const [errors, setErrors] = useState({});

  React.useEffect(() => {
    setFormData(user || { id: null, name: "", email: "" });
    setErrors({});
  }, [user, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Nama tidak boleh kosong.";
    if (!formData.email.trim()) {
      newErrors.email = "Email tidak boleh kosong.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-ocean)] p-8 rounded-xl shadow-2xl w-full max-w-md relative">
        <h2 className="text-2xl font-bold mb-6 text-[var(--color-navy)] dark:text-white">
          {user ? "Edit Pengguna" : "Tambah Pengguna Baru"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[var(--color-carbon)] dark:text-white mb-1"
            >
              Nama
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring focus:ring-opacity-50 ${
                errors.name
                  ? "border-red-500"
                  : "border-[var(--color-snow)] dark:border-[var(--color-midnight)] bg-[var(--color-snow)] dark:bg-[var(--color-midnight)] text-[var(--color-navy)] dark:text-white"
              }`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[var(--color-carbon)] dark:text-white mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring focus:ring-opacity-50 ${
                errors.email
                  ? "border-red-500"
                  : "border-[var(--color-snow)] dark:border-[var(--color-midnight)] bg-[var(--color-snow)] dark:bg-[var(--color-midnight)] text-[var(--color-navy)] dark:text-white"
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[var(--color-carbon)] text-white rounded-md hover:bg-[var(--color-navy)] transition-colors duration-200"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[var(--color-navy)] text-white rounded-md hover:bg-[var(--color-ocean)] transition-colors duration-200"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const User = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Alice Smith", email: "alice@example.com" },
    { id: 2, name: "Bob Johnson", email: "bob@example.com" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  ]);

  const [selectedCompanyType, setSelectedCompanyType] = useState("Perusahaan Induk");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (userId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
      setUsers(users.filter((user) => user.id !== userId));
      alert("Pengguna berhasil dihapus!");
    }
  };

  const handleAddUser = () => {
    setCurrentUser(null);
    setIsModalOpen(true);
  };

  const handleSaveUser = (userData) => {
    if (userData.id) {
      setUsers(users.map((u) => (u.id === userData.id ? userData : u)));
      alert("Pengguna berhasil diperbarui!");
    } else {
      const newId = Math.max(...users.map((u) => u.id)) + 1;
      setUsers([...users, { ...userData, id: newId }]);
      alert("Pengguna baru berhasil ditambahkan!");
    }
  };

  const handleCompanyTypeChange = (e) => {
    setSelectedCompanyType(e.target.value);
  };

  return (
    <div className="space-y-12 w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
      {/* ADMIN */}
      <h1 className="text-2xl font-extrabold mb-4 text-[var(--color-navy)] dark:text-white">
        ADMIN
      </h1>

      <div className="bg-[var(--color-white)] dark:bg-[var(--color-ocean)] rounded-xl shadow-lg px-6 pb-8 pt-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[var(--color-navy)] dark:text-white">
            Pengaturan Admin
          </h2>
          <button
            onClick={handleAddUser}
            className="flex items-center space-x-2 px-4 py-2 bg-[var(--color-navy)] text-white rounded-md hover:bg-[var(--color-ocean)] transition-colors duration-200 shadow-md"
          >
            <PlusCircleIcon className="h-5 w-5" />
            <span>Tambah Pengguna</span>
          </button>
        </div>
        <p className="text-sm mb-4 text-[var(--color-carbon)] dark:text-white">
          Berikut adalah beberapa pengaturan yang dapat dilakukan oleh admin untuk mengelola situs ini.
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-[var(--color-navy)] dark:text-white font-semibold border-b border-[var(--color-carbon)] dark:border-white">
                <th className="py-2 px-4">No.</th>
                <th className="py-2 px-4">Nama</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-[var(--color-carbon)] dark:text-white">
              {users.map((user, idx) => (
                <tr
                  key={user.id}
                  className="bg-[var(--color-snow)] dark:bg-[var(--color-midnight)] rounded-lg shadow"
                >
                  <td className="py-2 px-4">{idx + 1}.</td>
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4 space-x-2">
                    <PencilSquareIcon
                      className="h-5 w-5 inline-block text-yellow-400 hover:text-yellow-500 cursor-pointer"
                      onClick={() => handleEdit(user)}
                    />
                    <TrashIcon
                      className="h-5 w-5 inline-block text-red-500 hover:text-red-600 cursor-pointer"
                      onClick={() => handleDelete(user.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* STAFF */}
      <h1 className="text-2xl font-extrabold mb-4 text-[var(--color-navy)] dark:text-white">
        STAFF
      </h1>

      <div className="flex items-center gap-3 mb-4">
        <BuildingOffice2Icon className="h-6 w-6 text-[var(--color-navy)] dark:text-white" />
        <div className="relative inline-block">
          <select
            className="dropdown-select"
            value={selectedCompanyType}
            onChange={handleCompanyTypeChange}
          >
            <option value="Perusahaan Induk">Perusahaan Induk</option>
            <option value="Perusahaan Anak">Perusahaan Anak</option>
          </select>
          <div className="dropdown-arrow">
            <svg
              className="w-4 h-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.08z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-[var(--color-white)] dark:bg-[var(--color-ocean)] rounded-xl shadow-lg px-6 pb-8 pt-4">
        <h2 className="text-xl font-bold text-[var(--color-navy)] dark:text-white mb-2">
          Pengaturan Staff
        </h2>
        <p className="text-sm mb-4 text-[var(--color-carbon)] dark:text-white">
          Berikut adalah beberapa pengaturan yang dapat dilakukan oleh admin untuk mengelola staff.
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-[var(--color-navy)] dark:text-white font-semibold border-b border-[var(--color-carbon)] dark:border-white">
                <th className="py-2 px-4">No.</th>
                <th className="py-2 px-4">Nama</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-[var(--color-carbon)] dark:text-white">
              {users
                .filter((u) => u.id % 2 === 0) // contoh filter
                .map((user, idx) => (
                  <tr
                    key={user.id}
                    className="bg-[var(--color-snow)] dark:bg-[var(--color-midnight)] rounded-lg shadow"
                  >
                    <td className="py-2 px-4">{idx + 1}.</td>
                    <td className="py-2 px-4">{user.name}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4 space-x-2">
                      <PencilSquareIcon
                        className="h-5 w-5 inline-block text-yellow-400 hover:text-yellow-500 cursor-pointer"
                        onClick={() => handleEdit(user)}
                      />
                      <TrashIcon
                        className="h-5 w-5 inline-block text-red-500 hover:text-red-600 cursor-pointer"
                        onClick={() => handleDelete(user.id)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <UserFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={currentUser}
        onSave={handleSaveUser}
      />
    </div>
  );
};

export default User;
