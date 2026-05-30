"use client";

import { formatNumber, formatTimestamp } from "@/utils/format";
import Image from "next/image";
import { IoLogoGithub } from "react-icons/io";
import { Button } from "../ui/button";

interface UserInfoProps {
  avatar: string;
  username: string;
  fullName: string;
  bio: string;
  followers: number;
  following: number;
  repos: number;
  joinedAt: string;
}

export default function UserInfo({
  avatar,
  username,
  fullName,
  bio,
  followers,
  following,
  repos,
  joinedAt,
}: UserInfoProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start gap-8">
      <Image
        src={avatar}
        alt={`${username}'s Avatar`}
        width={500}
        height={500}
        className="size-30 md:size-40 rounded-full"
      />
      <div className="flex-1 space-y-4">
        <div className="flex flex-wrap justify-between items-center gap-6">
          <div>
            <h2 className="font-semibold text-[32px]">{fullName}</h2>
            <p className="font-mono text-[13px] text-muted-foreground">
              @{username}
            </p>
          </div>
          <a href="" target="_blank">
            <Button>
              <IoLogoGithub /> GitHub
            </Button>
          </a>
        </div>
        <div className="space-y-2">
          <p className="text-muted-foreground max-w-2xl">{bio}</p>
          <p className="text-xs text-muted-foreground">
            Joined {formatTimestamp(joinedAt)}
          </p>
        </div>
        <div className="flex items-center gap-8 pt-2">
          <UserStat label="Followers" stat={formatNumber(followers)} />
          <UserStat label="Following" stat={formatNumber(following)} />
          <UserStat label="Repos" stat={formatNumber(repos)} />
        </div>
      </div>
    </div>
  );
}

function UserStat({ label, stat }: { label: string; stat: string }) {
  return (
    <div>
      <h3 className="font-semibold text-xl">{stat}</h3>
      <span className="uppercase font-medium text-xs text-muted-foreground">
        {label}
      </span>
    </div>
  );
}
