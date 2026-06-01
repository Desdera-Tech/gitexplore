"use client";

import {
  useLatestRepositoryCommit,
  useRepositoryStats,
} from "@/hooks/repositories/useRepositories";
import { Repository, RepositoryCommit } from "@/models/repository";
import { HistoryIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function RepositoryStats({
  repository,
  commit,
}: {
  repository: Repository;
  commit: RepositoryCommit | null;
}) {
  const { data: repoStats } = useRepositoryStats(
    repository.owner.username,
    repository.name,
  );

  const { data: repoCommit } = useLatestRepositoryCommit(
    repository.owner.username,
    repository.name,
    commit,
  );

  const commits = repoStats?.commits || 0;
  const branches = repoStats?.branches || 0;
  const tags = repoStats?.tags || 0;

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between gap-4 bg-muted/70 p-4 border-b">
        <div className="flex items-center gap-3">
          <Image
            src={repoCommit?.author.avatarUrl || ""}
            alt=""
            width={200}
            height={200}
            className="size-6 rounded-full"
          />
          <div className="flex items-center gap-1">
            <Link
              href={`/profiles/${repoCommit?.author.username}`}
              className="font-bold text-sm text-nowrap hover:underline"
            >
              {repoCommit?.author.username}:
            </Link>
            <p className="font-medium text-sm text-muted-foreground line-clamp-1">
              {(repoCommit?.message || "").split("\n\n")[0]}
            </p>
          </div>
        </div>
        <span className="text-xs font-mono text-muted-foreground">
          {(repoCommit?.sha || "").substring(0, 6)}
        </span>
      </div>
      <div className="flex items-start bg-card hover:bg-card/30 p-4 gap-6">
        <HistoryIcon className="size-4 mt-0.5" />
        <div className="flex flex-wrap items-center *:mr-6 *:mb-1">
          <span className="text-sm">
            {commits} commit{commits !== 1 && "s"}
          </span>
          <span className="text-sm">
            {branches} branch{branches !== 1 && "es"}
          </span>
          <span className="text-sm">
            {tags} tag{tags !== 1 && "s"}
          </span>
        </div>
      </div>
    </div>
  );
}
