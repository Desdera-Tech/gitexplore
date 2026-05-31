import { InboxIcon } from "lucide-react";
import { Button } from "./button";

type EmptyStateProps = {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({
  title = "Nothing here yet",
  message = "No items match your current view.",
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <InboxIcon className="size-8 mb-3 text-muted-foreground" />

      <h2 className="text-lg font-semibold">{title}</h2>

      <p className="text-sm text-muted-foreground max-w-sm mt-1">{message}</p>

      {onAction && actionLabel && (
        <Button className="mt-5" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
