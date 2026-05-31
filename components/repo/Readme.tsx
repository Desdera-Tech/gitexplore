import { MdOutlineArticle } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

interface Props {
  content: string;
}

export function Readme({ content }: Props) {
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
                : `https://raw.githubusercontent.com/Desdera-Tech/gitexplore/HEAD/${imageSrc.replace(
                    "./",
                    "",
                  )}`;

              return <img src={imageUrl} alt={alt} className="rounded-md" />;
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
