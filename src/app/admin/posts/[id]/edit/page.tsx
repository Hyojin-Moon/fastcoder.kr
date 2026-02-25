import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PostForm from "@/components/admin/PostForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !post) notFound();

  return (
    <div>
      <h2 className="mb-6 text-lg font-semibold">글 수정</h2>
      <PostForm
        initialData={{
          id: post.id,
          slug: post.slug,
          title: post.title,
          description: post.description ?? "",
          content: post.content ?? "",
          published: post.published,
        }}
      />
    </div>
  );
}
