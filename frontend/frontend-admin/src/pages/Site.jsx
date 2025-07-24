// src/pages/Site.jsx
import React, { useState } from "react";
import SiteVisitButton from "../components/site/SiteVisitButton";
import SiteMetrics from "../components/site/SiteMetrics";
import SiteUpdateTable from "../components/site/SiteUpdateTable";
import SiteUpdateModal from "../components/site/SiteUpdateModal";

const Site = () => {
  const [updates, setUpdates] = useState([
    {
      text: "Jika Kau Bertemu aku begini",
      datetime: "15-08-2025/14.00",
      editedBy: "Jeki",
    },
    {
      text: "Aku tak kau anggap pada cerita",
      datetime: "15-08-2025/14.00",
      editedBy: "Rehan",
    },
  ]);

  const keyMetrics = [
    {
      title: "Pengunjung Hari Ini",
      value: "1.250",
      trend: "+15%",
      trendColor: "text-green-500",
      description: "dari kemarin",
    },
    {
      title: "Postingan Aktif",
      value: "85",
      trend: "Stabil",
      trendColor: "text-gray-500",
      description: "minggu ini",
    },
    {
      title: "Komentar Baru",
      value: "12",
      trend: "-5%",
      trendColor: "text-red-500",
      description: "dari kemarin",
    },
    {
      title: "Postingan Terpopuler",
      value: "Judul Postingan Teratas Ini",
      trend: "5.2K views",
      trendColor: "text-blue-500",
      description: "",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState("");

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditedText(updates[index].text);
    setIsModalOpen(true);
  };

  const handleSaveEdit = () => {
    const updated = [...updates];
    updated[editingIndex].text = editedText;
    setUpdates(updated);
    setIsModalOpen(false);
    setEditingIndex(null);
    setEditedText("");
  };

  return (
    <div className="space-y-10">
      <SiteVisitButton />
      <SiteMetrics metrics={keyMetrics} />
      <SiteUpdateTable updates={updates} onEdit={handleEditClick} />
      <SiteUpdateModal
        isOpen={isModalOpen}
        editedText={editedText}
        onChange={(e) => setEditedText(e.target.value)}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default Site;
