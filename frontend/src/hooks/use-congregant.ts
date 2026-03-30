import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { congregantApi } from "@/api/congregant";
import type { Congregant } from "@/lib/store";

// Helper to convert sql.NullString objects to strings
const transformCongregant = (data: any): Congregant => {
  const normalize = (value: any, fallback = ""): string => {
    if (value == null) return fallback;
    if (typeof value === "string") return value;
    if (typeof value === "object") {
      if (typeof value.String === "string") return value.String;
      if (typeof value.string === "string") return value.string;
    }
    return String(value);
  };

  return {
    id: normalize(data.id),
    fullName: normalize(data.fullname),
    gender: normalize(data.gender, "Male") as "Male" | "Female",
    dateOfBirth: normalize(data.dateofbirth),
    phone: normalize(data.phone),
    email: normalize(data.email),
    address: normalize(data.address),
    maritalStatus: normalize(data.maritalstatus, "Single") as any,
    familyCardNumber: normalize(data.familycardnumber),
    classSector: normalize(data.classsector),
    rayon: normalize(data.rayon),
    joinDate: normalize(data.joindate),
    photo: normalize(data.photo),
  };
};

export type CongregantApiResponse = {
  data?: {
    data?: unknown[];
  };
};

export const useCongregants = () => {
  return useQuery<Congregant[], Error>({
    queryKey: ["congregations"],
    queryFn: async () => {
      try {
        const response =
          (await congregantApi.getAll()) as CongregantApiResponse;
        const congregants = Array.isArray(response?.data?.data)
          ? response.data.data
          : [];

        return congregants.map(transformCongregant);
      } catch (error) {
        console.error("Error fetching congregants:", error);
        throw error instanceof Error
          ? error
          : new Error("Gagal memuat data jemaat");
      }
    },
  });
};

// export const useCongregants = () => {
//   return useQuery<Congregant[], Error>({
//     queryKey: ['congregations'],
//     queryFn: () => congregantApi.getAll(),
//   });
// };

export const useCreateCongregant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Congregant, "id">) => congregantApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["congregations"] });
    },
  });
};

export const useUpdateCongregant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Congregant> }) =>
      congregantApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["congregations"] });
    },
  });
};

export const useDeleteCongregant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => congregantApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["congregations"] });
    },
  });
};
