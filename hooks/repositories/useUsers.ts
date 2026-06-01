import { User } from "@/models/user";
import { getUser } from "@/services/users";
import { useQuery } from "@tanstack/react-query";

export function useUser(username: string, initialData?: User) {
  return useQuery({
    queryKey: ["user", username],
    queryFn: () => getUser(username),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    initialData: initialData,
  });
}
