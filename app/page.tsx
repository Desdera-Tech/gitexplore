import TrendingRepos from "@/components/explore/TrendingRepos";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, SearchIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="flex justify-center items-center pb-8">
        <div className="max-w-2xl space-y-6">
          <h1 className="font-semibold text-[32px] text-center">
            Get more insights and stats on GitHub resources
          </h1>
          <Link href="/search">
            <div className="flex items-center bg-card text-muted-foreground rounded-md w-full h-14.5 border-[1.5px] px-4 gap-4 cursor-pointer">
              <SearchIcon />
              <p className="pointer-events-none">Search...</p>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Trending Repositories</h2>
          <p className="text-sm text-muted-foreground">
            The projects the community is building today.
          </p>
        </div>
        <div>
          <Link href="/repositories">
            <Button className="px-0" variant="link">
              View all trending <ArrowRightIcon />
            </Button>
          </Link>
        </div>
      </div>
      <TrendingRepos perPage={6} />
    </div>
  );
}
