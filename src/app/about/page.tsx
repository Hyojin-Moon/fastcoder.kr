import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | fastcoder.kr",
};

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">About</h1>
      <div className="prose dark:prose-invert">
        <p className="text-lg font-medium">
          현업 프론트엔드 개발자의 블로그.
        </p>
      </div>
    </div>
  );
}
