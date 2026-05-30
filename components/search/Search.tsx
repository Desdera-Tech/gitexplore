"use client";

import { useSearchFilter } from "@/hooks/useSearchFilter";
import { SearchIcon } from "lucide-react";
import RepositoryCard from "../repo/RepositoryCard";
import { Input } from "../ui/input";
import UserCard from "../user/UserCard";
import FilterPill from "./FilterPill";

export default function Search() {
  const { filters, filterType, setFilterType } = useSearchFilter();

  const placeholders = () => {
    switch (filterType) {
      case "repositories":
        return "Search by repository name or description";

      case "users":
        return "Search for users by their username";

      default:
        return "Search for repositories and/or users";
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6.5">
        <div className="flex gap-4">
          <div className="flex-1 w-full relative">
            <SearchIcon className="absolute size-5 text-muted-foreground left-3 transform top-1/2 -translate-y-1/2" />
            <Input
              className="bg-card h-12 pl-10 ring-0!"
              placeholder={placeholders()}
            />
          </div>
          {filterType === "repositories" && (
            <div className="flex-1 w-full relative">
              <SearchIcon className="absolute size-5 text-muted-foreground left-3 transform top-1/2 -translate-y-1/2" />
              <Input
                className="bg-card h-12 pl-10 ring-0!"
                placeholder="Enter repository author"
              />
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <FilterPill
              label={
                filter === "all"
                  ? "All Results"
                  : `${filter[0].toUpperCase()}${filter.slice(1, filter.length)}`
              }
              selected={filter === filterType}
              onClick={() => setFilterType(filter)}
            />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <p className="font-medium text-xs text-muted-foreground">
          Showing 4,291 results
        </p>
        {Array.from({ length: 5 }).map((_, i) => (
          <UserCard
            key={i}
            avatar="https://avatars.githubusercontent.com/u/317747?v=4"
            username="leeerob"
            fullName="Lee Robinson"
            bio="VP of Product at Vercel. Creator and Educator."
            followers={2498}
          />
        ))}
        {Array.from({ length: 21 }).map((_, i) => (
          <RepositoryCard
            key={i}
            authorAvatar="https://avatars.githubusercontent.com/u/317747?v=4"
            authorName="facebook"
            name="react-engine"
            description="A high-performance rendering engine for large-scale React applications with built-in streaming capabilities with native performance"
            descriptionClass="line-clamp-4"
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
