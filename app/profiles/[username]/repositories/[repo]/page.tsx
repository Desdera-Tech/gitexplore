import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import githubColors from "@/lib/colors.json";
import { cn } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import { IoMdStar } from "react-icons/io";
import { MdForkRight, MdStarOutline } from "react-icons/md";

export default async function RepositoryPage({
  params,
}: {
  params: Promise<{ repo: string }>;
}) {
  const { repo } = await params;

  const languagesData = [
    { language: "TypeScript", percentage: 78.2 },
    { language: "C++", percentage: 14.8 },
    { language: "Python", percentage: 7.0 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap items-center">
          <span className="mr-2 text-sm text-muted-foreground">
            vanguard-labs
          </span>
          <span className="mr-2 text-muted-foreground">/</span>
          <span className="mr-2 text-xl font-bold">quantum-engine-sdk</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button className="bg-card" variant="outline">
            <EyeIcon className="text-muted-foreground" /> Watch{" "}
            <span className="ml-1 font-bold text-xs">428</span>
          </Button>
          <Button className="bg-card" variant="outline">
            <MdForkRight className="text-muted-foreground" /> Fork{" "}
            <span className="ml-1 font-bold text-xs">1.2k</span>
          </Button>
          <Button>
            <IoMdStar /> Star{" "}
            <span className="ml-1 font-bold text-xs">8,421</span>
          </Button>
        </div>
      </div>
      <Separator />
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-2">
          <div className="bg-card p-6 rounded-lg border">
            <div className="space-y-3 pb-6 border-b">
              <h2 className="font-semibold text-xl">About</h2>
              <p className="text-sm text-muted-foreground">
                Universal SDK for quantum circuit design, simulation, and
                hardware deployment. Built for technical precision and
                high-performance laboratory environments.
              </p>
              <p className="text-sm font-medium text-muted-foreground">
                Created on Jan 02, 2025 11:09 PM
              </p>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-2">
                <MdStarOutline />
                <span className="font-bold text-sm">8.4k</span>
                <span className="text-sm text-muted-foreground">stars</span>
              </div>
              <div className="flex items-center gap-2">
                <EyeIcon className="size-4" />
                <span className="font-bold text-sm">428</span>
                <span className="text-sm text-muted-foreground">watching</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <div className="space-y-4 pb-4 border-b">
            <h2 className="font-semibold text-xl">Languages</h2>
            <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted">
              {languagesData.map((item) => {
                const langKey = item.language as LanguageName;
                const barColor = githubColors[langKey]?.color || "#8b949e";
                return (
                  <div
                    key={item.language}
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: barColor,
                    }}
                  />
                );
              })}
            </div>
            <div className="flex *:mr-8 *:mb-2 flex-wrap">
              {languagesData.map((item) => (
                <RepoLanguage
                  key={item.language}
                  language={item.language}
                  percentage={item.percentage.toFixed(1)}
                />
              ))}
            </div>
          </div>
          <div className="pb-4 border-b">
            <p className="text-sm font-medium text-muted-foreground">
              Last updated on Jan 02, 2025 11:09 PM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

type LanguageName = keyof typeof githubColors;

function RepoLanguage({
  language,
  percentage,
}: {
  language: string;
  percentage: string;
}) {
  const langKey = language as LanguageName;
  const dotColor = githubColors[langKey]?.color || "#8b949e";

  return (
    <div className="flex items-center gap-2">
      <div
        className={cn("size-2 rounded-full")}
        style={{ backgroundColor: dotColor }}
      />
      <p className="font-bold text-sm">{language}</p>
      <span className="text-sm text-muted-foreground">{percentage}%</span>
    </div>
  );
}
