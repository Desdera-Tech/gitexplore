import githubColors from "@/lib/colors.json";
import { cn } from "@/lib/utils";
import { Repository } from "@/models/repository";
import { LanguageName } from "@/types";
import { formatNumber, formatTimestamp } from "@/utils/format";
import Link from "next/link";
import { IoIosStarOutline } from "react-icons/io";

export default function UserRepositoryCard({
  repository,
  descriptionClass,
}: {
  repository: Repository;
  descriptionClass?: string;
}) {
  const { name, description, language, stars, owner, updatedAt } = repository;

  const langKey = language as LanguageName;
  const dotColor = githubColors[langKey]?.color || "#8b949e";

  return (
    <Link href={`/profiles/${owner.username}/repositories/${name}`}>
      <div className="bg-card flex flex-col gap-6 h-full p-6 border hover:border-primary transition-all rounded-md">
        <div className="space-y-2">
          <h3 className="font-semibold text-xl">{name}</h3>
          <p
            className={cn(
              "max-w-4xl text-sm text-muted-foreground line-clamp-4",
              descriptionClass,
            )}
          >
            {description}
          </p>
        </div>
        <div className="flex justify-between mt-auto">
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
          </div>
          <p className="font-medium text-xs text-muted-foreground">
            {formatTimestamp(updatedAt)}
          </p>
        </div>
      </div>
    </Link>
  );
}
