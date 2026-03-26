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
  return {
    id: data.id || "",
    fullName: data.fullname || "",
    gender: (data.gender?.String || data.gender || "Male") as "Male" | "Female",
    dateOfBirth: data.dateofbirth?.String || data.dateofbirth || "",
    phone: data.phone?.String || data.phone || "",
    email: data.email?.String || data.email || "",
    address: data.address?.String || data.address || "",
    maritalStatus: (data.maritalstatus?.String ||
      data.maritalstatus ||
      "Single") as any,
    familyCardNumber:
      data.familycardnumber?.String || data.familycardnumber || "",
    classSector: data.classsector?.String || data.classsector || "",
    rayon: data.rayon?.String || data.rayon || "",
    joinDate: data.joindate?.String || data.joindate || "",
    photo: data.photo?.String || data.photo,
  };
};

export const useCongregants = () => {
  return useQuery({
    queryKey: ["congregations"],
    queryFn: async () => {
      try {
        const response = await congregantApi.getAll();
        // response is full axios response object
        // response.data = { message, data: [...], total }
        // response.data.data = array of congregants
        const congregants = response.data.data;
        return congregants.map(transformCongregant);
      } catch (error) {
        console.error("Error fetching congregants:", error);
        throw error;
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
