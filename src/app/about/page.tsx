import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | fastcoder.kr",
};

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">About</h1>
      <p className="text-gray-600 dark:text-gray-400">
        fastcoder.kr 블로그입니다.
      </p>
    </div>
  );
}
