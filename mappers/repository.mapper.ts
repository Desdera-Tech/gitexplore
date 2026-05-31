import { GithubRepository, GithubRepositoryCommit } from "@/models/github";
import { Repository, RepositoryCommit } from "@/models/repository";

export function mapGithubRepository(repo: GithubRepository): Repository {
  return {
    id: String(repo.id),

    name: repo.name,
    fullName: repo.full_name,

    description: repo.description ?? "",

    githubUrl: repo.html_url,

    stars: repo.stargazers_count,
    watchers: repo.subscribers_count,
    forks: repo.forks,

    language: repo.language ?? "Unknown",

    owner: {
      username: repo.owner.login,
      avatarUrl: repo.owner.avatar_url,
    },

    createdAt: repo.created_at,
    updatedAt: repo.updated_at,
  };
}

export function mapGithubRepositories(
  repositories: GithubRepository[],
): Repository[] {
  return repositories.map(mapGithubRepository);
}

export function mapGithubRepositoryCommit(
  commits: GithubRepositoryCommit[],
): RepositoryCommit {
  const githubCommit = commits[0];
  if (!githubCommit) {
    return {
      sha: "",
      message: "",
      author: {
        username: "",
        avatarUrl: "",
        date: "",
      },
    };
  }

  const { sha, commit, author } = githubCommit;

  return {
    sha,
    message: commit.message,
    author: {
      username: commit.author.name,
      avatarUrl: author?.avatar_url || "",
      date: commit.author.date,
    },
  };
}
