import UserInfo from "@/components/user/UserInfo";
import UserTopRepos from "@/components/user/UserTopRepos";

export default async function Profile({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  return (
    <div className="space-y-16">
      <UserInfo
        avatar="https://avatars.githubusercontent.com/u/317747?v=4"
        username="leeerob"
        fullName="Lee Robinson"
        bio="Principal Software Architect specializing in distributed systems and cloud-native
        infrastructure. Building open-source tools for the next generation of web performance."
        followers={2498}
        following={2498}
        repos={2498}
        joinedAt="2026-01-30 05:25:09"
      />
      <UserTopRepos />
    </div>
  );
}
