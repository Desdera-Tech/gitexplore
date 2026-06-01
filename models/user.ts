export interface User {
  id: string;
  name: string | null;
  username: string;
  bio: string | null;
  avatarUrl: string;
  githubUrl: string;
  followers: number;
  following: number;
  publicRepos: number;
  createdAt: Date;
  updatedAt: Date;
}
