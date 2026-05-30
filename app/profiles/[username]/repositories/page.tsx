import UserRepositoryCard from "@/components/repo/UserRepositoryCard";
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
          <Link href="/profiles/1" className="hover:underline">
            @leeerob
          </Link>{" "}
          Repositories
        </h2>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 30 }).map((_, i) => (
          <UserRepositoryCard
            key={i}
            name="react-engine"
            description="A high-performance rendering engine for large-scale React applications with built-in streaming capabilities with native performance"
            stars={2409}
            featuredLanguage="TypeScript"
            lastUpdatedAt="2026-01-30 05:25:09"
          />
        ))}
      </div>
    </div>
  );
}
