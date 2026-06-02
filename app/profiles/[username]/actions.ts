import {
  getLatestCommit,
  getRepository,
  getRepositoryLanguages,
} from "@/services/repositories";
import { getUser } from "@/services/users";
import { cache } from "react";
import { toast } from "sonner";

export const getCachedUser = cache(async (username: string) => {
  try {
    return await getUser(username);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An error occurred";
    toast.error(message);

    console.error(error);
    return null;
  }
});

export const getCachedRepository = cache(
  async (owner: string, repo: string) => {
    try {
      return await getRepository(owner, repo);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An error occurred";
      toast.error(message);

      console.error(error);
      return null;
    }
  },
);

export const getCachedRepositoryCommit = cache(
  async (owner: string, repo: string) => {
    try {
      return await getLatestCommit(owner, repo);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An error occurred";
      toast.error(message);

      console.error(error);
      return null;
    }
  },
);

export const getCachedRepositoryLanguages = cache(
  async (owner: string, repo: string) => {
    try {
      return await getRepositoryLanguages(owner, repo);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An error occurred";
      toast.error(message);

      console.error(error);
      return null;
    }
  },
);
