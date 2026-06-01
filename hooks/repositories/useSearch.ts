import { searchRepositories, searchUsers } from "@/services/search";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useSearchUsers(query: string, enabled = true) {
  return useInfiniteQuery({
    queryKey: ["search", "users", query],
    queryFn: ({ pageParam }) =>
      searchUsers({
        query,
        after: pageParam,
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.nextCursor : undefined;
    },
    enabled: enabled && !!query,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 5,
  });
}

export function useSearchRepositories(query: string, enabled = true) {
  return useInfiniteQuery({
    queryKey: ["search", "repositories", query],
    queryFn: ({ pageParam = 1 }) =>
      searchRepositories({ q: query, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.length * 20;

      // GitHub gives total_count, use it for boundary
      if (loaded >= lastPage.total) return undefined;

      return allPages.length + 1;
    },
    enabled: enabled && !!query,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
}
