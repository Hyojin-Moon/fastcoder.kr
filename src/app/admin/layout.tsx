import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-800">
        <h1 className="text-xl font-bold">
          <Link href="/admin">관리자</Link>
        </h1>
        <div className="flex items-center gap-4 text-sm">
          <Link
            href="/admin/posts/new"
            className="rounded-md bg-black px-3 py-1.5 text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            새 글 작성
          </Link>
          <Link
            href="/"
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            블로그 보기
          </Link>
          <LogoutButton />
        </div>
      </div>
      {children}
    </div>
  );
}
