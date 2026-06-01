"use client";

import { useInfiniteUserRepositories } from "@/hooks/repositories/useRepositories";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { RepositoryFeed } from "@/models/repository";
import { flattenRepositories } from "@/services/repositories";
import UserRepositoryCard from "../repo/UserRepositoryCard";
import { EmptyState } from "../ui/EmptyState";
import { ErrorState } from "../ui/ErrorState";
import InfiniteScrollContainer from "../ui/InfiniteScrollContainer";
import { Spinner } from "../ui/spinner";

export default function UserRepos({
  username,
  perPage = 18,
  shouldLoadMore,
  feed,
}: {
  username: string;
  perPage?: number;
  shouldLoadMore?: boolean;
  feed: RepositoryFeed;
}) {
  const {
    data,
    isPending,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteUserRepositories(username, feed, perPage);

  const loadMoreRef = useInfiniteScroll(() => {
    if (shouldLoadMore && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, !!hasNextPage);

  const repositories = flattenRepositories(data);

  if (isPending) return <Spinner className="mx-auto" />;
  if (error)
    return (
      <ErrorState
        onRetry={() => refetch()}
        message="Failed to load repositories."
      />
    );

  if (!repositories.length) {
    return (
      <EmptyState
        title="No repositories found"
        message="Please check back at a different time."
        actionLabel="Refresh"
        onAction={() => refetch()}
      />
    );
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
