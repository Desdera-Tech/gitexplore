"use client";

import { useRepository } from "@/hooks/repositories/useRepositories";
import { Repository } from "@/models/repository";
import { formatNumber } from "@/utils/format";
import { formatDate } from "date-fns";
import { EyeIcon } from "lucide-react";
import { MdStarOutline } from "react-icons/md";

export default function RepositoryAbout({
  repository,
}: {
  repository: Repository;
}) {
  const { data: repo } = useRepository(
    repository.owner.username,
    repository.name,
    repository,
  );

  const description =
    repo?.description ||
    "No description has been provider by the author for this repository.";

  const stars = repo?.stars || 0;
  const watchers = repo?.watchers || 0;

  return (
    <div className="pb-4 border-b">
      <div className="space-y-3 pb-6 border-b">
        <h2 className="font-semibold text-xl">About</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div>
          {repo?.createdAt && (
            <p className="text-sm font-medium text-muted-foreground">
              Created on {formatDate(repo.createdAt, "MMM dd, yyyy hh:mm a")}
            </p>
          )}
          {repo?.updatedAt && (
            <p className="text-sm font-medium text-muted-foreground">
              Last updated on{" "}
              {formatDate(repo.updatedAt, "MMM dd, yyyy hh:mm a")}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4 pt-4">
        <div className="flex items-center gap-2">
          <MdStarOutline />
          <span className="font-bold text-sm">{formatNumber(stars)}</span>
          <span className="text-sm text-muted-foreground">
            star{stars !== 1 && "s"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <EyeIcon className="size-4" />
          <span className="font-bold text-sm">{formatNumber(watchers)}</span>
          <span className="text-sm text-muted-foreground">watching</span>
        </div>
      </div>
    </div>
  );
}
