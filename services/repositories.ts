import { api } from "@/lib/api";
import {
  mapGithubRepositories,
  mapGithubRepository,
  mapGithubRepositoryCommit,
} from "@/mappers/repository.mapper";
import {
  GithubReadme,
  GithubRepository,
  GithubRepositoryCommit,
  GithubRepositorySearchResponse,
} from "@/models/github";
import {
  Repository,
  RepositoryLanguages,
  RepositorySearchResponse,
  RepositorySort,
  RepositoryStatsResponse,
} from "@/models/repository";

interface SearchRepositoriesParams {
  q: string;
  sort?: RepositorySort;
  order?: "asc" | "desc";
  page?: number;
  perPage?: number;
}

export async function searchRepositories({
  q,
  sort,
  order = "desc",
  page = 1,
  perPage = 18,
}: SearchRepositoriesParams): Promise<RepositorySearchResponse> {
  const { data } = await api.get<GithubRepositorySearchResponse>(
    "/search/repositories",
    {
      params: {
        q,
        sort,
        order,
        page,
        per_page: perPage,
      },
    },
  );

  return { total: data.total_count, items: mapGithubRepositories(data.items) };
}

export function flattenRepositories(data?: {
  pages: { items: Repository[] }[];
}) {
  return data?.pages.flatMap((page) => page.items) ?? [];
}

export async function getRepository(
  owner: string,
  repo: string,
): Promise<Repository> {
  const { data: repository } = await api.get<GithubRepository>(
    `/repos/${owner}/${repo}`,
  );

  return mapGithubRepository(repository);
}

export async function getRepositoryLanguages(
  owner: string,
  repo: string,
): Promise<RepositoryLanguages> {
  const { data: repository } = await api.get<RepositoryLanguages>(
    `/repos/${owner}/${repo}/languages`,
  );

  return repository;
}

export async function getRepositoryStats(
  owner: string,
  repo: string,
): Promise<RepositoryStatsResponse> {
  const [branchesRes, tagsRes, commitsRes] = await Promise.all([
    api.get(`/repos/${owner}/${repo}/branches`, {
      params: { per_page: 1 },
    }),

    api.get(`/repos/${owner}/${repo}/tags`, {
      params: { per_page: 1 },
    }),

    api.get(`/repos/${owner}/${repo}/commits`, {
      params: { per_page: 1 },
    }),
  ]);

  return {
    branches: getLastPage(branchesRes.headers.link),
    tags: getLastPage(tagsRes.headers.link),
    commits: getLastPage(commitsRes.headers.link),
  };
}

export async function getLatestCommit(owner: string, repo: string) {
  const { data } = await api.get<GithubRepositoryCommit[]>(
    `/repos/${owner}/${repo}/commits`,
    {
      params: {
        per_page: 1,
      },
    },
  );

  return mapGithubRepositoryCommit(data);
}

export async function getRepositoryReadme(owner: string, repo: string) {
  const { data } = await api.get<GithubReadme>(
    `/repos/${owner}/${repo}/readme`,
  );

  return data;
}

function getLastPage(link?: string): number {
  if (!link) return 1;

  const match = link.match(/page=(\d+)>; rel="last"/);

  if (match) {
    return Number(match[1]);
  }

  return 1;
}
