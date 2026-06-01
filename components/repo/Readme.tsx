"use client";

import { useRepositoryReadme } from "@/hooks/repositories/useRepositories";
import { MdOutlineArticle } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { EmptyState } from "../ui/EmptyState";
import { Spinner } from "../ui/spinner";

interface Props {
  owner: string;
  repo: string;
}

export function Readme({ owner, repo }: Props) {
  const { data, isLoading } = useRepositoryReadme(owner, repo);

  if (isLoading) {
    return (
      <div className="my-10">
        <Spinner className="mx-auto" />
      </div>
    );
  }

  if (!data) {
    return (
      <EmptyState
        title="Nothing here"
        message="This repository does not have a README file"
      />
    );
  }

  const markdown = Buffer.from(data.content, "base64").toString("utf-8");

  return (
    <div className="border rounded-lg bg-card">
      <div className="flex items-center gap-2 px-6 py-4 border-b">
        <MdOutlineArticle className="text-muted-foreground text-xl" />
        <p className="font-semibold text-xl">README.md</p>
      </div>
      <div className="prose dark:prose-invert max-w-none p-6">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            img: ({ src = "", alt }) => {
              const imageSrc = typeof src === "string" ? src : "";

              const imageUrl = imageSrc.startsWith("http")
                ? imageSrc
                : `https://raw.githubusercontent.com/${owner}/${repo}/HEAD/${imageSrc.replace(
                    "./",
                    "",
                  )}`;

              // eslint-disable-next-line @next/next/no-img-element
              return <img src={imageUrl} alt={alt} className="rounded-md" />;
            },
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
}
