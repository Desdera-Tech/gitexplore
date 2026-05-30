import { formatNumber } from "@/utils/format";
import Image from "next/image";

interface UserCardProps {
  avatar: string;
  username: string;
  fullName: string;
  bio: string;
  followers: number;
}

export default function UserCard({
  avatar,
  username,
  fullName,
  bio,
  followers,
}: UserCardProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center bg-card cursor-pointer gap-6 p-4 sm:p-6 border hover:border-primary transition-all rounded-md">
      <div className="flex items-start gap-4 sm:gap-6">
        <Image
          src={avatar}
          alt=""
          width={500}
          height={500}
          className="size-9 sm:size-12 rounded-full"
        />
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-lg sm:text-xl">{username}</h2>
            <span className="text-xs sm:text-sm text-muted-foreground">
              {fullName}
            </span>
          </div>
          <p className="line-clamp-2 text-xs sm:text-sm text-muted-foreground">
            {bio}
          </p>
        </div>
      </div>
      <span className="font-semibold text-xs sm:text-sm text-muted-foreground ml-auto">
        {formatNumber(followers)} followers
      </span>
    </div>
  );
}
