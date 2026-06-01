export type RepositoryFeed =
  | "top"
  | "desc"
  | "trending"
  | "mostStarred"
  | "recentCreated"
  | "recentUpdated";

export type RepositorySort =
  | "stars"
  | "forks"
  | "help-wanted-issues"
  | "created"
  | "updated";

export interface RepositoryOwner {
  username: string;
  avatarUrl: string;
}

export interface Repository {
  id: string;
  name: string;
  fullName: string;
  description: string | null;
  githubUrl: string;
  stars: number;
  watchers: number;
  forks: number;
  language: string | null;
  owner: RepositoryOwner;
  createdAt: Date;
  updatedAt: Date;
}

export interface RepositoryLanguages {
  [key: string]: number;
}

export interface RepositoryCommit {
  sha: string;
  message: string;
  author: {
    username: string;
    avatarUrl: string;
    date: string;
  };
}

export interface RepositorySearchResponse {
  total: number;
  items: Repository[];
}

export interface RepositoryStatsResponse {
  commits: number;
  branches: number;
  tags: number;
}
