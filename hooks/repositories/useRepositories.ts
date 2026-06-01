import {
  Repository,
  RepositoryCommit,
  RepositoryFeed,
  RepositoryLanguages,
  RepositorySort,
} from "@/models/repository";
import {
  getLatestCommit,
  getRepository,
  getRepositoryLanguages,
  getRepositoryReadme,
  getRepositoryStats,
  searchRepositories,
} from "@/services/repositories";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

function buildQuery(feed: RepositoryFeed): { q: string; sort: RepositorySort } {
  const last7 = getDateDaysAgo(7);
  const last30 = getDateDaysAgo(30);

  switch (feed) {
    case "top":
      return {
        q: ``,
        sort: "stars",
      };

    case "desc":
      return {
        q: ``,
        sort: "created",
      };

    case "trending":
      return {
        q: `created:>${last7}`,
        sort: "stars",
      };

    case "mostStarred":
      return {
        q: "stars:>1",
        sort: "stars",
      };

    case "recentCreated":
      return {
        q: `created:>${last30}`,
        sort: "created",
      };

    case "recentUpdated":
      return {
        q: `updated:>${last30}`,
        sort: "updated",
      };
  }
}

export function useInfiniteRepositories(feed: RepositoryFeed, perPage = 18) {
  return useInfiniteQuery({
    queryKey: ["repositories", feed, "infinite", perPage],

    queryFn: ({ pageParam = 1 }) =>
      searchRepositories({
        ...buildQuery(feed),
        page: pageParam,
        perPage,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.length * perPage;

      // GitHub gives total_count, use it for boundary
      if (loaded >= lastPage.total) return undefined;

      return allPages.length + 1;
    },

    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
}

export function useInfiniteUserRepositories(
  owner: string,
  feed: RepositoryFeed,
  perPage = 18,
) {
  return useInfiniteQuery({
    queryKey: ["user-repositories", owner, feed, "infinite", perPage],

    queryFn: async ({ pageParam = 1 }) => {
      const query = buildQuery(feed);

      const result = await searchRepositories({
        ...query,
        q: `${query.q} user:${owner}`,
        page: pageParam,
        perPage,
      });

      return result;
    },

    initialPageParam: 1,

    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.length * perPage;

      // GitHub gives total_count, use it for boundary
      if (loaded >= lastPage.total) return undefined;

      return allPages.length + 1;
    },

    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
}

function getDateDaysAgo(days: number) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split("T")[0];
}

export function useRepository(
  owner: string,
  repo: string,
  initialData?: Repository,
) {
  return useQuery({
    queryKey: ["repository", owner, repo],
    queryFn: () => getRepository(owner, repo),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    initialData: initialData,
  });
}

export function useRepositoryLanguages(
  owner: string,
  repo: string,
  initialData?: RepositoryLanguages | null,
) {
  return useQuery({
    queryKey: ["repository", owner, repo, "languages"],
    queryFn: () => getRepositoryLanguages(owner, repo),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    initialData: initialData,
  });
}

export function useRepositoryStats(owner: string, repo: string) {
  return useQuery({
    queryKey: ["repository", owner, repo, "stats"],
    queryFn: () => getRepositoryStats(owner, repo),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
}

export function useLatestRepositoryCommit(
  owner: string,
  repo: string,
  initialData?: RepositoryCommit | null,
) {
  return useQuery({
    queryKey: ["repository", owner, repo, "latest-commit"],
    queryFn: () => getLatestCommit(owner, repo),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    initialData: initialData,
  });
}

export function useRepositoryReadme(owner: string, repo: string) {
  return useQuery({
    queryKey: ["repository", owner, repo, "readme"],
    queryFn: () => getRepositoryReadme(owner, repo),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
}
