// Mock Axios-like API for lib/api.js
// This provides a drop-in replacement for the axios instance when in mock mode

import { mockApiService } from "./mockApiService.js";

// Create mock axios instance that mimics the real axios API
const createMockAxios = () => {
  const mockAxios = async (config) => {
    // Handle axios(config) syntax
    const url = typeof config === "string" ? config : config.url;
    const method = typeof config === "string" ? "GET" : (config.method || "GET").toUpperCase();
    const data = typeof config === "string" ? undefined : config.data;

    const response = await mockApiService.request(url, {
      method,
      body: data,
      headers: config?.headers || {},
    });

    return { data: response };
  };

  // Add axios methods
  mockAxios.get = async (url, config = {}) => {
    const response = await mockApiService.get(url);
    return { data: response };
  };

  mockAxios.post = async (url, data, config = {}) => {
    const response = await mockApiService.post(url, data);
    return { data: response };
  };

  mockAxios.put = async (url, data, config = {}) => {
    const response = await mockApiService.put(url, data);
    return { data: response };
  };

  mockAxios.patch = async (url, data, config = {}) => {
    const response = await mockApiService.patch(url, data);
    return { data: response };
  };

  mockAxios.delete = async (url, config = {}) => {
    const response = await mockApiService.delete(url);
    return { data: response };
  };

  // Mock interceptors
  mockAxios.interceptors = {
    request: {
      use: (onFulfilled, onRejected) => {
        // Store interceptors if needed, but for mock we just return
        return 0;
      },
      eject: (id) => {},
    },
    response: {
      use: (onFulfilled, onRejected) => {
        return 0;
      },
      eject: (id) => {},
    },
  };

  // Mock create method
  mockAxios.create = (config) => {
    return createMockAxios();
  };

  return mockAxios;
};

export const mockApi = createMockAxios();
