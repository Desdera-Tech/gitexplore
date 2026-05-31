import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";

const filters = ["all", "repositories", "users"] as const;

type FilterType = (typeof filters)[number];

export function useSearchFilter() {
  const [filterType, setFilterType] = useState<FilterType>("all");

  const [search, setSearch] = useDebounceValue("", 300);
  const [author, setAuthor] = useDebounceValue("", 300);

  return {
    filters,
    filterType,
    setFilterType,
    search,
    setSearch,
    author,
    setAuthor,
  };
}
