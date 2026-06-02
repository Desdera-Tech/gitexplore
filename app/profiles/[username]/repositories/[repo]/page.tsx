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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="order-1 md:col-span-2 md:row-start-1">
          <RepositoryStats repository={repository} commit={commit} />
        </div>

        <div className="space-y-4 order-2 md:col-span-1 md:row-start-1 md:row-span-2">
          <RepositoryAbout repository={repository} />
          <RepositoryLanguages repository={repository} languages={languages} />
        </div>

        <div className="overflow-hidden order-3 md:col-span-2 md:row-start-2">
          <Readme owner={username} repo={repo} />
        </div>
      </div>
    </div>
  );
}
