import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/posts";
import { createStaticClient } from "@/lib/supabase/static";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const supabase = createStaticClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("posts")
    .select("slug")
    .eq("published", true);
  return (data ?? []).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | fastcoder.kr`,
    description: post.description,
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
        <time className="mt-2 block text-sm text-gray-500">{post.date}</time>
      </header>
      <div
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
