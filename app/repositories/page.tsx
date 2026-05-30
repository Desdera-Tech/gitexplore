import RepositoryCard from "@/components/repo/RepositoryCard";

export default function Repositories() {
  return (
    <div className="space-y-8">
      <div className="flex gap-4 flex-row">
        <div>
          <h2 className="text-[32px] font-semibold">Trending Repositories</h2>
          <p className="max-w-2xl text-muted-foreground">
            The projects the community is building today.
          </p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 21 }).map((_, i) => (
          <RepositoryCard
            key={i}
            authorAvatar="https://avatars.githubusercontent.com/u/317747?v=4"
            authorName="facebook"
            name="react-engine"
            description="A high-performance rendering engine for large-scale React applications with built-in streaming capabilities with native performance"
            stars={2409}
            forks={1890}
            featuredLanguage="TypeScript"
            lastUpdatedAt="2026-01-30 05:25:09"
          />
        ))}
      </div>
    </div>
  );
}
