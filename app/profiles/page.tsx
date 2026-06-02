import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top GitHub Developers",
  description:
    "Explore popular GitHub developers, their repositories, followers, contributions, and open-source work.",
};

export default function Profiles() {
  return (
    <div className="space-y-8">
      <div className="flex gap-4 flex-row">
        <div>
          <h2 className="text-[32px] font-semibold">Discover top developers</h2>
          <p className="max-w-2xl text-muted-foreground">
            Connect with the engineering minds shaping the future of open
            source. Track activity, explore contributions, and follow the best
            in the industry.
          </p>
        </div>
      </div>
      <h1 className="text-lg font-semibold text-center mt-20">Coming Soon</h1>
    </div>
  );
}
