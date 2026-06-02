import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/EmptyState";
import UserInfo from "@/components/user/UserInfo";
import UserRepos from "@/components/user/UserRepos";
import { ArrowRightIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { getCachedUser } from "./actions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;

  const user = await getCachedUser(username);
  if (!user) {
    return {
      title: "Profile Not Found",
      description: `The GitHub profile for ${username} was not found.`,
    };
  }

  return {
    title: user.name ? `${user.name} (@${user.username})` : `@${user.username}`,

    description:
      user.bio ||
      `Explore ${user.username}'s GitHub profile, repositories, followers, and contributions.`,

    openGraph: {
      title: `${user.username} on GitExplore`,
      description: user.bio || `GitHub developer profile for ${user.username}.`,
      images: [
        {
          url: user.avatarUrl,
        },
      ],
    },
  };
}

export default async function Profile({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const user = await getCachedUser(username);
  if (!user) {
    return (
      <EmptyState
        title="Nothing here"
        message="This github profile was not found"
      />
    );
  }

  return (
    <div className="space-y-16">
      <UserInfo user={user} />
      <div className="space-y-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-semibold text-xl">Top Repositories</h2>
          <div>
            <Link href={`/profiles/${username}/repositories`}>
              <Button className="px-0 text-muted-foreground" variant="link">
                View all <ArrowRightIcon />
              </Button>
            </Link>
          </div>
        </div>
        <UserRepos username={username} perPage={6} feed="top" />
      </div>
    </div>
  );
}
