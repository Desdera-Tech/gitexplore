import githubColors from "@/lib/colors.json";
import { cn } from "@/lib/utils";
import { LanguageName } from "@/types";
import { formatNumber, formatTimestamp } from "@/utils/format";
import { IoIosStarOutline } from "react-icons/io";

interface UserRepositoryCardProps {
  name: string;
  description: string;
  descriptionClass?: string;
  stars: number;
  featuredLanguage: string;
  lastUpdatedAt: string;
}

export default function UserRepositoryCard({
  name,
  description,
  descriptionClass,
  stars,
  featuredLanguage,
  lastUpdatedAt,
}: UserRepositoryCardProps) {
  const langKey = featuredLanguage as LanguageName;
  const dotColor = githubColors[langKey]?.color || "#8b949e";

  return (
    <div className="bg-card cursor-pointer p-6 border hover:border-primary transition-all rounded-md">
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
        </div>
        <p className="font-medium text-xs text-muted-foreground">
          {formatTimestamp(lastUpdatedAt)}
        </p>
      </div>
    </div>
  );
}
