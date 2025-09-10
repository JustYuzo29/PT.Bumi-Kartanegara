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
    // Fetch updates
    fetch("http://localhost:8000/api/updates/")
      .then((res) => res.json())
      .then((data) => setUpdates(data))
      .catch(() => setUpdates([]));

    // Fetch metrics
    fetch("http://localhost:8000/api/metrics/")
      .then((res) => res.json())
      .then((data) => setKeyMetrics(data))
      .catch(() => setKeyMetrics([]));
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
    // Update ke backend
    const updateId = updates[editingIndex]?.id;
    fetch(`http://localhost:8000/api/updates/${updateId}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: editedText }),
    })
      .then(() => {
        const updated = [...updates];
        updated[editingIndex].text = editedText;
        setUpdates(updated);
        setIsModalOpen(false);
        setEditingIndex(null);
        setEditedText("");
      });
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
