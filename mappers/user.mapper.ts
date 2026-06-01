import { GithubUser } from "@/models/github";
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
