import { PropsWithChildren, RefObject } from "react";
import { Spinner } from "./spinner";

export default function InfiniteScrollContainer({
  children,
  className,
  loadMoreRef,
  isFetchingNextPage,
}: PropsWithChildren<{
  className?: string;
  loadMoreRef: RefObject<HTMLDivElement | null>;
  isFetchingNextPage: boolean;
}>) {
  return (
    <div className={className}>
      {children}
      {/* Sentinel */}
      <div ref={loadMoreRef} className="h-10" />

      {/* Loading next page */}
      {isFetchingNextPage && (
        <div className="flex justify-center py-6">
          <Spinner />
        </div>
      )}
    </div>
  );
}
