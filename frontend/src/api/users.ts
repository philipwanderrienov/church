import api from "@/lib/api";
import type { User, UserFormValues } from "@/types/api";

type ApiEnvelope<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

export async function getUsers() {
  const response = await api.get<ApiEnvelope<User[]>>("/api/Users");
  return response.data.data ?? [];
}

export async function getUserById(id: string) {
  const response = await api.get<ApiEnvelope<User>>(`/api/Users/${id}`);
  return response.data.data ?? null;
}

export async function getUsersByCongregationId(congregationId: string) {
  const response = await api.get<ApiEnvelope<User[]>>(
    `/api/Users/congregation/${congregationId}`,
  );
  return response.data.data ?? [];
}

export async function createUser(payload: UserFormValues) {
  const response = await api.post<ApiEnvelope<User>>("/api/Users", payload);
  if (!response.data.success) {
    throw new Error(response.data.message ?? "Gagal menambah jemaat.");
  }
  return response.data.data;
}

export async function updateUser(id: string, payload: UserFormValues) {
  const response = await api.put<ApiEnvelope<void>>(`/api/Users/${id}`, {
    ...payload,
    Id: id,
  });
  if (!response.data.success) {
    throw new Error(response.data.message ?? "Gagal memperbarui jemaat.");
  }
  return true;
}

export async function deleteUser(id: string) {
  const response = await api.delete<ApiEnvelope<void>>(`/api/Users/${id}`);
  if (!response.data.success) {
    throw new Error(response.data.message ?? "Gagal menghapus jemaat.");
  }
  return true;
}
