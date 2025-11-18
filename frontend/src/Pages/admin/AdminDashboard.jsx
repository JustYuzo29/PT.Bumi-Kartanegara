// src/pages/Site.jsx
import React, { useState, useEffect } from "react";
import SiteVisitButton from "../../components/admin/site/SiteVisitButton";
import SiteMetrics from "../../components/admin/site/SiteMetrics";
import SiteUpdateTable from "../../components/admin/site/SiteUpdateTable";
import SiteUpdateModal from "../../components/admin/site/SiteUpdateModal";

const Site = () => {
  const [updates, setUpdates] = useState([]);
  const [keyMetrics, setKeyMetrics] = useState([]);

  useEffect(() => {
    // Mock data - tidak menggunakan backend
    const mockUpdates = [
      { id: 1, text: "Website update v2.0 released", date: "2025-11-15" },
      { id: 2, text: "New dashboard features added", date: "2025-11-10" },
      { id: 3, text: "Performance improvements", date: "2025-11-05" },
    ];
    const mockMetrics = [
      { label: "Total Users", value: 1250 },
      { label: "Active Projects", value: 42 },
      { label: "Total Revenue", value: "Rp 500M" },
    ];
    setUpdates(mockUpdates);
    setKeyMetrics(mockMetrics);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState("");

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditedText(updates[index].text);
    setIsModalOpen(true);
  };

  const handleSaveEdit = () => {
    // Mock update - hanya update state lokal
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
