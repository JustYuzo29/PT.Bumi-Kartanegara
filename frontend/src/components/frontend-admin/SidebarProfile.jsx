import React from "react";

// Ambil data user dari localStorage (atau props/context jika sudah ada auth)
function getUserInfo() {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.name && user.email) return user;
  } catch {}
  return { name: "ADMIN", email: "admin@gmail.com" };
}

const SidebarProfile = () => {
  const { name, email } = getUserInfo();
  return (
    <div className="text-center mt-10 px-4">
      <div className="w-24 h-24 rounded-full bg-[var(--color-midnight)] mx-auto" />
      <p className="mt-4 text-xs font-semibold uppercase tracking-wider">
        Selamat Datang
      </p>
      <p className="text-base font-bold">{name}</p>
      <p className="text-sm">{email}</p>
      {/* Dropdown Admin hanya mobile */}
      <div className="mt-4 md:hidden">
        <select
          className="
            w-full h-10 px-3 rounded-md text-sm outline-none
            bg-white text-black border border-gray-300
            dark:bg-[var(--color-ocean)] dark:text-white dark:border-transparent
          "
          defaultValue="Admin"
        >
          <option>Admin</option>
          <option>Superadmin</option>
        </select>
      </div>
    </div>
  );
};

export default SidebarProfile;
