// Repository
export interface GithubRepositoryOwner {
  login: string;
  avatar_url: string;
}

export interface GithubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  subscribers_count: number;
  forks: number;
  language: string | null;
  owner: GithubRepositoryOwner;
  created_at: Date;
  updated_at: Date;
}

export interface GithubRepositoryCommit {
  sha: string;
  commit: {
    author: {
      name: string;
      date: string;
    };
    message: string;
  };
  author: {
    avatar_url: string;
  } | null;
}

export interface GithubRepositorySearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GithubRepository[];
}

export interface GithubReadme {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string | null;
  type: string;
  content: string;
  encoding: string;
}

// User
export interface GithubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  created_at: Date;
  updated_at: Date;
}

export interface GithubSearchUser {
  login: string;
  avatarUrl: string;
  name: string | null;
  bio: string | null;
  followers: {
    totalCount: number;
  };
}
