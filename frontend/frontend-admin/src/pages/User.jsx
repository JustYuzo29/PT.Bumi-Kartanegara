// src/pages/User.jsx
import React, { useState, useEffect } from "react";
import { api } from "../lib/api";
import {
  PlusCircleIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/solid";

import SectionTitle from "../components/user/SectionTitle";
import AddButton from "../components/user/AddButton";
import SectionCard from "../components/user/SectionCard";
import UserTable from "../components/user/UserTable";
import UserFormModal from "../components/user/UserFormModal";

const User = () => {
  const [users, setUsers] = useState([]);
  const [staffUsers, setStaffUsers] = useState([]);
  const [selectedCompanyType, setSelectedCompanyType] = useState("Perusahaan Induk");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [visiblePasswords, setVisiblePasswords] = useState({});

  const fetchUsers = async () => {
    try {
      const res = await api.get("dummy-users/");
      const allUsers = res.data;
      setUsers(allUsers.filter(u => u.tipe === 'admin'));
      setStaffUsers(allUsers.filter(u => u.tipe === 'staff_induk'));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Yakin ingin menghapus?")) return;
    try {
      await api.delete(`dummy-users/${userId}/`);
      await fetchUsers();
      alert("Berhasil dihapus!");
    } catch (err) {
      console.error("Gagal hapus:", err);
      alert("Gagal menghapus user.");
    }
  };

  const handleAddUser = () => {
    setCurrentUser({ tipe: "admin" });
    setIsModalOpen(true);
  };

  const handleAddStaff = () => {
    setCurrentUser({ tipe: "staff_induk" });
    setIsModalOpen(true);
  };

  const handleSaveUser = async (userData) => {
    try {
      if (userData.id) {
        await api.put(`dummy-users/${userData.id}/`, userData);
      } else {
        await api.post("dummy-users/", userData);
      }
      await fetchUsers();
      alert("Berhasil disimpan!");
    } catch (err) {
      console.error("Gagal simpan:", err);
      alert("Gagal menyimpan user.");
    }
  };

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-12 w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
      <SectionTitle icon={PlusCircleIcon} title="ADMIN" />
      <SectionCard>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[var(--color-navy)] dark:text-white">Pengaturan Admin</h2>
          <AddButton label="Tambah Admin" onClick={handleAddUser} />
        </div>
        <UserTable
          title="Admin"
          users={users}
          onEdit={handleEdit}
          onDelete={handleDelete}
          visiblePasswords={visiblePasswords}
          togglePasswordVisibility={togglePasswordVisibility}
        />
      </SectionCard>

      <SectionTitle icon={BuildingOffice2Icon} title="STAFF PERUSAHAAN" />
      <SectionCard>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[var(--color-navy)] dark:text-white">Pengaturan Staff</h2>
          <AddButton label="Tambah Staff" onClick={handleAddStaff} />
        </div>
        <UserTable
          title="Staff"
          users={staffUsers}
          onEdit={handleEdit}
          onDelete={handleDelete}
          visiblePasswords={visiblePasswords}
          togglePasswordVisibility={togglePasswordVisibility}
        />
      </SectionCard>

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