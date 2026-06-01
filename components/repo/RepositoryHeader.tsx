"use client";

import { useRepository } from "@/hooks/repositories/useRepositories";
import { Repository } from "@/models/repository";
import Link from "next/link";
import { IoLogoGithub } from "react-icons/io";
import { Button } from "../ui/button";

export default function RepositoryHeader({
  repository,
}: {
  repository: Repository;
}) {
  const { data: repo } = useRepository(
    repository.owner.username,
    repository.name,
    repository,
  );

  return (
    <div className="flex flex-wrap gap-4 items-center justify-between pb-4 border-b">
      <div className="flex flex-wrap items-center">
        <Link
          href={`/profiles/${repo?.owner.username}`}
          className="mr-2 text-sm text-muted-foreground hover:underline"
        >
          {repo?.owner.username}
        </Link>
        <span className="mr-2 text-muted-foreground">/</span>
        <span className="mr-2 text-xl font-bold">{repo?.name}</span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <a href={repo?.githubUrl} target="_blank">
          <Button>
            <IoLogoGithub />
            GitHub
          </Button>
        </a>
      </div>
    </div>
  );
}
