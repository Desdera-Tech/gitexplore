"use client";

import TrendingRepos from "@/components/explore/TrendingRepos";

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
      <TrendingRepos shouldLoadMore={true} />
    </div>
  );
}
