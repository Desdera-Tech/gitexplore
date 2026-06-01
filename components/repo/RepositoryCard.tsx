import githubColors from "@/lib/colors.json";
import { cn } from "@/lib/utils";
import { Repository } from "@/models/repository";
import { LanguageName } from "@/types";
import { formatNumber, formatTimestamp } from "@/utils/format";
import Image from "next/image";
import Link from "next/link";
import { IoIosStarOutline } from "react-icons/io";
import { MdForkRight } from "react-icons/md";

interface RepositoryCardProps {
  repository: Repository;
  descriptionClass?: string;
}

export default function RepositoryCard({
  repository,
  descriptionClass,
}: RepositoryCardProps) {
  const {
    owner: { username, avatarUrl },
    name,
    description,
    language,
    stars,
    forks,
    updatedAt,
  } = repository;

  const langKey = language as LanguageName;
  const dotColor = githubColors[langKey]?.color || "#8b949e";

  return (
    <Link href={`/profiles/${username}/repositories/${name}`}>
      <div className="bg-card h-full p-6 border hover:border-primary transition-all rounded-md">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Image
              src={avatarUrl}
              alt={`${username}'s Avatar`}
              width={500}
              height={500}
              className="size-10 rounded-sm"
            />
            <p className="text-muted-foreground font-mono">{username}</p>
          </div>
          <div className="pt-2">
            <h3 className="font-semibold text-xl">{name}</h3>
          </div>
          <p
            className={cn(
              "max-w-4xl text-sm text-muted-foreground line-clamp-2",
              descriptionClass,
            )}
          >
            {description}
          </p>
        </div>
        <div className="flex justify-between pt-6">
          <div className="flex gap-4">
            <div className="flex items-center text-muted-foreground gap-1.5">
              <div
                className={cn("size-3 rounded-full")}
                style={{ backgroundColor: dotColor }}
              />
              <p className="font-medium text-xs">{language}</p>
            </div>
            <div className="flex items-center text-muted-foreground gap-1">
              <IoIosStarOutline className="size-4" />
              <p className="font-medium text-xs">{formatNumber(stars)}</p>
            </div>
            <div className="flex items-center text-muted-foreground gap-1">
              <MdForkRight className="size-4" />
              <p className="font-medium text-xs">{formatNumber(forks)}</p>
            </div>
          </div>
          <p className="font-medium text-xs text-muted-foreground">
            {formatTimestamp(updatedAt)}
          </p>
        </div>
      </div>
    </Link>
  );
}
