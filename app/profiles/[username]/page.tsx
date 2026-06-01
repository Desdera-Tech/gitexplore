import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/EmptyState";
import UserInfo from "@/components/user/UserInfo";
import UserRepos from "@/components/user/UserRepos";
import { getUser } from "@/services/users";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { cache } from "react";
import { toast } from "sonner";

export const getCachedUser = cache(async (username: string) => {
  try {
    return await getUser(username);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An error occurred";
    toast.error(message);

    console.error(error);
    return null;
  }
});

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
