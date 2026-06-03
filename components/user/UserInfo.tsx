"use client";

import { User } from "@/models/user";
import { formatNumber, formatTimestamp } from "@/utils/format";
import Image from "next/image";
import { IoLogoGithub } from "react-icons/io";
import { Button } from "../ui/button";

export default function UserInfo({ user }: { user: User }) {
  const {
    avatarUrl,
    username,
    name,
    bio,
    followers,
    following,
    publicRepos,
    githubUrl,
    createdAt,
  } = user;

  return (
    <div className="flex flex-col sm:flex-row items-start gap-8">
      <Image
        src={avatarUrl}
        alt={`${username}'s Avatar`}
        width={500}
        height={500}
        className="size-30 md:size-40 rounded-full"
      />
      <div className="flex-1 w-full space-y-4">
        <div className="flex flex-wrap justify-between items-center gap-6">
          <div>
            {name ? (
              <>
                <h2 className="font-semibold text-2xl md:text-[32px]">
                  {name}
                </h2>
                <p className="font-mono text-[13px] text-muted-foreground">
                  @{username}
                </p>
              </>
            ) : (
              <h2 className="font-semibold text-[32px]">@{username}</h2>
            )}
          </div>
          <a href={githubUrl} target="_blank">
            <Button>
              <IoLogoGithub /> GitHub
            </Button>
          </a>
        </div>
        <div className="space-y-2">
          <p className="text-muted-foreground max-w-2xl">{bio}</p>
          <p className="text-xs text-muted-foreground">
            Joined {formatTimestamp(createdAt)}
          </p>
        </div>
        <div className="flex items-center gap-8 pt-2">
          <UserStat label="Followers" stat={formatNumber(followers)} />
          <UserStat label="Following" stat={formatNumber(following)} />
          <UserStat label="Repos" stat={formatNumber(publicRepos)} />
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
