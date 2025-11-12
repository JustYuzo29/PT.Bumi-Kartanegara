// Mock API Service untuk mode standalone
// Service ini meniru perilaku backend API tanpa perlu server Django

import { mockStorage } from "./mockData.js";

// Simulate network delay
const delay = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock API Service class
class MockApiService {
  constructor() {
    this.baseURL = "/mock-api";
  }

  async request(endpoint, options = {}) {
    await delay(100); // Simulate network delay

    const method = options.method || "GET";
    console.log(`[Mock API] ${method} ${endpoint}`, options.body);

    try {
      // Simulate response
      const response = this.handleRequest(endpoint, method, options.body);
      return response;
    } catch (error) {
      console.error("[Mock API] Error:", error);
      throw error;
    }
  }

  handleRequest(endpoint, method, body) {
    // Remove leading slash
    const path = endpoint.replace(/^\//, "");

    // Parse endpoint
    const parts = path.split("/").filter(Boolean);
    const resource = parts[0];
    const id = parts[1];
    const action = parts[2];

    // Handle different endpoints
    switch (resource) {
      case "users":
        return this.handleUsers(method, id, body);
      case "team-members":
        return this.handleTeamMembers(method, id, body);
      case "services":
        return this.handleServices(method, id, body);
      case "home-content":
        return this.handleHomeContent(method, id, body);
      case "about-us":
        return this.handleAboutUs(method, id, body);
      case "contacts":
        return this.handleContacts(method, id, body);
      case "galleries":
        return this.handleGalleries(method, id, action, body);
      case "media":
        return this.handleMedia(method, id, action, body);
      case "projects":
        return this.handleProjects(method, id, body);
      case "clients":
        return this.handleClients(method, id, body);
      case "content":
        return this.handleContent(method, parts[1], body);
      case "login":
        return this.handleLogin(body);
      default:
        return { results: [], count: 0 };
    }
  }

  // Generic CRUD handlers
  handleUsers(method, id, body) {
    return this.handleGenericCRUD("users", method, id, body);
  }

  handleTeamMembers(method, id, body) {
    return this.handleGenericCRUD("teamMembers", method, id, body);
  }

  handleServices(method, id, body) {
    return this.handleGenericCRUD("services", method, id, body);
  }

  handleHomeContent(method, id, body) {
    return this.handleGenericCRUD("homeContent", method, id, body);
  }

  handleAboutUs(method, id, body) {
    return this.handleGenericCRUD("aboutUs", method, id, body);
  }

  handleContacts(method, id, body) {
    return this.handleGenericCRUD("contacts", method, id, body);
  }

  handleProjects(method, id, body) {
    return this.handleGenericCRUD("projects", method, id, body);
  }

  handleClients(method, id, body) {
    return this.handleGenericCRUD("clients", method, id, body);
  }

  handleGenericCRUD(resource, method, id, body) {
    switch (method) {
      case "GET":
        if (id) {
          return mockStorage.getById(resource, id);
        }
        return mockStorage.getAll(resource);
      case "POST":
        const data = typeof body === "string" ? JSON.parse(body) : body;
        return mockStorage.create(resource, data);
      case "PUT":
      case "PATCH":
        const updateData = typeof body === "string" ? JSON.parse(body) : body;
        return mockStorage.update(resource, id, updateData);
      case "DELETE":
        mockStorage.delete(resource, id);
        return { success: true };
      default:
        throw new Error(`Method ${method} not supported`);
    }
  }

  // Special handlers
  handleGalleries(method, id, action, body) {
    if (action === "items") {
      // GET /galleries/{id}/items/
      return mockStorage.getGalleryItems(id);
    } else if (action === "add_item") {
      // POST /galleries/{id}/add_item/
      const data = typeof body === "string" ? JSON.parse(body) : body;
      return mockStorage.addGalleryItem(id, data);
    } else if (method === "GET" && !id) {
      // Handle getOrCreate logic
      return mockStorage.getAll("galleries");
    }
    return this.handleGenericCRUD("galleries", method, id, body);
  }

  handleMedia(method, id, action, body) {
    if (action === "upload") {
      // Handle file upload
      return mockStorage.uploadMedia(body);
    } else if (method === "GET" && !id) {
      // Check for query params (simulated)
      return mockStorage.getAll("media");
    }
    return this.handleGenericCRUD("media", method, id, body);
  }

  handleContent(method, section, body) {
    if (section === "services") {
      if (method === "GET") {
        return { contents: mockStorage.getAll("serviceContent").results };
      } else if (method === "POST") {
        const data = typeof body === "string" ? JSON.parse(body) : body;
        return { contents: data.contents };
      }
    }
    return { contents: [] };
  }

  handleLogin(body) {
    const credentials = typeof body === "string" ? JSON.parse(body) : body;
    // Simple mock authentication
    if (credentials.username && credentials.password) {
      return {
        access_token: "mock-access-token-" + Date.now(),
        refresh_token: "mock-refresh-token-" + Date.now(),
        user: {
          id: 1,
          username: credentials.username,
          tipe: credentials.username === "admin" ? "admin" : "staff",
        },
      };
    }
    throw new Error("Invalid credentials");
  }

  // Public methods matching real API
  async get(endpoint) {
    return this.request(endpoint);
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: "POST",
      body: data,
    });
  }

  async put(endpoint, data) {
    return this.request(endpoint, {
      method: "PUT",
      body: data,
    });
  }

  async patch(endpoint, data) {
    return this.request(endpoint, {
      method: "PATCH",
      body: data,
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, {
      method: "DELETE",
    });
  }
}

// Create and export mock API service instance
export const mockApiService = new MockApiService();

// Mock versions of all API services
export const mockCompanyAPI = {
  getAll: () => mockApiService.get("/companies/"),
  getById: (id) => mockApiService.get(`/companies/${id}/`),
  create: (data) => mockApiService.post("/companies/", data),
  update: (id, data) => mockApiService.put(`/companies/${id}/`, data),
  delete: (id) => mockApiService.delete(`/companies/${id}/`),
};

export const mockUserAPI = {
  getAll: () => mockApiService.get("/users/"),
  getById: (id) => mockApiService.get(`/users/${id}/`),
  create: (data) => mockApiService.post("/users/", data),
  update: (id, data) => mockApiService.put(`/users/${id}/`, data),
  delete: (id) => mockApiService.delete(`/users/${id}/`),
};

export const mockTeamMemberAPI = {
  getAll: () => mockApiService.get("/team-members/"),
  getById: (id) => mockApiService.get(`/team-members/${id}/`),
  create: (data) => mockApiService.post("/team-members/", data),
  update: (id, data) => mockApiService.put(`/team-members/${id}/`, data),
  delete: (id) => mockApiService.delete(`/team-members/${id}/`),
};

export const mockServiceAPI = {
  getAll: () => mockApiService.get("/services/"),
  getById: (id) => mockApiService.get(`/services/${id}/`),
  create: (data) => mockApiService.post("/services/", data),
  update: (id, data) => mockApiService.put(`/services/${id}/`, data),
  delete: (id) => mockApiService.delete(`/services/${id}/`),
};

export const mockHomeContentAPI = {
  getAll: () => mockApiService.get("/home-content/"),
  getById: (id) => mockApiService.get(`/home-content/${id}/`),
  create: (data) => mockApiService.post("/home-content/", data),
  update: (id, data) => mockApiService.put(`/home-content/${id}/`, data),
  delete: (id) => mockApiService.delete(`/home-content/${id}/`),
};

export const mockAboutUsAPI = {
  getAll: () => mockApiService.get("/about-us/"),
  getById: (id) => mockApiService.get(`/about-us/${id}/`),
  create: (data) => mockApiService.post("/about-us/", data),
  update: (id, data) => mockApiService.put(`/about-us/${id}/`, data),
  delete: (id) => mockApiService.delete(`/about-us/${id}/`),
};

export const mockContactAPI = {
  getAll: () => mockApiService.get("/contacts/"),
  getById: (id) => mockApiService.get(`/contacts/${id}/`),
  create: (data) => mockApiService.post("/contacts/", data),
  update: (id, data) => mockApiService.put(`/contacts/${id}/`, data),
  delete: (id) => mockApiService.delete(`/contacts/${id}/`),
};

export const mockProjectAPI = {
  getAll: () => mockApiService.get("/projects/"),
  getById: (id) => mockApiService.get(`/projects/${id}/`),
  create: (data) => mockApiService.post("/projects/", data),
  update: (id, data) => mockApiService.put(`/projects/${id}/`, data),
  delete: (id) => mockApiService.delete(`/projects/${id}/`),
};

export const mockClientAPI = {
  getAll: () => mockApiService.get("/clients/"),
  getById: (id) => mockApiService.get(`/clients/${id}/`),
  create: (data) => mockApiService.post("/clients/", data),
  update: (id, data) => mockApiService.put(`/clients/${id}/`, data),
  delete: (id) => mockApiService.delete(`/clients/${id}/`),
};

export const mockMediaAPI = {
  getAll: () => mockApiService.get("/media/"),
  getById: (id) => mockApiService.get(`/media/${id}/`),
  getImages: () => mockStorage.getByType("media", "image"),
  create: (data) => mockApiService.post("/media/", data),
  update: (id, data) => mockApiService.put(`/media/${id}/`, data),
  delete: (id) => mockApiService.delete(`/media/${id}/`),
  upload: async (formData) => {
    await delay(200);
    return mockStorage.uploadMedia(formData);
  },
  getByCompany: (companyId) => mockApiService.get(`/media/?company_id=${companyId}`),
  getByType: (fileType) => mockStorage.getByType("media", fileType),
};

export const mockGalleryAPI = {
  getAll: () => mockApiService.get("/galleries/"),
  getById: (id) => mockApiService.get(`/galleries/${id}/`),
  create: (data) => mockApiService.post("/galleries/", data),
  update: (id, data) => mockApiService.patch(`/galleries/${id}/`, data),
  delete: (id) => mockApiService.delete(`/galleries/${id}/`),
  getOrCreate: async (companyId) => {
    await delay(100);
    return mockStorage.getOrCreateGallery(companyId);
  },
  items: {
    list: (galleryId) => mockStorage.getGalleryItems(galleryId),
    add: async (galleryId, data) => {
      await delay(100);
      return mockStorage.addGalleryItem(galleryId, data);
    },
    update: async (galleryId, itemId, data) => {
      await delay(100);
      return mockStorage.update("galleryItems", itemId, data);
    },
    remove: async (galleryId, itemId) => {
      await delay(100);
      return mockStorage.removeGalleryItem(galleryId, itemId);
    },
  },
};

export const mockContentAPI = {
  services: {
    get: () => mockApiService.get("/content/services/"),
    save: (data) => mockApiService.post("/content/services/", data),
  },
};

export default mockApiService;
