import Search from "@/components/search/Search";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search GitHub Repositories and Developers",
  description:
    "Search GitHub repositories, developers, organizations, and open-source projects using GitExplore.",
};

export default function SearchPage() {
  return (
    <div className="space-y-8">
      <Search />
    </div>
  );
}
