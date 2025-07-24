// components/user/UserFormModal.jsx
import React, { useState, useEffect } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const UserFormModal = ({ isOpen, onClose, user, onSave }) => {
  const [formData, setFormData] = useState(user || { id: null, name: "", email: "", tipe: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setFormData(user || { id: null, name: "", email: "", tipe: "", password: "" });
    setErrors({});
    setShowPassword(false);
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
    if (!formData.id || (formData.id && formData.password.trim())) {
      if (!formData.password.trim()) {
        newErrors.password = "Password tidak boleh kosong.";
      }
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
    <div className="fixed inset-0 bg-black/50 dark:bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-ocean)] p-8 rounded-xl shadow-2xl w-full max-w-md relative">
        <h2 className="text-2xl font-bold mb-6 text-[var(--color-navy)] dark:text-white">
          {user && user.id ? "Edit Pengguna" : `Tambah ${user?.tipe === 'admin' ? 'Admin Baru' : 'Staff Baru'}`}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[var(--color-carbon)] dark:text-white mb-1">
              Nama
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring focus:ring-opacity-50 ${
                errors.name ? "border-red-500" : "border-[var(--color-snow)] dark:border-[var(--color-midnight)] bg-[var(--color-snow)] dark:bg-[var(--color-midnight)] text-[var(--color-navy)] dark:text-white"
              }`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[var(--color-carbon)] dark:text-white mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring focus:ring-opacity-50 ${
                errors.email ? "border-red-500" : "border-[var(--color-snow)] dark:border-[var(--color-midnight)] bg-[var(--color-snow)] dark:bg-[var(--color-midnight)] text-[var(--color-navy)] dark:text-white"
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[var(--color-carbon)] dark:text-white mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full p-2 pr-10 border rounded-md focus:ring focus:ring-opacity-50 ${
                  errors.password ? "border-red-500" : "border-[var(--color-snow)] dark:border-[var(--color-midnight)] bg-[var(--color-snow)] dark:bg-[var(--color-midnight)] text-[var(--color-navy)] dark:text-white"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 flex items-center text-sm text-[var(--color-carbon)] dark:text-white"
                aria-label={showPassword ? "Sembunyikan Password" : "Lihat Password"}
              >
                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
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

export default UserFormModal;