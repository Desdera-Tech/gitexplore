import UserRepos from "@/components/user/UserRepos";
import Link from "next/link";

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
      <UserRepos username={username} feed="desc" shouldLoadMore />
    </div>
  );
}
