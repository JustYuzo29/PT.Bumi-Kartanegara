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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [visiblePasswords, setVisiblePasswords] = useState({});

  const fetchUsers = async () => {
    const res = await api.get("users/");
    // HANYA ambil field aman
    const cleanedUsers = res.data.map(({ id, name, email, tipe }) => ({
      id,
      name,
      email,
      tipe,
    }));
    setUsers(cleanedUsers.filter(u => u.tipe === "admin"));
    setStaffUsers(cleanedUsers.filter(u => u.tipe === "staff"));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    // Tidak sertakan password
    setCurrentUser({
      id: user.id,
      name: user.name,
      email: user.email,
      tipe: user.tipe,
      password: "",
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Yakin ingin menghapus?")) return;
    try {
      await api.delete(`users/${userId}/`);
      await fetchUsers();
      alert("Berhasil dihapus!");
    } catch (err) {
      console.error("Gagal hapus:", err);
      alert("Gagal menghapus user.");
    }
  };

  const handleAddUser = () => {
    setCurrentUser({
      id: null,
      name: "",
      email: "",
      tipe: "admin",
      password: "",
    });
    setIsModalOpen(true);
  };

  const handleAddStaff = () => {
    setCurrentUser({
      id: null,
      name: "",
      email: "",
      tipe: "staff",
      password: "",
    });
    setIsModalOpen(true);
  };

  const handleSaveUser = async (userData) => {
    try {
      if (userData.id) {
        await api.put(`users/${userData.id}/`, userData);
      } else {
        await api.post("users/", userData);
      }
      await fetchUsers();
      alert("Berhasil disimpan!");
    } catch (err) {
      console.error("Gagal simpan:", err);
      alert("Gagal menyimpan user.");
    }
  };

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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
