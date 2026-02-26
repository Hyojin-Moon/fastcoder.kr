import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight">
          fastcoder.kr
        </Link>
        <nav className="flex gap-6 text-sm">
          <Link
            href="/"
            className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
          >
            Blog
          </Link>
          <Link
            href="/about"
            className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
          >
            About
          </Link>
          {user && (
            <Link
              href="/admin"
              className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
            >
              Admin
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
