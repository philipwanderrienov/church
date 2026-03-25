import apiClient from "./apiService";
import type { Congregant } from "@/lib/store";

export const congregantApi = {
  //   getAll: () => apiClient.get<Congregant[]>("/congregations"),
  getAll: async () => {
    const response = await apiClient.get<Congregant[]>("/congregations");
    return response;
  },

  //   getById: (id: string) => apiClient.get<Congregant>(`/congregations/${id}`),
  getById: async (id: string) => {
    const response = await apiClient.get<Congregant>(`/congregations/${id}`);
    return response;
  },

  //   create: (data: Omit<Congregant, "id">) =>
  //     apiClient.post<Congregant>("/congregations", data),
  create: async (data: Omit<Congregant, "id">) => {
    const response = await apiClient.post<Congregant>("/congregations", data);
    return response;
  },

  //   update: (id: string, data: Partial<Congregant>) =>
  //     apiClient.put<Congregant>(`/congregations/${id}`, data),
  update: async (id: string, data: Partial<Congregant>) => {
    const response = await apiClient.put<Congregant>(
      `/congregations/${id}`,
      data,
    );
    return response;
  },

  //   delete: (id: string) => apiClient.delete(`/congregations/${id}`),
  delete: async (id: string) => {
    const response = await apiClient.delete(`/congregations/${id}`);
    return response;
  },
};
