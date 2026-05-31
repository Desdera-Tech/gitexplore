import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import UserRepositoryCard from "../repo/UserRepositoryCard";
import { Button } from "../ui/button";

export default function UserTopRepos() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-semibold text-xl">Top Repositories</h2>
        <div>
          <Link href="/profiles/1/repositories">
            <Button className="px-0 text-muted-foreground" variant="link">
              View all <ArrowRightIcon />
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
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
