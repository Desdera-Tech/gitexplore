"use client";

import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { Input } from "../ui/input";
import UserRepos from "./UserRepos";

export default function AllUserRepos({ username }: { username: string }) {
  const [searchValue, setSearchValue] = useState("");
  const [search] = useDebounceValue(searchValue, 300);

  return (
    <>
      <div className="flex-1 w-full relative">
        <SearchIcon className="absolute size-5 text-muted-foreground left-3 transform top-1/2 -translate-y-1/2" />
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="bg-card h-12 pl-10 ring-0!"
          placeholder={`Search for a repository by @${username}`}
        />
      </div>
      <UserRepos
        query={search}
        username={username}
        feed="desc"
        shouldLoadMore
      />
    </>
  );
}
