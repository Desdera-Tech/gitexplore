import { Readme } from "@/components/repo/Readme";
import { Button } from "@/components/ui/button";
import githubColors from "@/lib/colors.json";
import { cn } from "@/lib/utils";
import { EyeIcon, HistoryIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IoLogoGithub } from "react-icons/io";
import { MdStarOutline } from "react-icons/md";

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

  const content =
    "IyBHaXRFeHBsb3JlCgpBIG1vZGVybiBHaXRIdWIgcmVwb3NpdG9yeSBleHBs\nb3JlciBhbmQgYW5hbHl0aWNzIGRhc2hib2FyZCBidWlsdCB3aXRoIHRoZSBH\naXRIdWIgUkVTVCBBUEkuCgpHaXRFeHBsb3JlIHByb3ZpZGVzIGEgY2xlYW4g\nYW5kIHJlc3BvbnNpdmUgaW50ZXJmYWNlIGZvciBleHBsb3JpbmcgcmVwb3Np\ndG9yaWVzLCBkZXZlbG9wZXJzLCBjb21taXRzLCBjb250cmlidXRvcnMsIGxh\nbmd1YWdlcywgYW5kIHJlcG9zaXRvcnkgYWN0aXZpdHkuCgotLS0KCiMgRmVh\ndHVyZXMKCi0gUmVwb3NpdG9yeSBzZWFyY2gKLSBSZXBvc2l0b3J5IGFuYWx5\ndGljcwotIFVzZXIgcHJvZmlsZSB2aWV3ZXIKLSBDb250cmlidXRvcnMgbGVh\nZGVyYm9hcmQKLSBDb21taXQgaGlzdG9yeSB2aWV3ZXIKLSBMYW5ndWFnZSBi\ncmVha2Rvd24gY2hhcnRzCi0gUkVBRE1FIG1hcmtkb3duIHJlbmRlcmluZwot\nIFJlcG9zaXRvcnkgY29tcGFyaXNvbgotIFJlc3BvbnNpdmUgbW9kZXJuIFVJ\nCi0gRGFyayBtb2RlIHN1cHBvcnQKCi0tLQoKIyBUZWNoIFN0YWNrCgojIyBG\ncm9udGVuZAoKLSBOZXh0LmpzCi0gVHlwZVNjcmlwdAotIFRhaWx3aW5kIENT\nUwotIFNoYWRDTiBVSQotIEZyYW1lciBNb3Rpb24KCiMjIERhdGEgRmV0Y2hp\nbmcKCi0gVGFuU3RhY2sgUXVlcnkKLSBBeGlvcyAvIEZldGNoIEFQSQoKIyMg\nQ2hhcnRzICYgVmlzdWFsaXphdGlvbgoKLSBSZWNoYXJ0cwoKLS0tCgojIFNj\ncmVlbnMKCiMjIEhvbWUgUGFnZQoKLSBTZWFyY2ggcmVwb3NpdG9yaWVzCi0g\nVHJlbmRpbmcgcmVwb3NpdG9yaWVzCi0gUG9wdWxhciB0b3BpY3MKCiMjIFJl\ncG9zaXRvcnkgRGV0YWlscwoKLSBSZXBvc2l0b3J5IHN0YXRpc3RpY3MKLSBD\nb250cmlidXRvcnMKLSBDb21taXRzCi0gUkVBRE1FIHByZXZpZXcKLSBMYW5n\ndWFnZSBhbmFseXRpY3MKCiMjIFVzZXIgUHJvZmlsZXMKCi0gR2l0SHViIHVz\nZXIgb3ZlcnZpZXcKLSBQdWJsaWMgcmVwb3NpdG9yaWVzCi0gUHJvZmlsZSBz\ndGF0aXN0aWNzCgojIyBDb21wYXJlIFJlcG9zaXRvcmllcwoKLSBTaWRlLWJ5\nLXNpZGUgcmVwb3NpdG9yeSBjb21wYXJpc29uCgotLS0KCiMgR2V0dGluZyBT\ndGFydGVkCgojIyBDbG9uZSB0aGUgcmVwb3NpdG9yeQoKZ2l0IGNsb25lIGh0\ndHBzOi8vZ2l0aHViLmNvbS9EZXNkZXJhLVRlY2gvZ2l0ZXhwbG9yZS5naXQK\nCiMjIE5hdmlnYXRlIGludG8gdGhlIHByb2plY3QKCmNkIGdpdGV4cGxvcmUK\nCiMjIEluc3RhbGwgZGVwZW5kZW5jaWVzCgpucG0gaW5zdGFsbAoKIyMgU3Rh\ncnQgdGhlIGRldmVsb3BtZW50IHNlcnZlcgoKbnBtIHJ1biBkZXYKCi0tLQoK\nIyBFbnZpcm9ubWVudCBWYXJpYWJsZXMKCkNyZWF0ZSBhIGAuZW52LmxvY2Fs\nYCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeS4KCk5FWFRfUFVCTElDX0dJ\nVEhVQl9BUElfVVJMPWh0dHBzOi8vYXBpLmdpdGh1Yi5jb20KCk9wdGlvbmFs\nIEdpdEh1YiB0b2tlbiBmb3IgaGlnaGVyIHJhdGUgbGltaXRzOgoKR0lUSFVC\nX1RPS0VOPXlvdXJfZ2l0aHViX3Rva2VuCgotLS0KCiMgUHJvamVjdCBTdHJ1\nY3R1cmUKCmBgYGJhc2gKc3JjLwrilJzilIDilIAgYXBwLwrilJzilIDilIAg\nY29tcG9uZW50cy8K4pSCICAg4pSc4pSA4pSAIHJlcG8vCuKUgiAgIOKUnOKU\ngOKUgCB1c2VyLwrilIIgICDilJzilIDilIAgY2hhcnRzLwrilIIgICDilJzi\nlIDilIAgbGF5b3V0LwrilIIgICDilJTilIDilIAgdWkvCuKUnOKUgOKUgCBo\nb29rcy8K4pSc4pSA4pSAIHNlcnZpY2VzLwrilIIgICDilJTilIDilIAgZ2l0\naHViLwrilJzilIDilIAgbGliLwrilJzilIDilIAgdHlwZXMvCuKUnOKUgOKU\ngCB1dGlscy8K4pSU4pSA4pSAIGNvbnN0YW50cy8KYGBgCgotLS0KCiMgR2l0\nSHViIEFQSQoKR2l0RXhwbG9yZSB1c2VzIHRoZSBHaXRIdWIgUkVTVCBBUEku\nCgpEb2N1bWVudGF0aW9uOgpodHRwczovL2RvY3MuZ2l0aHViLmNvbS9lbi9y\nZXN0CgotLS0KCiMgUm9hZG1hcAoKIyMgVmVyc2lvbiAxCgotIFJlcG9zaXRv\ncnkgc2VhcmNoCi0gUmVwb3NpdG9yeSBkZXRhaWxzCi0gVXNlciBwcm9maWxl\ncwotIFJFQURNRSByZW5kZXJpbmcKCiMjIFZlcnNpb24gMgoKLSBSZXBvc2l0\nb3J5IGNvbXBhcmlzb24KLSBDaGFydHMgYW5kIGFuYWx5dGljcwotIEFkdmFu\nY2VkIGZpbHRlcnMKCiMjIFZlcnNpb24gMwoKLSBHaXRIdWIgYXV0aGVudGlj\nYXRpb24KLSBTYXZlZCByZXBvc2l0b3JpZXMKLSBQZXJzb25hbGl6ZWQgZGFz\naGJvYXJkcwo=\n";
  const markdown = Buffer.from(content, "base64").toString("utf-8");

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-4 items-center justify-between pb-4 border-b">
        <div className="flex flex-wrap items-center">
          <Link
            href="/profiles/vanguard-labs"
            className="mr-2 text-sm text-muted-foreground hover:underline"
          >
            vanguard-labs
          </Link>
          <span className="mr-2 text-muted-foreground">/</span>
          <span className="mr-2 text-xl font-bold">quantum-engine-sdk</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button>
            <IoLogoGithub />
            GitHub
          </Button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-2 space-y-4">
          <div className="border rounded-lg overflow-hidden">
            <div className="flex items-center justify-between gap-4 bg-muted/70 p-4 border-b">
              <div className="flex items-center gap-3">
                <Image
                  src="https://avatars.githubusercontent.com/u/150304633?v=4"
                  alt=""
                  width={200}
                  height={200}
                  className="size-6 rounded-full"
                />
                <div className="flex items-center gap-1">
                  <Link
                    href="/profiles/Desdera-Tech"
                    className="font-bold text-sm text-nowrap hover:underline"
                  >
                    Desdera-Tech:
                  </Link>
                  <p className="font-medium text-sm text-muted-foreground line-clamp-1">
                    Optimize matrix operations for quantum gates
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono text-muted-foreground">
                8a3f2b1
              </span>
            </div>
            <div className="flex items-start bg-card hover:bg-card/30 p-4 gap-6">
              <HistoryIcon className="size-4 mt-0.5" />
              <div className="flex flex-wrap items-center *:mr-6 *:mb-1">
                <span className="text-sm">2,415 commits</span>
                <span className="text-sm">12 branches</span>
                <span className="text-sm">48 tags</span>
              </div>
            </div>
          </div>
          <Readme content={markdown} />
        </div>
        <div className="flex-1 space-y-4">
          <div className="pb-4 border-b">
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
