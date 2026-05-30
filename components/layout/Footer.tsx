import { APP_NAME, DEVELOPER, DEVELOPER_LINK } from "@/constants/env";

export default function Footer() {
  return (
    <footer className="mt-auto flex justify-between gap-4 py-12 px-10">
      <div className="space-y-2">
        <h3 className="font-bold text-xs">{APP_NAME}</h3>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {APP_NAME}. Built for by{" "}
          <a
            href={DEVELOPER_LINK}
            target="_blank"
            className="font-medium text-primary hover:text-primary/70"
          >
            {DEVELOPER}
          </a>
        </p>
      </div>
    </footer>
  );
}
