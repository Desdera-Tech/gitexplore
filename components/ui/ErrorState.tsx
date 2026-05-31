import { TriangleAlertIcon } from "lucide-react";
import { Button } from "./button";

type ErrorStateProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

export function ErrorState({
  title = "Something went wrong",
  message = "We couldn’t load this data. Check your connection and try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <TriangleAlertIcon className="size-8 mb-3" />

      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-muted-foreground max-w-sm">{message}</p>

      {onRetry && (
        <Button className="mt-5" onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  );
}
