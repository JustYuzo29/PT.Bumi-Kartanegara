// Mock data untuk mode standalone (tanpa backend)
// Data ini akan digunakan ketika VITE_USE_MOCK_API=true

export const mockUsers = {
  results: [
    {
      id: 1,
      username: "admin",
      email: "admin@bumikarta.com",
      tipe: "admin",
      first_name: "Admin",
      last_name: "User",
      is_active: true,
    },
    {
      id: 2,
      username: "staff",
      email: "staff@bumikarta.com",
      tipe: "staff",
      first_name: "Staff",
      last_name: "User",
      is_active: true,
    },
  ],
  count: 2,
};

export const mockTeamMembers = {
  results: [
    {
      id: 1,
      name: "John Doe",
      position: "Direktur Utama",
      role: "director",
      company: 1,
      photo: "/placeholder-director.jpg",
      bio: "Direktur Utama dengan pengalaman lebih dari 20 tahun",
      order: 1,
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Komisaris",
      role: "commissioner",
      company: 1,
      photo: "/placeholder-commissioner.jpg",
      bio: "Komisaris dengan latar belakang keuangan yang kuat",
      order: 2,
    },
  ],
  count: 2,
};

export const mockServices = {
  results: [
    {
      id: 1,
      title: "Layanan Konsultasi",
      description: "Memberikan konsultasi profesional untuk bisnis Anda",
      icon: "consulting",
      company: 1,
      is_active: true,
      order: 1,
    },
    {
      id: 2,
      title: "Layanan Teknologi",
      description: "Solusi teknologi terkini untuk efisiensi bisnis",
      icon: "technology",
      company: 1,
      is_active: true,
      order: 2,
    },
  ],
  count: 2,
};

export const mockHomeContent = {
  results: [
    {
      id: 1,
      section: "hero",
      title: "Selamat Datang di PT Bumi Kartanegara",
      subtitle: "Solusi Terpercaya untuk Bisnis Anda",
      content: "Kami menyediakan layanan terbaik dengan dedikasi penuh",
      image: "/hero-bg.jpg",
      company: 1,
      is_active: true,
      order: 1,
    },
  ],
  count: 1,
};

export const mockAboutUs = {
  results: [
    {
      id: 1,
      section: "tentang",
      title: "Tentang Kami",
      content: "PT Bumi Kartanegara adalah perusahaan yang bergerak di bidang...",
      image: "/about-us.jpg",
      company: 1,
      is_active: true,
      order: 1,
    },
    {
      id: 2,
      section: "visi",
      title: "Visi Kami",
      content: "Menjadi perusahaan terdepan di Indonesia",
      company: 1,
      is_active: true,
      order: 2,
    },
    {
      id: 3,
      section: "misi",
      title: "Misi Kami",
      content: "Memberikan pelayanan terbaik kepada pelanggan",
      company: 1,
      is_active: true,
      order: 3,
    },
  ],
  count: 3,
};

export const mockContacts = {
  results: [
    {
      id: 1,
      type: "address",
      label: "Alamat Kantor",
      value: "Jl. Contoh No. 123, Jakarta",
      is_active: true,
      order: 1,
    },
    {
      id: 2,
      type: "phone",
      label: "Telepon",
      value: "+62 21 1234 5678",
      is_active: true,
      order: 2,
    },
    {
      id: 3,
      type: "email",
      label: "Email",
      value: "info@bumikarta.com",
      is_active: true,
      order: 3,
    },
  ],
  count: 3,
};

export const mockGalleries = {
  results: [
    {
      id: 1,
      company: 1,
      name: "Default Gallery",
      description: "Default gallery for curated content",
      created_at: "2025-01-01T00:00:00Z",
      updated_at: "2025-01-01T00:00:00Z",
    },
  ],
  count: 1,
};

export const mockGalleryItems = {
  results: [
    {
      id: 1,
      gallery: 1,
      media: 1,
      title: "Image 1",
      description: "Beautiful image",
      order: 1,
      is_featured: true,
      media_details: {
        id: 1,
        file: "/placeholder-image-1.jpg",
        file_type: "image",
        title: "Placeholder Image 1",
      },
    },
    {
      id: 2,
      gallery: 1,
      media: 2,
      title: "Image 2",
      description: "Another beautiful image",
      order: 2,
      is_featured: false,
      media_details: {
        id: 2,
        file: "/placeholder-image-2.jpg",
        file_type: "image",
        title: "Placeholder Image 2",
      },
    },
  ],
  count: 2,
};

export const mockMedia = {
  results: [
    {
      id: 1,
      file: "/placeholder-image-1.jpg",
      file_type: "image",
      title: "Placeholder Image 1",
      alt_text: "Placeholder",
      description: "A placeholder image",
      company: 1,
      uploaded_at: "2025-01-01T00:00:00Z",
    },
    {
      id: 2,
      file: "/placeholder-image-2.jpg",
      file_type: "image",
      title: "Placeholder Image 2",
      alt_text: "Placeholder",
      description: "Another placeholder image",
      company: 1,
      uploaded_at: "2025-01-01T00:00:00Z",
    },
  ],
  count: 2,
};

export const mockProjects = {
  results: [
    {
      id: 1,
      title: "Project Alpha",
      description: "Deskripsi project alpha",
      image: "/project-alpha.jpg",
      is_featured: true,
      company: 1,
      date: "2025-01-01",
    },
  ],
  count: 1,
};

export const mockClients = {
  results: [
    {
      id: 1,
      name: "Client A",
      logo: "/client-a-logo.jpg",
      is_featured: true,
      company: 1,
      order: 1,
    },
  ],
  count: 1,
};

export const mockServiceContent = {
  contents: [
    {
      id: "1",
      title: "Konsultasi Bisnis",
      description: "Layanan konsultasi untuk pengembangan bisnis",
      icon: "briefcase",
    },
    {
      id: "2",
      title: "Solusi Digital",
      description: "Transformasi digital untuk perusahaan",
      icon: "computer",
    },
  ],
};

// Storage untuk data yang bisa dimodifikasi
let storage = {
  users: [...mockUsers.results],
  teamMembers: [...mockTeamMembers.results],
  services: [...mockServices.results],
  homeContent: [...mockHomeContent.results],
  aboutUs: [...mockAboutUs.results],
  contacts: [...mockContacts.results],
  galleries: [...mockGalleries.results],
  galleryItems: [...mockGalleryItems.results],
  media: [...mockMedia.results],
  projects: [...mockProjects.results],
  clients: [...mockClients.results],
  serviceContent: [...mockServiceContent.contents],
};

// Helper functions untuk CRUD operations
export const mockStorage = {
  // Get all
  getAll: (resource) => {
    return {
      results: storage[resource] || [],
      count: storage[resource]?.length || 0,
    };
  },

  // Get by ID
  getById: (resource, id) => {
    const item = storage[resource]?.find((item) => item.id === parseInt(id));
    return item || null;
  },

  // Create
  create: (resource, data) => {
    const newId =
      storage[resource]?.length > 0
        ? Math.max(...storage[resource].map((item) => item.id)) + 1
        : 1;
    const newItem = { ...data, id: newId };
    storage[resource] = [...(storage[resource] || []), newItem];
    return newItem;
  },

  // Update
  update: (resource, id, data) => {
    const index = storage[resource]?.findIndex(
      (item) => item.id === parseInt(id)
    );
    if (index !== -1) {
      storage[resource][index] = { ...storage[resource][index], ...data };
      return storage[resource][index];
    }
    return null;
  },

  // Delete
  delete: (resource, id) => {
    storage[resource] = storage[resource]?.filter(
      (item) => item.id !== parseInt(id)
    );
    return true;
  },

  // Custom: Get or Create Gallery
  getOrCreateGallery: (companyId) => {
    let gallery = storage.galleries.find(
      (g) => g.company === parseInt(companyId)
    );
    if (!gallery) {
      gallery = mockStorage.create("galleries", {
        company: parseInt(companyId),
        name: "Default Gallery",
        description: "Default gallery for curated content",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }
    return gallery;
  },

  // Custom: Gallery Items
  getGalleryItems: (galleryId) => {
    const items = storage.galleryItems.filter(
      (item) => item.gallery === parseInt(galleryId)
    );
    return {
      results: items,
      count: items.length,
    };
  },

  addGalleryItem: (galleryId, data) => {
    return mockStorage.create("galleryItems", {
      ...data,
      gallery: parseInt(galleryId),
    });
  },

  removeGalleryItem: (galleryId, itemId) => {
    storage.galleryItems = storage.galleryItems.filter(
      (item) =>
        !(
          item.gallery === parseInt(galleryId) &&
          item.id === parseInt(itemId)
        )
    );
    return true;
  },

  // Custom: Upload media
  uploadMedia: (formData) => {
    // Simulate file upload
    const file = formData.get("file");
    const newMedia = {
      id:
        storage.media.length > 0
          ? Math.max(...storage.media.map((m) => m.id)) + 1
          : 1,
      file: URL.createObjectURL(file),
      file_type: file.type.startsWith("image/") ? "image" : "file",
      title: formData.get("title") || file.name,
      alt_text: formData.get("alt_text") || "",
      description: formData.get("description") || "",
      company: parseInt(formData.get("company") || "1"),
      uploaded_at: new Date().toISOString(),
    };
    storage.media.push(newMedia);
    return newMedia;
  },

  // Custom: Filter by type
  getByType: (resource, type) => {
    const items = storage[resource]?.filter((item) => item.file_type === type);
    return {
      results: items || [],
      count: items?.length || 0,
    };
  },

  // Reset storage to initial state
  reset: () => {
    storage = {
      users: [...mockUsers.results],
      teamMembers: [...mockTeamMembers.results],
      services: [...mockServices.results],
      homeContent: [...mockHomeContent.results],
      aboutUs: [...mockAboutUs.results],
      contacts: [...mockContacts.results],
      galleries: [...mockGalleries.results],
      galleryItems: [...mockGalleryItems.results],
      media: [...mockMedia.results],
      projects: [...mockProjects.results],
      clients: [...mockClients.results],
      serviceContent: [...mockServiceContent.contents],
    };
  },
};
