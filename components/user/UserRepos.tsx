"use client";

import { useInfiniteUserRepositories } from "@/hooks/repositories/useRepositories";
import { useUser } from "@/hooks/repositories/useUsers";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { RepositoryFeed } from "@/models/repository";
import { flattenPaginatedPage } from "@/utils/format";
import UserRepositoryCard from "../repo/UserRepositoryCard";
import { EmptyState } from "../ui/EmptyState";
import { ErrorState } from "../ui/ErrorState";
import InfiniteScrollContainer from "../ui/InfiniteScrollContainer";
import { Spinner } from "../ui/spinner";

export default function UserRepos({
  query,
  username,
  perPage = 18,
  feed,
  shouldLoadMore,
}: {
  query?: string;
  username: string;
  perPage?: number;
  feed: RepositoryFeed;
  shouldLoadMore?: boolean;
}) {
  const { data: user, isPending: isUserPending } = useUser(username);
  const repos = user?.publicRepos || 0;

  const {
    data,
    isPending,
    isEnabled,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteUserRepositories({
    q: query,
    owner: username,
    feed,
    perPage,
    enabled: repos > 0,
  });

  const loadMoreRef = useInfiniteScroll(() => {
    if (shouldLoadMore && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, !!hasNextPage);
  const pending = (isPending && isEnabled) || isUserPending;

  const repositories = flattenPaginatedPage(data);

  if (pending) return <Spinner className="mx-auto" />;

  if (error)
    return (
      <ErrorState
        onRetry={() => refetch()}
        message="Failed to load repositories."
      />
    );

  if (!repositories.length) {
    if (query) {
      return (
        <EmptyState
          title="No repositories found"
          message="No items match your current search."
        />
      );
    } else {
      return (
        <EmptyState
          title="No repositories found"
          message="Please check back at a different time."
          actionLabel="Refresh"
          onAction={repos > 0 ? () => refetch() : undefined}
        />
      );
    }
  }

  return (
    <InfiniteScrollContainer
      className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
      loadMoreRef={loadMoreRef}
      isFetchingNextPage={isFetchingNextPage}
    >
      {repositories.map((repository, i) => (
        <UserRepositoryCard key={i} repository={repository} />
      ))}
    </InfiniteScrollContainer>
  );
}
