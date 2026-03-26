import apiClient from "./apiService";
import type { Congregant } from "@/lib/store";

export const congregantApi = {
  //   getAll: () => apiClient.get<Congregant[]>("/api/v1/congregations"),
  getAll: async () => {
    const response = await apiClient.get<Congregant[]>("/api/v1/congregations");
    return response;
  },

  //   getById: (id: string) => apiClient.get<Congregant>(`/api/v1/congregations/${id}`),
  getById: async (id: string) => {
    const response = await apiClient.get<Congregant>(
      `/api/v1/congregations/${id}`,
    );
    return response;
  },

  //   create: (data: Omit<Congregant, "id">) =>
  //     apiClient.post<Congregant>("/api/v1/congregations", data),
  create: async (data: Omit<Congregant, "id">) => {
    const response = await apiClient.post<Congregant>(
      "/api/v1/congregations",
      data,
    );
    return response;
  },

  //   update: (id: string, data: Partial<Congregant>) =>
  //     apiClient.put<Congregant>(`/api/v1/congregations/${id}`, data),
  update: async (id: string, data: Partial<Congregant>) => {
    const response = await apiClient.put<Congregant>(
      `/api/v1/congregations/${id}`,
      data,
    );
    return response;
  },

  //   delete: (id: string) => apiClient.delete(`/api/v1/congregations/${id}`),
  delete: async (id: string) => {
    const response = await apiClient.delete(`/api/v1/congregations/${id}`);
    return response;
  },
};
