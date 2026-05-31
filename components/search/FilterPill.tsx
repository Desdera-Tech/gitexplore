import { cn } from "@/lib/utils";

interface FilterPillProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export default function FilterPill({
  label,
  selected,
  onClick,
}: FilterPillProps) {
  return (
    <div
      className={cn(
        "px-6 py-2 rounded-full font-medium text-xs cursor-pointer transition-all",
        selected
          ? "bg-primary text-primary-foreground"
          : "bg-card text-primary border hover:bg-muted",
      )}
      onClick={onClick}
    >
      {label}
    </div>
  );
}
