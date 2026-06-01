import { api } from "@/lib/api";
import { mapGithubUser } from "@/mappers/user.mapper";
import { GithubUser } from "@/models/github";
import { User } from "@/models/user";

export async function getUser(username: string): Promise<User> {
  const { data: user } = await api.get<GithubUser>(`/users/${username}`);

  return mapGithubUser(user);
}
