import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("posts")
    .select("id, slug, title, published, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">글 목록</h2>
      {!posts || posts.length === 0 ? (
        <p className="text-gray-500">작성된 글이 없습니다.</p>
      ) : (
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <th className="pb-2 font-medium">제목</th>
              <th className="pb-2 font-medium">상태</th>
              <th className="pb-2 font-medium">날짜</th>
              <th className="pb-2 font-medium">작업</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr
                key={post.id}
                className="border-b border-gray-100 dark:border-gray-800/50"
              >
                <td className="py-3">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:underline"
                  >
                    {post.title}
                  </Link>
                </td>
                <td className="py-3">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs ${
                      post.published
                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                    }`}
                  >
                    {post.published ? "공개" : "비공개"}
                  </span>
                </td>
                <td className="py-3 text-gray-500">
                  {post.created_at.slice(0, 10)}
                </td>
                <td className="py-3">
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="text-sm text-blue-500 hover:text-blue-700"
                    >
                      수정
                    </Link>
                    <DeleteButton postId={post.id} postTitle={post.title} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
