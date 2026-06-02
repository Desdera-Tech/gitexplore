import { Readme } from "@/components/repo/Readme";
import RepositoryAbout from "@/components/repo/RepositoryAbout";
import RepositoryHeader from "@/components/repo/RepositoryHeader";
import RepositoryLanguages from "@/components/repo/RepositoryLanguages";
import RepositoryStats from "@/components/repo/RepositoryStats";
import { EmptyState } from "@/components/ui/EmptyState";
import { Metadata } from "next";
import {
  getCachedRepository,
  getCachedRepositoryCommit,
  getCachedRepositoryLanguages,
} from "../../actions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    username: string;
    repo: string;
  }>;
}): Promise<Metadata> {
  const { username, repo } = await params;

  const repository = await getCachedRepository(username, repo);

  if (!repository) {
    return {
      title: "Repository Not Found",
      description: `The GitHub repository ${username}/${repo} was not found.`,
    };
  }

  return {
    title: repository.fullName,
    description:
      repository.description || `${repository.fullName} repository on GitHub.`,
  };
}

export default async function RepositoryPage({
  params,
}: {
  params: Promise<{ username: string; repo: string }>;
}) {
  const { username, repo } = await params;

  const repository = await getCachedRepository(username, repo);
  if (!repository) {
    return (
      <EmptyState title="Nothing here" message="GitHub repository not found" />
    );
  }

  const commit = await getCachedRepositoryCommit(username, repo);
  const languages = await getCachedRepositoryLanguages(username, repo);

  return (
    <div className="space-y-8">
      <RepositoryHeader repository={repository} />
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-2 space-y-4 overflow-hidden">
          <RepositoryStats repository={repository} commit={commit} />
          <Readme owner={username} repo={repo} />
        </div>
        <div className="flex-1 space-y-4">
          <RepositoryAbout repository={repository} />
          <RepositoryLanguages repository={repository} languages={languages} />
        </div>
      </div>
    </div>
  );
}
