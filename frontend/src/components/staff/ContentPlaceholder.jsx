import React, { useState, useEffect } from "react";
import MediaButton from "./Media/MediaButton";
import { homeContentAPI } from "../../lib/apiSelector";

// Komponen untuk bagian footer kartu yang berisi tombol aksi.
const CardActionFooter = ({ onSave, onDelete, saving = false }) => (
  <div className="flex space-x-2 mt-4">
    <button 
      onClick={onSave}
      disabled={saving}
      className="btn-primary disabled:opacity-50"
    >
      {saving ? 'Saving...' : 'Simpan'}
    </button>
    <button 
      onClick={onDelete}
      className="btn-danger"
    >
      Hapus
    </button>
  </div>
);

// Komponen kartu utama yang lebih generik.
const ContentCard = ({ title, description, bgColor = "bg-white", children }) => (
  <div className={`relative w-full card-base overflow-hidden mb-6 ${bgColor}`}>
    {/* Garis aksen kiri kartu: primary-accent (FCA311) */}
    <div className="absolute w-[13px] h-full top-0 left-0 bg-primary-accent"></div>
    {/* Teks di dalam kartu: text-on-light-bg (14213D) */}
    <div className="p-4 pl-8 text-text-on-light-bg">
      <h3 className="text-lg font-heading font-bold text-text-on-light-bg mb-1">{title}</h3>
      {description && <p className="text-subtle-dark text-text-on-light-bg mb-4">{description}</p>}
      {children}
    </div>
  </div>
);

// Komponen untuk me-render konten di dalam kartu berdasarkan tipenya.
const CardContent = ({ 
  type, 
  placeholder, 
  initialValue, 
  content,
  onContentChange,
  onSave,
  onDelete
}) => {
  const [saving, setSaving] = useState(false);
  const [value, setValue] = useState(initialValue || content?.value || '');
  const [selectedMedia, setSelectedMedia] = useState(content?.media || null);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave({ value, media: selectedMedia });
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setSaving(false);
    }
  };

  switch (type) {
    case 'file':
      return (
        <>
          <div className="mb-4">
            <MediaButton
              selectedMedia={selectedMedia}
              onMediaSelect={setSelectedMedia}
              onMediaRemove={() => setSelectedMedia(null)}
              fileTypes={['image']}
              buttonText="Choose Image"
              showPreview={true}
            />
          </div>
          <CardActionFooter onSave={handleSave} onDelete={onDelete} saving={saving} />
        </>
      );
    case 'textarea':
      return (
        <>
          <textarea 
            className="w-full p-2 input-field-light-bg mb-2" 
            rows="2" 
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <CardActionFooter onSave={handleSave} onDelete={onDelete} saving={saving} />
        </>
      );
    case 'text-input':
      return (
        <>
          <input 
            type="text" 
            placeholder={placeholder} 
            className="w-full p-2 input-field-light-bg mb-2"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <CardActionFooter onSave={handleSave} onDelete={onDelete} saving={saving} />
        </>
      );
    default:
      return null;
  }
};

// Konfigurasi data untuk semua kartu.
const contentConfig = [
  {
    section: 'BANNER CONTENT',
    cards: [
      { 
        id: 'banner', 
        title: 'Banner', 
        description: 'Upload banner image for the homepage', 
        bgColor: 'bg-white', 
        contentType: 'file'
      },
      { 
        id: 'title', 
        title: 'Title', 
        description: 'Main heading for the banner section', 
        bgColor: 'bg-card-secondary-bg', 
        contentType: 'textarea', 
        placeholder: 'Enter banner title...' 
      },
      { 
        id: 'text', 
        title: 'Text', 
        description: 'Description text for the banner', 
        bgColor: 'bg-card-secondary-bg', 
        contentType: 'textarea', 
        placeholder: 'Enter banner description...' 
      },
      { 
        id: 'button-link', 
        title: 'Button Link', 
        description: 'Call-to-action button URL', 
        bgColor: 'bg-white', 
        contentType: 'text-input', 
        placeholder: 'https://yourlink.com' 
      }
    ]
  }
];

// Komponen utama yang sekarang terhubung ke API
export const ContentPlaceholder = () => {
  const [contentData, setContentData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load existing content from API
  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setLoading(true);
    try {
      // Load banner content
      const bannerData = await homeContentAPI.getAll();
      if (bannerData.results && bannerData.results.length > 0) {
        const banner = bannerData.results[0];
        setContentData({
          banner: { media: banner.image_path ? { file_url: banner.image_path } : null },
          title: { value: banner.title || '' },
          text: { value: banner.description || '' },
          'button-link': { value: '' } // This would need to be added to the model
        });
      }
    } catch (err) {
      setError('Failed to load content');
      console.error('Content load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleContentSave = async (cardId, newContent) => {
    try {
      // Update local state immediately
      setContentData(prev => ({
        ...prev,
        [cardId]: newContent
      }));

      // Save to API based on content type
      if (cardId === 'banner' || cardId === 'title' || cardId === 'text') {
        const homeContentData = {
          title: contentData.title?.value || '',
          description: contentData.text?.value || '',
          image_path: contentData.banner?.media?.file_url || '',
          // Update with new content
          ...(cardId === 'title' && { title: newContent.value }),
          ...(cardId === 'text' && { description: newContent.value }),
          ...(cardId === 'banner' && { image_path: newContent.media?.file_url || '' })
        };

        await homeContentAPI.create(homeContentData);
      }

      console.log(`Content saved for ${cardId}:`, newContent);
    } catch (err) {
      setError(`Failed to save ${cardId} content`);
      console.error('Save error:', err);
    }
  };

  const handleContentDelete = async (cardId) => {
    try {
      setContentData(prev => ({
        ...prev,
        [cardId]: null
      }));
      console.log(`Content deleted for ${cardId}`);
    } catch (err) {
      setError(`Failed to delete ${cardId} content`);
      console.error('Delete error:', err);
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto py-8 text-center">
        <div className="text-gray-500">Loading content...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-8 text-text-on-light-bg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-heading text-text-on-light-bg">CONTENT MANAGEMENT</h2>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
          {error}
        </div>
      )}

      {contentConfig.map(({ section, cards }) => (
        <section key={section} className="mb-2">
          <h2 className="text-xl font-heading font-bold text-text-on-light-bg mb-4 mt-8">{section}</h2>
          {cards.map(card => (
            <ContentCard 
              key={card.id} 
              title={card.title} 
              description={card.description} 
              bgColor={card.bgColor}
            >
              <CardContent 
                type={card.contentType} 
                placeholder={card.placeholder} 
                content={contentData[card.id]}
                onContentChange={(newContent) => setContentData(prev => ({
                  ...prev,
                  [card.id]: newContent
                }))}
                onSave={(newContent) => handleContentSave(card.id, newContent)}
                onDelete={() => handleContentDelete(card.id)}
              />
            </ContentCard>
          ))}
        </section>
      ))}
    </div>
  );
};