import { remark } from "remark";
import html from "remark-html";
import { createClient } from "@/lib/supabase/server";

export interface Post {
  id: string;
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  published: boolean;
}

export async function getAllPosts(): Promise<Omit<Post, "content">[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select("id, slug, title, description, published, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    date: row.created_at.slice(0, 10),
    description: row.description ?? "",
    published: row.published,
  }));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !data) return null;

  const processed = await remark().use(html).process(data.content ?? "");
  const contentHtml = processed.toString();

  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    date: data.created_at.slice(0, 10),
    description: data.description ?? "",
    content: contentHtml,
    published: data.published,
  };
}
