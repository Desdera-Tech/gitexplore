import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";

const filters = ["repositories", "users"] as const;

type FilterType = (typeof filters)[number];

export function useSearchFilter() {
  const [filterType, setFilterType] = useState<FilterType>("repositories");

  const [searchValue, setSearchValue] = useState("");
  const [search] = useDebounceValue(searchValue, 300);

  return {
    filters,
    filterType,
    setFilterType,

    search,
    searchValue,
    setSearchValue,
  };
}
