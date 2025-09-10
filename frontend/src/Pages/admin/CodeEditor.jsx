
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/api";

const FILE_LABELS = {
  admin: "Admin Site",
  staff: "Staff Site",
  blog: "Blog Site",
};


const CodeEditor = () => {
  const { fileKey } = useParams();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    api.get(`/edit-code/?file=${fileKey}`)
      .then(res => {
        setContent(res.data.content);
        setError("");
      })
      .catch(() => setError("Gagal memuat kode."))
      .finally(() => setLoading(false));
  }, [fileKey]);

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      await api.post("/edit-code/", { file: fileKey, content });
      alert("Berhasil disimpan!");
    } catch {
      setError("Gagal menyimpan kode.");
    }
    setSaving(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="font-bold text-lg mb-2">Edit File Python: {FILE_LABELS[fileKey] || fileKey}</h2>
      {loading ? (
        <div>Memuat...</div>
      ) : (
        <>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={24}
            className="w-full font-mono bg-gray-100 text-black p-2 rounded border border-gray-300"
            style={{ color: '#222' }}
          />
          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
          >
            {saving ? "Menyimpan..." : "Simpan"}
          </button>
          {error && <div className="text-red-600 mt-2">{error}</div>}
        </>
      )}
    </div>
  );
};

export default CodeEditor;
