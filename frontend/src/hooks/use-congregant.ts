import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { congregantApi } from "@/api/congregant";
import type { Congregant } from "@/lib/store";

export const useCongregants = () => {
  return useQuery({
    queryKey: ["congregations"],
    queryFn: () => congregantApi.getAll(),
    select: (data) => data.data as Congregant[],
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
