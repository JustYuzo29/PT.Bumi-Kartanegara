import React, { useState, useEffect } from "react";
import { PlusIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import DirectorTitleCard from "./components/DirectorTitleCard";
import DirectorTextCard from "./components/DirectorTextCard";
import DirectorProfileCard from "./components/DirectorProfileCard";
import { teamMemberAPI } from "../../../lib/apiSelector";
import { useDebounce, migrateLocalStorageData, getCurrentCompanyId } from "../../../utils/contentUtils";

const componentMapDirector = {
  Title: DirectorTitleCard,
  Text: DirectorTextCard,
  Profile: DirectorProfileCard,
};
const dropdownOptionsDirector = ["Title", "Text", "Profile"];

const DirectorCommissionerSection = () => {
  const [directors, setDirectors] = useState([]);
  const [contents, setContents] = useState([]); // For UI content like Title/Text cards
  const [isExpanded, setIsExpanded] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [saveStatus, setSaveStatus] = useState('idle'); // 'idle', 'saving', 'saved', 'error'

  // Create debounced save function for text edits
  const debouncedSave = useDebounce(async (id, data) => {
    try {
      setSaveStatus('saving');
      await teamMemberAPI.update(id, data);
      setSaveStatus('saved');
    } catch (err) {
      console.error('Debounced save failed:', err);
      setSaveStatus('error');
    }
  }, 800);

  // Migrate localStorage data to TeamMember API
  const migrateDirectorData = async () => {
    const transformFn = async (localStorageContents) => {
      const migrations = [];
      
      for (const content of localStorageContents) {
        if (content.type === 'Profile' && content.profileData) {
          const { name, title, description, imageUrl } = content.profileData;
          
          if (name || title) {
            migrations.push({
              name: name || 'Unnamed Director',
              position: title || 'Director',
              bio: description || '',
              image_path: imageUrl || '',
              is_management: true,
              company: getCurrentCompanyId(),
              display_order: migrations.length
            });
          }
        }
      }
      
      return migrations;
    };

    const saveFn = async (teamMembers) => {
      for (const memberData of teamMembers) {
        await teamMemberAPI.create(memberData);
      }
    };

    return await migrateLocalStorageData('director_commissioner_contents', transformFn, saveFn);
  };

  // Load directors from API
  const loadDirectors = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // First try migration
      await migrateDirectorData();
      
      // Load directors from API
      const response = await teamMemberAPI.getAll();
      const managementMembers = response.results ? 
        response.results.filter(member => member.is_management) : 
        response.filter(member => member.is_management);
      
      setDirectors(managementMembers);
      
      // Load any remaining UI content (Title/Text cards)
      const saved = localStorage.getItem("director_commissioner_contents");
      if (saved) {
        const parsedContents = JSON.parse(saved);
        const uiContents = parsedContents.filter(content => content.type !== 'Profile');
        setContents(uiContents);
        
        // Clean up localStorage if only UI content remains
        if (uiContents.length === 0) {
          localStorage.removeItem("director_commissioner_contents");
        }
      }
    } catch (err) {
      console.error('Failed to load directors:', err);
      setError('Failed to load director content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDirectors();
  }, []);

  const handleAddContent = async (type) => {
    if (type === 'Profile') {
      // Create a new director via API
      try {
        setSaving(true);
        const newDirector = await teamMemberAPI.create({
          name: 'New Director',
          position: 'Director',
          bio: '',
          is_management: true,
          company: getCurrentCompanyId(),
          display_order: directors.length
        });
        setDirectors([...directors, newDirector]);
      } catch (err) {
        console.error('Failed to create director:', err);
        setError('Failed to create new director.');
      } finally {
        setSaving(false);
      }
    } else {
      // Add UI content (Title/Text)
      const newContent = { id: Date.now() + Math.random(), type };
      setContents([...contents, newContent]);
    }
    setShowDropdown(false);
  };

  const handleRemoveContent = async (id) => {
    // Check if it's a director (has name, position fields) or UI content
    const director = directors.find(d => d.id === id);
    if (director) {
      try {
        setSaving(true);
        await teamMemberAPI.delete(id);
        setDirectors(directors.filter(d => d.id !== id));
      } catch (err) {
        console.error('Failed to delete director:', err);
        setError('Failed to delete director.');
      } finally {
        setSaving(false);
      }
    } else {
      // Remove UI content
      setContents(contents.filter(c => c.id !== id));
    }
  };

  // Handle profile data changes from DirectorProfileCard
  const handleProfileDataChange = async (directorId, profileData) => {
    // Update local state immediately for responsive UI
    setDirectors(directors.map(director => 
      director.id === directorId 
        ? { 
            ...director, 
            name: profileData.name || director.name,
            position: profileData.title || director.position,
            bio: profileData.description || director.bio,
            image_path: profileData.imageUrl || director.image_path
          }
        : director
    ));
    
    // Debounced save to API
    debouncedSave(directorId, {
      name: profileData.name,
      position: profileData.title,
      bio: profileData.description,
      image_path: profileData.imageUrl
    });
  };

  return (
    <section className="mb-10">
      <div className="flex items-center gap-2 pl-3 mb-4">
        <h2 className="text-lg font-bold text-[var(--color-button-blue)] dark:text-white tracking-wide uppercase">
          DIRECTOR & COMMISSIONER
        </h2>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            title="Tambah Konten"
            className="text-[var(--color-button-blue)] dark:text-white"
          >
            <PlusIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            title="Sembunyikan / Tampilkan"
            className="text-[var(--color-button-blue)] dark:text-white"
          >
            {isExpanded ? (
              <ChevronUpIcon className="w-5 h-5" />
            ) : (
              <ChevronDownIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {showDropdown && (
        <div className="mb-4 bg-white dark:bg-[var(--color-sidebar)] border border-gray-200 dark:border-gray-700 rounded-lg p-3 w-fit shadow-md">
          {dropdownOptionsDirector.map((option) => (
            <button
              key={option}
              onClick={() => handleAddContent(option)}
              className="block w-full text-left text-sm text-[var(--color-sidebar)] dark:text-white py-1 px-3"
            >
              + {option}
            </button>
          ))}
        </div>
      )}

      {isExpanded && (
        <>
          {/* Error state */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-4">
              <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 text-red-600 dark:text-red-400 underline text-sm"
              >
                Reload page
              </button>
            </div>
          )}

          {/* Save status indicator */}
          {saveStatus === 'saving' && (
            <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-3 text-center mb-4">
              <p className="text-blue-800 dark:text-blue-200 text-sm">Saving changes...</p>
            </div>
          )}
          {saveStatus === 'saved' && (
            <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-3 text-center mb-4">
              <p className="text-green-800 dark:text-green-200 text-sm">Saved ✓</p>
            </div>
          )}
          {saveStatus === 'error' && (
            <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-3 text-center mb-4">
              <p className="text-red-800 dark:text-red-200 text-sm">Save failed ✗</p>
            </div>
          )}

          {/* Saving indicator */}
          {saving && (
            <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-3 text-center mb-4">
              <p className="text-blue-800 dark:text-blue-200 text-sm">Saving changes...</p>
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 text-center mb-4">
              <p className="text-yellow-800 dark:text-yellow-200">Loading director content...</p>
            </div>
          )}

          {directors.length === 0 && contents.length === 0 && !loading ? (
            <div className="bg-white dark:bg-[var(--color-card-secondary)] border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-sm text-center text-gray-500 dark:text-black">
              Belum ada konten director ditambahkan. Klik ikon '+' untuk memulai.
            </div>
          ) : (
            <div className="space-y-4">
              {/* Render UI content (Title/Text cards) */}
              {contents.map((content, i) => {
                const Component = componentMapDirector[content.type];
                if (!Component) return null;
                return (
                  <Component
                    key={content.id}
                    id={content.id}
                    onRemove={handleRemoveContent}
                    profileNo={content.type === "Profile" ? i + 1 : undefined}
                  />
                );
              })}
              
              {/* Render Director profiles */}
              {directors.map((director, i) => (
                <DirectorProfileCard
                  key={director.id}
                  id={director.id}
                  onRemove={handleRemoveContent}
                  profileNo={i + 1}
                  initialData={{
                    name: director.name,
                    title: director.position,
                    description: director.bio,
                    imageUrl: director.image_path
                  }}
                  onDataChange={handleProfileDataChange}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default DirectorCommissionerSection;