// API Service Selector
// File ini memilih antara real API atau mock API berdasarkan environment variable

import * as realApiService from "../services/api.js";
import * as mockApiService from "../mocks/mockApiService.js";

// Check if we should use mock API
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === "true";

console.log(
  `[API Mode] ${USE_MOCK_API ? "Mock API (Standalone)" : "Real API (Backend)"}`
);

// Export the appropriate API based on environment
export const apiService = USE_MOCK_API
  ? mockApiService.default
  : realApiService.default;

export const companyAPI = USE_MOCK_API
  ? mockApiService.mockCompanyAPI
  : realApiService.companyAPI;

export const userAPI = USE_MOCK_API
  ? mockApiService.mockUserAPI
  : realApiService.userAPI;

export const teamMemberAPI = USE_MOCK_API
  ? mockApiService.mockTeamMemberAPI
  : realApiService.teamMemberAPI;

export const serviceAPI = USE_MOCK_API
  ? mockApiService.mockServiceAPI
  : realApiService.serviceAPI;

export const homeContentAPI = USE_MOCK_API
  ? mockApiService.mockHomeContentAPI
  : realApiService.homeContentAPI;

export const aboutUsAPI = USE_MOCK_API
  ? mockApiService.mockAboutUsAPI
  : realApiService.aboutUsAPI;

export const contactAPI = USE_MOCK_API
  ? mockApiService.mockContactAPI
  : realApiService.contactAPI;

export const projectAPI = USE_MOCK_API
  ? mockApiService.mockProjectAPI
  : realApiService.projectAPI;

export const testimonialAPI = realApiService.testimonialAPI; // No mock needed yet

export const clientAPI = USE_MOCK_API
  ? mockApiService.mockClientAPI
  : realApiService.clientAPI;

export const newsAPI = realApiService.newsAPI; // No mock needed yet

export const mediaAPI = USE_MOCK_API
  ? mockApiService.mockMediaAPI
  : realApiService.mediaAPI;

export const socialMediaAPI = realApiService.socialMediaAPI; // No mock needed yet

export const settingAPI = realApiService.settingAPI; // No mock needed yet

export const categoryAPI = realApiService.categoryAPI; // No mock needed yet

export const userLogAPI = realApiService.userLogAPI; // No mock needed yet

export const contentHistoryAPI = realApiService.contentHistoryAPI; // No mock needed yet

export const galleryAPI = USE_MOCK_API
  ? mockApiService.mockGalleryAPI
  : realApiService.galleryAPI;

export const contentAPI = USE_MOCK_API
  ? mockApiService.mockContentAPI
  : realApiService.contentAPI;

export const staffAPI = realApiService.staffAPI; // No mock needed yet

export default apiService;
