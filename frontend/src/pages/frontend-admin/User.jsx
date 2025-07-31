// src/pages/User.jsx
import React, { useState, useEffect } from "react";
import { api } from "../lib/api";
import { PlusCircleIcon, BuildingOffice2Icon } from "@heroicons/react/24/solid";

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
  // Removed visiblePasswords state as password visibility is now handled within UserFormModal
  // const [visiblePasswords, setVisiblePasswords] = useState({});

  const fetchUsers = async () => {
    try {
      const res = await api.get("users/");
      console.log("API RESPONSE:", res.data); // Debug

      let data = [];
      if (Array.isArray(res.data)) {
        data = res.data;
      } else if (Array.isArray(res.data.results)) {
        data = res.data.results;
      } else if (
        res.data &&
        typeof res.data === 'object' &&
        Object.keys(res.data).length > 0
      ) {
        // fallback: treat object as single user (for detail endpoint)
        data = [res.data];
      }

      const cleanedUsers = data.map(({ id, name, email, tipe }) => ({
        id,
        name,
        email,
        tipe: tipe?.toLowerCase(),
      }));

      setUsers(cleanedUsers.filter((u) => u.tipe === "admin"));
      setStaffUsers(cleanedUsers.filter((u) => u.tipe === "staff"));
    } catch (error) {
      console.error("Failed to fetch users:", error);
      alert("Failed to load user data.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    // Do NOT include password or current_password in currentUser when editing
    // The form modal will handle these fields separately for updates.
    setCurrentUser({
      id: user.id,
      name: user.name,
      email: user.email,
      tipe: user.tipe,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (userId) => {
    // Replaced window.confirm with a custom modal or message box for better UX and consistency
    // However, for this example, keeping window.confirm as per previous code, but noting the best practice.
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`users/${userId}/`);
      await fetchUsers();
      alert("User successfully deleted!");
    } catch (err) {
      console.error("Failed to delete user:", err);
      // More specific error message if available from backend
      if (err.response && err.response.data && err.response.data.detail) {
        alert(`Failed to delete user: ${err.response.data.detail}`);
      } else {
        alert("Failed to delete user.");
      }
    }
  };

  const handleAddUser = () => {
    setCurrentUser({
      id: null,
      name: "",
      email: "",
      tipe: "admin", // Default type for adding admin
      // No password field here, it's handled by UserFormModal
    });
    setIsModalOpen(true);
  };

  const handleAddStaff = () => {
    setCurrentUser({
      id: null,
      name: "",
      email: "",
      tipe: "staff", // Default type for adding staff
      // No password field here, it's handled by UserFormModal
    });
    setIsModalOpen(true);
  };

  const handleSaveUser = async (userData) => {
    try {
      if (userData.id) {
        // Build a safe payload for updating an existing user
        const payload = {
          name: userData.name,
          email: userData.email,
          tipe: userData.tipe,
        };

        // Only include current_password & new_password if new_password is provided
        if (userData.new_password) {
          payload.current_password = userData.current_password;
          payload.new_password = userData.new_password;
        }

        await api.put(`users/${userData.id}/`, payload);
      } else {
        // For adding a new user, send the new_password (which is `new_password` on the backend for creation)
        await api.post("users/", {
          name: userData.name,
          email: userData.email,
          tipe: userData.tipe,
          new_password: userData.new_password,
        });
      }

      await fetchUsers();
      alert("User successfully saved!");
    } catch (err) {
      if (err.response) {
        console.error("DETAILED ERROR RESPONSE:", err.response.data);
        // Display specific error messages from the backend
        let errorMessage = "An error occurred.";
        if (typeof err.response.data === 'object') {
          // Flatten error messages if they are nested objects/arrays
          errorMessage = Object.values(err.response.data).flat().join('\n');
        } else if (err.response.data) {
          errorMessage = err.response.data;
        }
        alert(`Error: ${errorMessage}`);
      } else {
        console.error("Failed to save user:", err);
        alert("An unexpected error occurred (frontend/backend issue).");
      }
    }
  };

  // The togglePasswordVisibility function is no longer needed here
  // as password visibility is managed directly within UserFormModal.
  // const togglePasswordVisibility = (id) => {
  //   setVisiblePasswords((prev) => ({
  //     ...prev,
  //     [id]: !prev[id],
  //   }));
  // };

  return (
    <div className="space-y-12 w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
      <SectionTitle icon={PlusCircleIcon} title="ADMIN" />
      <SectionCard>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[var(--color-navy)] dark:text-white">
            Admin Settings
          </h2>
          <AddButton label="Add Admin" onClick={handleAddUser} />
        </div>
      <UserTable
        title="Admin"
        users={Array.isArray(users) ? users : []}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      </SectionCard>

      <SectionTitle icon={BuildingOffice2Icon} title="COMPANY STAFF" />
      <SectionCard>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[var(--color-navy)] dark:text-white">
            Staff Settings
          </h2>
          <AddButton label="Add Staff" onClick={handleAddStaff} />
        </div>
      <UserTable
        title="Staff"
        users={Array.isArray(staffUsers) ? staffUsers : []}
        onEdit={handleEdit}
        onDelete={handleDelete}
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
