import githubColors from "@/lib/colors.json";
import { cn } from "@/lib/utils";
import { formatNumber, formatTimestamp } from "@/utils/format";
import Image from "next/image";
import { IoIosStarOutline } from "react-icons/io";
import { MdForkRight } from "react-icons/md";

interface RepositoryCardProps {
  authorAvatar: string;
  authorName: string;
  name: string;
  description: string;
  descriptionClass?: string;
  stars: number;
  forks: number;
  featuredLanguage: string;
  lastUpdatedAt: string;
}

type LanguageName = keyof typeof githubColors;

export default function RepositoryCard({
  authorAvatar,
  authorName,
  name,
  description,
  descriptionClass,
  stars,
  forks,
  featuredLanguage,
  lastUpdatedAt,
}: RepositoryCardProps) {
  const langKey = featuredLanguage as LanguageName;
  const dotColor = githubColors[langKey]?.color || "#8b949e";

  return (
    <div className="bg-card cursor-pointer p-6 border hover:border-primary transition-all rounded-md">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <Image
            src={authorAvatar}
            alt={`${authorName} Avatar`}
            width={500}
            height={500}
            className="size-10 rounded-sm"
          />
          <p className="text-muted-foreground font-mono">{authorName}</p>
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
            <p className="font-medium text-xs">{featuredLanguage}</p>
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
          {formatTimestamp(lastUpdatedAt)}
        </p>
      </div>
    </div>
  );
}
