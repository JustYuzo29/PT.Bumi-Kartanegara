import React, { useState, useEffect } from "react";
import axios from "axios";

const fields = [
  { key: "description", label: "Description" },
  { key: "vision", label: "Vision" },
  { key: "mission", label: "Mission" },
  { key: "history", label: "History" },
];

const AboutUsSection = ({ token, companyId }) => {
  const [data, setData] = useState(null);
  const [edit, setEdit] = useState(null); // {key, value}
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Ambil data from backend saat mount
  useEffect(() => {
    if (!token || !companyId) return;
    setLoading(true);
    axios
      .get(`/api/about-us/?company_id=${companyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        setData(res.data.results?.[0] || res.data); // tergantung response DRF
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token, companyId]);

  // Simpan perubahan ke backend
  const handleSave = async (fieldKey, value) => {
    if (!data) return;
    setSaving(true);
    try {
      await axios.patch(
        `/api/about-us/${data.id}/`,
        { [fieldKey]: value },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setData(prev => ({ ...prev, [fieldKey]: value }));
      setEdit(null);
    } catch (err) {
      // handle error (optional: show toast)
      console.error('Failed to save about us data:', err);
    }
    setSaving(false);
  };

  if (loading) return <div>Loading About Us...</div>;

  return (
    <section className="mb-10">
      <div className="flex items-center gap-2 pl-3 mb-4">
        <h2 className="text-lg font-bold text-[var(--color-button-blue)] dark:text-white tracking-wide">
          ABOUT US
        </h2>
      </div>
      <div className="space-y-4">
        {fields.map(({ key, label }) => (
          <div key={key} className="bg-white dark:bg-[var(--color-card-secondary)] border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="flex items-start justify-between gap-2 mb-1">
              <span className="font-semibold text-[var(--color-button-blue)] dark:text-white">{label}</span>
              {!edit && (
                <button
                  onClick={() => setEdit({ key, value: data?.[key] || "" })}
                  className="text-xs px-2 py-0.5 rounded bg-[var(--color-accent)] text-white hover:bg-[var(--color-button-blue)]"
                >
                  Edit
                </button>
              )}
            </div>
            {edit && edit.key === key ? (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleSave(key, edit.value);
                }}
              >
                <textarea
                  className="w-full rounded border border-gray-300 p-2 mb-2 text-sm"
                  rows={4}
                  value={edit.value}
                  onChange={e => setEdit({ key, value: e.target.value })}
                  disabled={saving}
                />
                <div className="flex gap-2">
                  <button type="submit" className="px-3 py-1 rounded bg-[var(--color-button-blue)] text-white text-xs" disabled={saving}>
                    {saving ? "Saving..." : "Save"}
                  </button>
                  <button type="button" onClick={() => setEdit(null)} className="px-3 py-1 rounded bg-gray-300 text-xs">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <p className="text-sm text-gray-700 dark:text-white/80 whitespace-pre-line">{data?.[key] || <span className="italic text-gray-400">Belum ada {label}</span>}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutUsSection;
