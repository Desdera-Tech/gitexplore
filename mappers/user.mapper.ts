import { GithubSearchUser, GithubUser } from "@/models/github";
import { User } from "@/models/user";

export function mapGithubUser(user: GithubUser): User {
  return {
    id: String(user.id),
    name: user.name,
    username: user.login,
    bio: user.bio,
    avatarUrl: user.avatar_url,
    githubUrl: user.html_url,
    followers: user.followers,
    following: user.following,
    publicRepos: user.public_repos,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
  };
}

export function mapGithubSearchUser(user: GithubSearchUser): User {
  return {
    id: "",
    name: user.name,
    username: user.login,
    bio: user.bio,
    avatarUrl: user.avatarUrl,
    githubUrl: "",
    followers: user.followers.totalCount,
    following: 0,
    publicRepos: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export function mapGithubSearchUsers(users: GithubSearchUser[]): User[] {
  return users.filter((user) => user && user.login).map(mapGithubSearchUser);
}
