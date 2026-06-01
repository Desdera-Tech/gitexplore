"use client";

import { useInfiniteRepositories } from "@/hooks/repositories/useRepositories";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { flattenPaginatedPage } from "@/utils/format";
import RepositoryCard from "../repo/RepositoryCard";
import { EmptyState } from "../ui/EmptyState";
import { ErrorState } from "../ui/ErrorState";
import InfiniteScrollContainer from "../ui/InfiniteScrollContainer";
import { Spinner } from "../ui/spinner";

export default function TrendingRepos({
  perPage = 18,
  shouldLoadMore,
}: {
  perPage?: number;
  shouldLoadMore?: boolean;
}) {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteRepositories("trending", perPage);

  const loadMoreRef = useInfiniteScroll(() => {
    if (shouldLoadMore && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, !!hasNextPage);

  const repositories = flattenPaginatedPage(data);

  if (isLoading) return <Spinner className="mx-auto" />;
  if (error)
    return (
      <ErrorState
        onRetry={() => refetch()}
        message="Failed to load trending repositories."
      />
    );

  if (!repositories.length) {
    return (
      <EmptyState
        title="No trending repositories found"
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
        <RepositoryCard key={i} repository={repository} />
      ))}
    </InfiniteScrollContainer>
  );
}
