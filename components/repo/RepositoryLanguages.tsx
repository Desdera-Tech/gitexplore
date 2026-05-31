"use client";

import { useRepositoryLanguages } from "@/hooks/repositories/useRepositories";
import githubColors from "@/lib/colors.json";
import {
  Repository,
  RepositoryLanguages as RepositoryLanguagesType,
} from "@/models/repository";
import { LanguageName } from "@/types";

export default function RepositoryLanguages({
  repository,
  languages,
}: {
  repository: Repository;
  languages: RepositoryLanguagesType | null;
}) {
  const { data: repoLanguages } = useRepositoryLanguages(
    repository.owner.username,
    repository.name,
    languages,
  );

  const currentLanguages = repoLanguages || {};
  const totalLines = Object.values(currentLanguages).reduce(
    (sum, lines) => sum + lines,
    0,
  );
  const languagesData = Object.entries(currentLanguages).map(
    ([language, lines]) => {
      const percentage = totalLines > 0 ? (lines / totalLines) * 100 : 0;
      return {
        language,
        percentage,
      };
    },
  );

  languagesData.sort((a, b) => b.percentage - a.percentage);

  if (languagesData.length === 0) {
    return (
      <div className="text-sm text-muted-foreground pb-4 border-b">
        No language data available.
      </div>
    );
  }

  return (
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
  );
}

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
        className="size-2 rounded-full"
        style={{ backgroundColor: dotColor }}
      />
      <p className="font-bold text-sm">{language}</p>
      <span className="text-sm text-muted-foreground">{percentage}%</span>
    </div>
  );
}
