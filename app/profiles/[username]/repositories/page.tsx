import AllUserRepos from "@/components/user/AllUserRepos";
import { Metadata } from "next";
import Link from "next/link";
import { getCachedUser } from "../actions";

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
    title: `${user.username}'s Repositories`,
    description: `Browse all public repositories owned by ${user.username}.`,
  };
}

export default async function ProfileRepositories({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-semibold text-xl">
          <Link href={`/profiles/${username}`} className="hover:underline">
            @{username}
          </Link>{" "}
          Repositories
        </h2>
      </div>
      <AllUserRepos username={username} />
    </div>
  );
}
