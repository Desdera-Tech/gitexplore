"use client";

import {
  useSearchRepositories,
  useSearchUsers,
} from "@/hooks/repositories/useSearch";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useSearchFilter } from "@/hooks/useSearchFilter";
import { flattenPaginatedPage } from "@/utils/format";
import { SearchIcon } from "lucide-react";
import RepositoryCard from "../repo/RepositoryCard";
import { EmptyState } from "../ui/EmptyState";
import { ErrorState } from "../ui/ErrorState";
import InfiniteScrollContainer from "../ui/InfiniteScrollContainer";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";
import UserCard from "../user/UserCard";
import FilterPill from "./FilterPill";

export default function Search() {
  const {
    search,
    filters,
    filterType,
    setFilterType,
    searchValue,
    setSearchValue,
  } = useSearchFilter();

  const placeholders = () => {
    switch (filterType) {
      case "repositories":
        return "Search by repository name or description";

      case "users":
        return "Search for users by their username";

      default:
        return "";
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6.5">
        <div className="flex gap-4">
          <div className="flex-1 w-full relative">
            <SearchIcon className="absolute size-5 text-muted-foreground left-3 transform top-1/2 -translate-y-1/2" />
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="bg-card h-12 pl-10 ring-0!"
              placeholder={placeholders()}
              autoFocus
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter, i) => (
            <FilterPill
              key={i}
              label={`${filter[0].toUpperCase()}${filter.slice(1, filter.length)}`}
              selected={filter === filterType}
              onClick={() => setFilterType(filter)}
            />
          ))}
        </div>
      </div>
      {filterType === "repositories" && <Repositories search={search} />}
      {filterType === "users" && <Users search={search} />}
    </div>
  );
}

function Repositories({ search }: { search: string }) {
  const {
    data,
    isPending,
    isEnabled,
    isError,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSearchRepositories(search ? `${search} in:name` : "");

  const loadMoreRef = useInfiniteScroll(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, !!hasNextPage);

  const repositories = flattenPaginatedPage(data);

  const pending = isPending && isEnabled;

  if (pending) {
    return <Spinner className="mx-auto my-10" />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Failed to search repositories"
        message="An error occurred while trying to search for repositories"
        onRetry={() => refetch()}
      />
    );
  }

  if (repositories.length == 0) {
    if (search) {
      return (
        <EmptyState
          title="No repositories found"
          message="No items match your current search."
        />
      );
    } else {
      return (
        <EmptyState
          title="Start a search"
          message="Enter a repository name and/or author to view results"
        />
      );
    }
  }

  return (
    <InfiniteScrollContainer
      loadMoreRef={loadMoreRef}
      isFetchingNextPage={isFetchingNextPage}
      className="flex flex-col gap-4"
    >
      {repositories.map((repo) => (
        <RepositoryCard key={repo.id} repository={repo} />
      ))}
    </InfiniteScrollContainer>
  );
}

function Users({ search }: { search: string }) {
  const {
    data,
    isPending,
    isEnabled,
    isError,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSearchUsers(search);

  const loadMoreRef = useInfiniteScroll(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, !!hasNextPage);

  const users = flattenPaginatedPage(data);

  const pending = isPending && isEnabled;

  if (pending) {
    return <Spinner className="mx-auto my-10" />;
  }

  if (isError) {
    return (
      <ErrorState title="Failed to search users" onRetry={() => refetch()} />
    );
  }

  if (users.length == 0) {
    if (search) {
      return (
        <EmptyState
          title="No users found"
          message="No items match your current search."
        />
      );
    } else {
      return (
        <EmptyState
          title="Start a search"
          message="Enter a name to search for profiles"
        />
      );
    }
  }

  return (
    <InfiniteScrollContainer
      loadMoreRef={loadMoreRef}
      isFetchingNextPage={isFetchingNextPage}
      className="flex flex-col gap-4"
    >
      {users.map((user) => (
        <UserCard key={user.username} user={user} />
      ))}
    </InfiniteScrollContainer>
  );
}
